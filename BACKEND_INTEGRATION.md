# Backend Integration & 21st.dev MCP Enhancements

## Overview

This document describes the complete backend infrastructure and UI enhancements implemented for the birthday celebration microsite.

## Backend API Routes

All API routes are built using Vercel Serverless Functions and are located in the `/api` directory.

### API Endpoints

#### 1. Contact Form API
**Endpoint:** `/api/contact-form`

**Methods:**
- `POST` - Submit contact form
  - Request Body:
    ```typescript
    {
      name: string;
      email: string;
      message: string;
    }
    ```
  - Response:
    ```typescript
    {
      success: boolean;
      message: string;
    }
    ```

**Features:**
- Input validation and sanitization
- XSS protection
- Email format validation
- CORS enabled for cross-origin requests

#### 2. Analytics API
**Endpoint:** `/api/analytics`

**Methods:**
- `POST` - Track user interaction
  - Request Body:
    ```typescript
    {
      event: string;
      device: 'mobile' | 'desktop';
      timestamp: string;
      section?: string;
    }
    ```
- `GET` - Get analytics summary
  - Response:
    ```typescript
    {
      totalVisitors: number;
      mostViewedSection: string;
      mobileUsers: string;
      desktopUsers: string;
      totalInteractions?: number;
      breakdown?: {
        mobile: number;
        desktop: number;
      };
    }
    ```

**Features:**
- Real-time interaction tracking
- Section view analytics
- Device breakdown statistics
- Mobile vs desktop usage metrics

#### 3. Music Playlist API
**Endpoint:** `/api/music-playlist`

**Methods:**
- `GET` - Get playlist
  - Response:
    ```typescript
    {
      tracks: Track[];
      totalTracks: number;
      defaultTracks: number;
      userTracks: number;
    }
    ```
- `POST` - Manage playlist
  - Request Body:
    ```typescript
    {
      action: 'add' | 'remove' | 'reorder';
      track?: Track;
      trackName?: string;
      orderedTrackNames?: string[];
    }
    ```

**Features:**
- Default playlist with 4 tracks
- Add custom tracks
- Remove tracks
- Reorder playlist
- Track metadata support

#### 4. Preferences API
**Endpoint:** `/api/preferences`

**Methods:**
- `GET` - Get user preferences
  - Response:
    ```typescript
    {
      musicEnabled: boolean;
      autoPlay: boolean;
      volume: number;
      theme: string;
      reducedMotion: boolean;
      highContrast: boolean;
      deviceType: 'mobile' | 'desktop';
    }
    ```
- `PUT` - Update preferences
  - Request Body: `Partial<UserPreferences>`
- `DELETE` - Reset to defaults

**Features:**
- Device type detection
- Theme management
- Accessibility preferences
- Volume control
- Local storage fallback

## Client-Side Utilities

### API Client (`src/lib/api.ts`)

A comprehensive TypeScript API client with type-safe methods for all endpoints:

```typescript
import {
  contactFormApi,
  analyticsApi,
  musicPlaylistApi,
  preferencesApi
} from '@/lib/api';
```

### Custom Hooks

#### useDeviceOptimization
Enhanced device detection and optimization:

```typescript
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';

const {
  deviceConfig,
  getOptimizedImageSize,
  shouldReduceMotion,
  isTouchDevice,
  getAnimationDuration,
  isMobile,
  isDesktop
} = useDeviceOptimization();
```

**Features:**
- Mobile/tablet/desktop detection
- Touch support detection
- Reduced motion preference
- Connection quality detection
- Optimized image sizing
- Animation duration adjustment

#### useAnalytics
User interaction tracking:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const {
  trackPageView,
  trackSectionView,
  trackInteraction,
  trackMusicPlayback,
  trackFormSubmission
} = useAnalytics();
```

**Features:**
- Automatic page view tracking
- Section view tracking
- Interaction event logging
- Music playback analytics
- Form submission tracking

#### usePreferences
User preference management:

```typescript
import { usePreferences } from '@/hooks/usePreferences';

