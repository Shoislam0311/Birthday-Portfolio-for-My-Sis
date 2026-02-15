## 2025-05-22 - [Form Accessibility & Semantic Errors]
**Learning:** In a brand-heavy design system (like this one using luxury blue), using the brand color for error messages can be confusing. Semantic standard colors (like red-500) provide better immediate feedback. Additionally, linking labels to inputs and errors via `htmlFor`, `id`, and `aria-describedby` is essential for both accessibility and basic usability (clicking labels).
**Action:** Always check label-input association and use semantic colors for validation states, even if they deviate slightly from the primary brand palette.
