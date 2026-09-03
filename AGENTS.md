# Repository Guidelines

## Project Structure & Module Organization

This is a Vite-powered React 19 and TypeScript storefront/admin application. Application startup is in `src/main.tsx`; route definitions, including public, auth, profile, and `/admin` routes, are in `src/routes.ts`. Organize UI by domain under `src/components` (for example, `admin`, `product`, `order`, and `shared`), while page-level route screens live in `src/pages`. Keep API access in `src/services`, reusable data-fetching logic in `src/hooks`, client state in `src/stores`, shared types in `src/types`, and validation schemas in `src/validations`. Use `src/components/ui` for reusable primitives. Static files belong in `public` or `src/assets/images`.

## Build, Test, and Development Commands

Use pnpm, matching the committed lockfile:

```bash
pnpm install        # Install dependencies
pnpm dev            # Start the Vite development server
pnpm build          # Type-check and create a production build
pnpm lint           # Run ESLint across the repository
pnpm preview        # Serve the production build locally
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`, `VITE_BASE_IMAGE_URL`, and `VITE_CURRENCY` before testing API-backed flows. Do not commit secrets or local `.env` changes.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Follow the existing two-space formatting and Prettier configuration (`pnpm exec prettier --write <path>`); the Tailwind plugin sorts utility classes. Use `PascalCase` for component files and exports, `camelCase` for functions, hooks, and variables, and lowercase kebab-case for route/page directories where established. Prefer the `@/*` path alias for imports from `src`. Keep feature-specific loaders/actions/services close to their feature.

## Testing Guidelines

No test framework or test files are currently configured. For every change, run `pnpm lint` and `pnpm build`, then manually exercise the affected route and authentication/API states. If adding tests, place them beside the implementation using `*.test.ts` or `*.test.tsx` and add the corresponding package script.

## Commit & Pull Request Guidelines

Use imperative Conventional Commit-style subjects, matching existing history: `feat(product): ...`, `fix(auth): ...`, or `refactor(types): ...`. Keep commits focused. Pull requests should explain the user-visible and technical changes, link the relevant issue when available, list validation commands, and include screenshots or a short recording for UI changes. Call out environment, API, migration, or authentication assumptions explicitly.