const {
  preferences,
  loading,
  updatePreferences,
  resetPreferences
} = usePreferences();
```

**Features:**
- API + localStorage fallback
- Real-time preference updates
- Device-aware defaults
- Automatic persistence

### Enhanced Components

#### OptimizedImage
Responsive, lazy-loaded image component with device-specific optimizations:

```typescript
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  aspectRatio="landscape"
/>
```

**Features:**
- Automatic lazy loading
- Device-specific sizing
- Quality optimization
- WebP format support
- Skeleton loading state

#### MobileNavigation (Enhanced)
Modern mobile navigation with 21st.dev patterns:

- Touch-optimized interactions
- Icon-based navigation items
- Animated indicators
- Compact and expanded modes
- Glassmorphism effects

#### LoadingScreen (Enhanced)
Advanced loading screen with progress tracking:

- Multi-stage loading messages
- Animated progress bar with shimmer
- Device-aware animations
- Reduced motion support
- Loading indicators

## Cross-Device Optimization

### Mobile Optimizations
- Faster animations (70% of desktop duration)
- Lower image quality (80%)
- Aggressive lazy loading
- Touch-optimized UI
- Battery-conscious features

### Desktop Optimizations
- Full-quality images (90%)
- Complete animation sequences
- Keyboard navigation
- Hover effects
- Enhanced visual effects

### Tablet Optimizations
- Balanced performance (75% image quality)
- Hybrid touch/mouse support
- Adaptive layouts

## Performance Optimizations

### Bundle Size
- Code splitting by route
- Lazy loading for heavy components
- Tree-shaking for unused code

### Image Optimization
- Device-specific sizing
- Format selection (WebP/JPEG)
- Quality adjustment based on connection
- Progressive loading

### Animation Performance
- Reduced motion support
- GPU-accelerated transforms
- Passive event listeners
- Animation duration adjustment

## Deployment

### Vercel Deployment

The project is configured for Vercel deployment:

1. Push to repository
2. Import project in Vercel
3. Environment variables (optional):
   - `VITE_API_URL`: Custom API base URL

### API Requirements

For production deployment, ensure:
- Node.js 20.x runtime
- CORS configuration in vercel.json
- Database for persistent storage (optional)

## Development

### Local Development

Run the development server:

```bash
npm run dev
```

The API routes will be proxied to `/api` during development.

### Testing API Routes

Test API routes using curl or Postman:

```bash
# Test analytics
curl http://localhost:5173/api/analytics

# Test preferences
curl http://localhost:5173/api/preferences
```

## Security

### Implemented Security Measures

1. **Input Validation**
   - Email format validation
   - Length limits on all inputs
   - XSS protection

2. **CORS Configuration**
   - Proper headers set
   - OPTIONS method handling

3. **Rate Limiting**
   - Recommended: Add rate limiting middleware
   - Protect against abuse

4. **Data Sanitization**
   - HTML tag removal
   - Special character handling
   - Whitespace normalization

## Future Enhancements

### Backend
- Database integration (MongoDB/PostgreSQL)
- Email service integration (SendGrid/Resend)
- Real-time analytics dashboard
- User authentication (optional)
- File upload handling

### Frontend
- Service worker for offline support
- PWA capabilities
- Push notifications
- More accessibility features
- A/B testing framework

## Monitoring

### Analytics Tracking

Currently tracked events:
- Page views
- Section views
- Button interactions
- Music playback (play/pause/skip)
- Form submissions
- Time spent on page

### Performance Metrics

- Page load time
- Time to interactive
- First contentful paint
- Largest contentful paint

## Support

For issues or questions:
1. Check this documentation
2. Review API route code in `/api`
3. Check client implementation in `/src/lib/api.ts`
4. Review component documentation

## License

Part of the Bubu's Birthday Celebration project.
