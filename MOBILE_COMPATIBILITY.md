# Mobile Compatibility

The portfolio is designed to remain readable and usable on phone, tablet, and desktop viewports. Responsive behavior is implemented through Tailwind CSS utilities and the component-level layout rules in `src/App.css` and `src/index.css`.

## Review Checklist

When changing a section, verify navigation, typography, images, cards, buttons, dialogs, and any carousel at a narrow viewport. Confirm that interactive targets remain usable without horizontal scrolling and that decorative motion does not prevent access to the content.

## Validation Workflow

Run the Vite development server with `pnpm dev`, inspect the page using a responsive browser viewport, and finish with `pnpm build`. If a change introduces a deliberate breakpoint or interaction exception, document it here so future contributors can reproduce the intended behavior.
