import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (for demo purposes - use a database in production)
const analyticsData = {
  totalVisitors: 150,
  mostViewedSection: 'Gallery',
  interactions: [] as Array<{
    event: string;
    device: string;
    timestamp: string;
    section?: string;
  }>,
  devices: {
    mobile: 98,
    desktop: 52
  }
};

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

  if (req.method === 'POST') {
    // Track user interaction
    const { event, device, timestamp, section } = req.body;

    if (!event || !device || !timestamp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Store analytics data
    analyticsData.interactions.push({
      event,
      device,
      timestamp: new Date(timestamp).toISOString(),
      section
    });

    // Update device counts
    if (device === 'mobile') {
      analyticsData.devices.mobile++;
    } else if (device === 'desktop') {
      analyticsData.devices.desktop++;
    }

    // Increment total visitors for page views
    if (event === 'page_view') {
      analyticsData.totalVisitors++;
    }

    // Update most viewed section
    if (section) {
      const sectionViews = analyticsData.interactions.filter(
        i => i.section === section && i.event === 'section_view'
      ).length;

      const currentMostViewed = analyticsData.interactions.filter(
        i => i.section === analyticsData.mostViewedSection && i.event === 'section_view'
      ).length;

      if (sectionViews > currentMostViewed) {
        analyticsData.mostViewedSection = section;
      }
    }

    console.log('Analytics tracked:', { event, device, section });

    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    // Return analytics summary
    const totalInteractions = analyticsData.interactions.length;
    const totalDevices = analyticsData.devices.mobile + analyticsData.devices.desktop;

    return res.status(200).json({
      totalVisitors: analyticsData.totalVisitors,
      mostViewedSection: analyticsData.mostViewedSection,
      mobileUsers: totalDevices > 0
        ? `${Math.round((analyticsData.devices.mobile / totalDevices) * 100)}%`
        : '0%',
      desktopUsers: totalDevices > 0
        ? `${Math.round((analyticsData.devices.desktop / totalDevices) * 100)}%`
        : '0%',
      totalInteractions,
      breakdown: {
        mobile: analyticsData.devices.mobile,
        desktop: analyticsData.devices.desktop
      }
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
