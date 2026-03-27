# Repository Guidelines

## Project Structure & Module Organization

This repository is a Bun-powered Turborepo for rebuilding `../pxdl` as a native-first product. The active code lives under `apps/native/`; later phases may add `apps/daemon`, `apps/bridge`, shared packages, and `extensions/browser`.

- `apps/native/client`: React 19 + Vite frontend in TypeScript. UI code is organized by feature under `src/features/*`, with app shell entry points in `src/app/*`.
- `apps/native/host`: Tauri host package. TypeScript tooling lives at the package root, and Rust runtime code lives in `src-tauri/src/*`.
- `README.md` and `SETUP_NOTES.md`: project context and rebuild decisions.

Keep new code feature-scoped, for example `src/features/downloads/components/...` and `src/features/downloads/lib/...`. Do not recreate the old top-level `apps/ui` or `apps/cli` layout.

## Build, Test, and Development Commands

Run commands from the repository root unless noted.

- `bun install`: install workspace dependencies.
- `bun run dev`: start the native app via Turbo.
- `bun run build`: run all workspace build tasks.
- `bun run lint`: run package lint scripts across the workspace.
- `bun run check-types`: run TypeScript checks across the client and host workspaces.
- `bun --cwd apps/native/host run dev`: run the Tauri host only.

## Coding Style & Naming Conventions

Use TypeScript for frontend code and Rust for Tauri runtime code. Follow the existing style:

- 2-space indentation.
- No semicolons in TypeScript files.
- React components in `PascalCase`; hooks and utilities in `camelCase`.
- Keep folders and CSS module files kebab-cased, for example `download-list.tsx` and `download-list.module.css`.
- Prefer `pixel-*` and `@pixel/*` names for new packages. Do not introduce new `pxdl` identifiers in the rebuild.

Biome is the formatter and linter baseline for this repo. Follow the root `biome.json`: spaces, width 2, single quotes, trailing commas `es5`, and `semicolons: asNeeded`.

## Testing Guidelines

There is no committed automated test suite yet. Until one is added:

- run `bun run check-types`
- run `bun run build`
- smoke-test the native shell with `bun run dev`

When adding tests, place them near the feature they cover and use `*.test.ts` or `*.test.tsx`. Prioritize downloader, scheduler, bridge, and storage logic.

## Git Hooks

Lefthook is configured at the repository root. The current `pre-commit` hook runs Biome on staged files and runs `bun run check-types` in parallel. Keep pre-commit tasks fast and focused; if heavier checks are added later, prefer moving them to a future `pre-push` hook.

## Commit & Pull Request Guidelines

Recent history favors short, imperative commit messages, for example `Refactor client app shell bootstrap` or `Build the native downloader shell and Tauri window chrome`.

- Keep commits focused and descriptive.
- Prefer sentence-case, imperative commit subjects without a trailing period.
- When extra context is useful, use a single main commit title followed by a short bullet list in the commit body.
- In pull requests, include a brief summary, affected areas, manual verification steps, and screenshots for UI changes.
- Link related issues or tasks when applicable.
