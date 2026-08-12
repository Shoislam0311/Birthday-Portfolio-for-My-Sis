# Birthday Portfolio for My Sis

A responsive, interactive birthday portfolio designed as a personal celebration experience. The project combines a polished visual layout with reusable React components, animation, responsive styling, and a dedicated mobile-compatibility guide.

## Technology Stack

| Layer | Technology | Evidence in repository |
|---|---|---|
| Application | React 18+ with TypeScript | `src/**/*.tsx`, `tsconfig.json` |
| Build tool | Vite | `vite.config.ts`, `package.json` |
| Styling | Tailwind CSS with PostCSS | `tailwind.config.js`, `postcss.config.js` |
| UI system | shadcn/ui-style component configuration and Radix primitives | `components.json`, `src/components/ui/` |
| Interaction | Framer Motion, Embla Carousel, React Day Picker | `package.json` |
| Icons and feedback | Lucide React, Sonner | `package.json` |
| Package manager | pnpm | `pnpm-lock.yaml`, `.npmrc` |

## Local Development

Install dependencies and start the Vite development server:

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Documentation

The repository includes [mobile compatibility guidance](MOBILE_COMPATIBILITY.md) and [contribution guidance](CONTRIBUTING.md). These documents describe the supported responsive behavior and the expected workflow for making changes without breaking the celebration experience.

## Project Structure

The main application entry points are in `src/main.tsx` and `src/App.tsx`. Shared visual primitives live under `src/components/ui`, while page-specific sections and styling are organized under `src/components` and `src/*.css`.

## License

See [LICENSE](LICENSE) for the applicable terms.
