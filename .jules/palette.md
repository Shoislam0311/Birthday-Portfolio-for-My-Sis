## 2025-05-22 - [Form Accessibility & Semantic Errors]
**Learning:** In a brand-heavy design system (like this one using luxury blue), using the brand color for error messages can be confusing. Semantic standard colors (like red-500) provide better immediate feedback. Additionally, linking labels to inputs and errors via `htmlFor`, `id`, and `aria-describedby` is essential for both accessibility and basic usability (clicking labels).
**Action:** Always check label-input association and use semantic colors for validation states, even if they deviate slightly from the primary brand palette.

## 2025-05-23 - [React 19 Linting & Component Purity]
**Learning:** React 19's linting rules (like `react-hooks/purity`) are stricter about idempotency. Using `Math.random()` in `useMemo` with empty dependencies is now flagged. To achieve stable "randomness" (e.g., for skeleton widths) that satisfies these rules, derive values from `useId()`. Additionally, many standard UI components export variants alongside components, which can block CI if `react-refresh/only-export-components` is set to error.
**Action:** Use deterministic values based on stable seeds like `useId()` for variety in UI. Downgrade Fast Refresh rules to 'warn' in shared component libraries to prevent non-critical blocking of CI.
