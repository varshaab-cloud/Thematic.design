# Thematic.Design — Quick Commands

## Development

```bash
# Run Storybook (open http://localhost:6006)
npm run storybook

# Run Next.js dev server
npm run dev

# Rebuild design tokens (after editing tokens/tokens.json)
node build-tokens.mjs

# Type check
npx tsc --noEmit
```

## Storybook

```bash
# Build static Storybook (for deployment)
npm run build-storybook

# Deploy to Chromatic (needs project token)
npx chromatic --project-token=<YOUR_TOKEN>
```

## Notes
- After changing tokens.json → run `node build-tokens.mjs` → restart Storybook
- Storybook port: 6006 (falls back to 6007 if in use)
- Stories live in: src/stories/
- Foundation docs live in: src/stories/docs/
- Components live in: components/ui/
