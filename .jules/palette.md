# Palette Persona UX Learnings

## Responsiveness
- **Mobile Viewports**: Used `h-[100dvh]` for the hero section to handle mobile browser address bar height changes correctly.
- **Overlapping Elements**: Fixed an issue where the `MusicPlayer` and `MobileNavigation` overlapped on small screens by moving the `MusicPlayer` higher on mobile (`bottom-24`).
- **Tap Targets**: Converted text-heavy mobile navigation buttons to icon-only circles on small screens to save space and improve tap accuracy.
- **Dynamic Padding**: Reduced vertical section padding on mobile (from `py-24/32` to `py-16/20`) to improve content flow and density on small devices.

## Performance & Accessibility
- **Build Quality**: Fixed TypeScript and linting errors (unused imports, hoisting issues) that were blocking production deployments.
- **ARIA Labels**: Added ARIA labels to icon-only buttons in the `MusicPlayer` and `MobileNavigation` for screen reader support.

## Backend
- **Serverless Integration**: Implemented a Vercel serverless function in `api/` to handle form submissions while maintaining security and performance.
