# Sentinel Security Journal

Critical security learnings for this codebase.

---

## 2025-02-03 - Input Validation Missing on Mailto Forms

**Vulnerability:** The SendWish form accepted user input without validation, length limits, or sanitization.

**Learning:** Client-side forms that generate mailto links can still be abused with:
- Excessively long inputs (DoS via URL length)
- Newline characters in subject/body (header injection)
- HTML tags in input (potential XSS if rendered elsewhere)
- Invalid email formats

**Prevention:** Always implement:
1. Length limits on all input fields (enforced in UI and logic)
2. Email format validation with regex
3. Character whitelist for names (Unicode-aware for international names)
4. Input sanitization to remove `<`, `>`, and normalize newlines
5. Visual error feedback for validation failures
