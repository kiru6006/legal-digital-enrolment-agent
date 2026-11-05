# AEMS AI & Developer Operating Rules (RULES.md)

See full documentation in [docs/RULES.md](file:///Users/apple/projects/legal-digital-enrolment-agent/docs/RULES.md).

## Quick Summary for AI Assistants:
1. **Plan Before Build**: For any non-trivial change, provide a < 30-line plan and wait for confirmation.
2. **AI Never Decides**: All automated flags must be labeled `SIMULATED AI`. Final approvals/rejections require explicit human role clicks.
3. **Strict TypeScript**: Pass `tsc` with zero errors. No `any` types.
4. **CSS Tokens Only**: Use `var(--color-...)` tokens from `src/styles/tokens.css` or Tailwind dark variants. Never hardcode hex colors in JSX.
5. **Single-Line Toolbars**: Header items and badges must specify `whitespace-nowrap shrink-0` to prevent multi-line wrapping.
6. **Append-Only Auditing**: Every status change or deficiency flag must record an `AuditEvent`.
7. **Verify & Sync**: Run `npm run build` and sync `dist/` to `docs/` for GitHub Pages before committing.
