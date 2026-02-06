import type { VercelRequest, VercelResponse } from '@vercel/node';

interface Track {
  name: string;
  url: string;
  artist?: string;
  duration?: number;
}

// Default playlist
const tracks: Track[] = [
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
    artist: 'Pixabay',
    duration: 180
  },
  {
    name: 'Chill Moments',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-medium-version-159456.mp3',
    artist: 'Pixabay',
    duration: 240
  },
  {
    name: 'Dreamy Night',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3',
    artist: 'Pixabay',
    duration: 300
  },
  {
    name: 'Celebration Time',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_517a7a4f84.mp3?filename=celebration-song-122603.mp3',
    artist: 'Pixabay',
    duration: 210
  }
];

// In-memory storage for user-added tracks (for demo - use database in production)
let userTracks: Track[] = [];

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

  if (req.method === 'GET') {
    return res.status(200).json({
      tracks: [...tracks, ...userTracks],
      totalTracks: tracks.length + userTracks.length,
      defaultTracks: tracks.length,
      userTracks: userTracks.length
    });
  }

  if (req.method === 'POST') {
    const { action, track } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        message: 'Action is required'
      });
    }

    if (action === 'add' && track) {
      // Validate track
      if (!track.name || !track.url) {
        return res.status(400).json({
          success: false,
          message: 'Track name and URL are required'
        });
      }

      // Add to user tracks
      const newTrack: Track = {
        name: track.name,
        url: track.url,
        artist: track.artist || 'Custom',
        duration: track.duration
      };

      userTracks.push(newTrack);

      console.log('Track added:', newTrack);

      return res.status(200).json({
        success: true,
        message: 'Track added successfully',
        track: newTrack
      });
    }

    if (action === 'remove') {
      const { trackName } = req.body;

      if (!trackName) {
        return res.status(400).json({
          success: false,
          message: 'Track name is required'
        });
      }

      // Remove from user tracks only
      const initialLength = userTracks.length;
      userTracks = userTracks.filter(t => t.name !== trackName);

      if (userTracks.length === initialLength) {
        return res.status(404).json({
          success: false,
          message: 'Track not found or cannot be removed'
        });
      }

      console.log('Track removed:', trackName);

      return res.status(200).json({
        success: true,
        message: 'Track removed successfully'
      });
    }

    if (action === 'reorder') {
      const { orderedTrackNames } = req.body;

      if (!Array.isArray(orderedTrackNames)) {
        return res.status(400).json({
          success: false,
          message: 'Ordered track names must be an array'
        });
      }

      // Reorder tracks based on provided order
      const allTracks = [...tracks, ...userTracks];
      const reordered = orderedTrackNames
        .map(name => allTracks.find(t => t.name === name))
        .filter(Boolean) as Track[];

      console.log('Tracks reordered');

      return res.status(200).json({
        success: true,
        message: 'Playlist reordered successfully',
        tracks: reordered
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid action'
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
