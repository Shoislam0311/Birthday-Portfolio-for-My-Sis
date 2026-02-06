import type { VercelRequest, VercelResponse } from '@vercel/node';

interface UserPreferences {
  musicEnabled: boolean;
  autoPlay: boolean;
  volume: number;
  theme: string;
  reducedMotion: boolean;
  highContrast: boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  musicEnabled: true,
  autoPlay: true,
  volume: 70,
  theme: 'luxury-dark',
  reducedMotion: false,
  highContrast: false
};

// In-memory storage (for demo - use database or cookies in production)
const userPreferences: Map<string, UserPreferences> = new Map();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Generate or get user ID from session
  const userId = (req.headers['x-user-id'] as string) ||
                 req.cookies?.userId ||
                 'anonymous';

  // Detect device type from user agent
  const userAgent = req.headers['user-agent'] || '';
  const deviceType = /Mobile|Android|iPhone|iPad/i.test(userAgent) ? 'mobile' : 'desktop';

  if (req.method === 'GET') {
    // Return user preferences or defaults
    const preferences = userPreferences.get(userId) || { ...defaultPreferences };

    return res.status(200).json({
      ...preferences,
      deviceType,
      userId
    });
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const { musicEnabled, autoPlay, volume, theme, reducedMotion, highContrast } = req.body;

    // Get current preferences or defaults
    const currentPreferences = userPreferences.get(userId) || { ...defaultPreferences };

    // Update only provided fields
    const updatedPreferences: UserPreferences = {
      musicEnabled: musicEnabled !== undefined ? musicEnabled : currentPreferences.musicEnabled,
      autoPlay: autoPlay !== undefined ? autoPlay : currentPreferences.autoPlay,
      volume: volume !== undefined ? volume : currentPreferences.volume,
      theme: theme !== undefined ? theme : currentPreferences.theme,
      reducedMotion: reducedMotion !== undefined ? reducedMotion : currentPreferences.reducedMotion,
      highContrast: highContrast !== undefined ? highContrast : currentPreferences.highContrast
    };

    // Validate preferences
    if (updatedPreferences.volume < 0 || updatedPreferences.volume > 100) {
      return res.status(400).json({
        success: false,
        message: 'Volume must be between 0 and 100'
      });
    }

    const validThemes = ['luxury-dark', 'luxury-light', 'celebration', 'minimal'];
    if (!validThemes.includes(updatedPreferences.theme)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid theme'
      });
    }

    // Store preferences
    userPreferences.set(userId, updatedPreferences);

    console.log('Preferences updated for user:', userId, updatedPreferences);

    return res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: updatedPreferences
    });
  }

  if (req.method === 'DELETE') {
    // Reset to defaults
    userPreferences.delete(userId);

    return res.status(200).json({
      success: true,
      message: 'Preferences reset to defaults',
      preferences: defaultPreferences
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
