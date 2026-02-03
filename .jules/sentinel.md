## 2024-05-22 - CSS Injection in Chart Components
**Vulnerability:** Unsanitized keys and IDs were being interpolated directly into a `<style>` tag via `dangerouslySetInnerHTML` in the `ChartContainer` and `ChartStyle` components.
**Learning:** Even standard UI components can introduce injection vectors if they use user-controlled or data-driven keys to generate CSS selectors.
**Prevention:** Always sanitize any string that will be used as a CSS selector or property name. Using a whitelist regex like `/[^a-zA-Z0-9-_]/g` for identifiers is effective.
