# Contributing

Thank you for helping improve the Birthday Portfolio for My Sis. Contributions should preserve the project’s personal tone, responsive behavior, accessibility, and straightforward Vite development workflow.

## Before Opening a Change

Run `pnpm install` and confirm the project starts with `pnpm dev`. Keep UI changes componentized, prefer the existing styling and UI primitives, and avoid introducing a new dependency when an existing package already covers the requirement.

## Validation

Before opening a pull request, run:

```bash
pnpm build
```

Test the changed experience at narrow and wide viewport sizes. For layout changes, also review [MOBILE_COMPATIBILITY.md](MOBILE_COMPATIBILITY.md) and update it when supported behavior changes.

## Pull Requests

Describe the user-facing change, list the validation performed, and include screenshots or a short recording when the change is visual. Do not commit secrets, generated credentials, or unrelated build output.
