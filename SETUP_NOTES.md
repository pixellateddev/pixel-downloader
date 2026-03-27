# Pixel Downloader Setup Notes

This file is a working handoff for continuing the rebuild inside this repo.

## Agreed Conventions

- Product name: `Pixel Downloader`
- Monorepo/root package name: `pixel-downloader`
- Internal shared package namespace: `@pixel/*`
- Monorepo stack: `bun` + `turbo`
- Formatting/linting: `biome`
- Frontend app tool: `vite`
- Native framework: `tauri`

## Target Structure

```text
apps/
├─ native/
│  ├─ client/
│  └─ host/
├─ daemon/
└─ bridge/

packages/
├─ core/
├─ types/
└─ utils/

extensions/
└─ browser/
```

Important:

- `apps/native` is a folder only, not a workspace package.
- `apps/native/client` should be a package.
- `apps/native/host` can be a lightweight package for Tauri scripts/tooling.

## Workspace Layout

Root workspace globs in `package.json` should be:

```json
{
  "workspaces": [
    "apps/*",
    "apps/native/*",
    "packages/*",
    "extensions/*"
  ]
}
```

## Current Repo State

The root has already been partially normalized:

- `package.json` uses `@biomejs/biome`
- root `format` script uses Turbo instead of Prettier directly
- workspace globs already include `apps/native/*`
- root `biome.json` exists
- generated ESLint config files and the shared ESLint package were removed

Still expected after cleanup:

- delete scaffold apps/packages you do not want
- refresh dependencies with `bun install`
- replace the generated README later

## Recommended Immediate Next Steps

### 1. Remove Turborepo Scaffold Noise

Delete generated packages/apps you do not want, likely:

- `apps/web`
- `apps/docs`
- `packages/ui`
- `packages/typescript-config` if you do not want to keep it

Then keep only the root workspace/tooling files.

### 2. Create the Frontend Package

From the repo root:

```bash
bun create vite apps/native/client --template react-ts
```

If needed, fallback:

```bash
bunx create-vite apps/native/client --template react-ts
```

After generation:

- update `apps/native/client/package.json`
- set the package name to `pixel-native-client`

### 3. Create the Tauri Host

After `apps/native/client` exists:

```bash
mkdir -p apps/native/host
cd apps/native/host
bun init -y
bun add -d @tauri-apps/cli@latest
bun tauri init
```

Use these values during `tauri init`:

- app name: `Pixel Downloader`
- window title: `Pixel Downloader`
- web assets location: `../client/dist`
- dev server URL: `http://localhost:5173`
- frontend dev command: `bun --cwd ../client dev`
- frontend build command: `bun --cwd ../client build`

## Tauri Layout Decision

We are intentionally using:

- `apps/native/client`
- `apps/native/host`

instead of the default `src-tauri` naming.

Notes:

- Tauri defaults to `src-tauri`
- current Tauri 2 tooling supports custom paths through environment variables such as `TAURI_APP_PATH` and `TAURI_FRONTEND_PATH`
- this means `host` is valid, but scripts must explicitly support that layout

## Architectural Direction

This rebuild is:

- UI-first
- native-first
- not CLI-first

Meaning:

- do not recreate the CLI first
- first make the native shell build successfully
- only then add shared packages and backend logic

## Recommended Build Order

1. Clean scaffold packages/apps.
2. Make the root workspace/tooling stable.
3. Scaffold `apps/native/client`.
4. Scaffold `apps/native/host`.
5. Verify native dev/build works.
6. Add `packages/types`, `packages/utils`, `packages/core`.
7. Add `apps/daemon`.
8. Add `apps/bridge` only if browser integration remains in scope.

## Package Naming Direction

Suggested package names:

- root: `pixel-downloader`
- native client: `pixel-native-client`
- native host: `pixel-native-host`
- daemon: `pixel-daemon`
- bridge: `pixel-bridge`
- shared packages:
  - `@pixel/core`
  - `@pixel/types`
  - `@pixel/utils`

## System Identifiers

Suggested identifiers:

- Tauri identifier: `dev.pixeldownloader.app`
- native messaging host: `dev.pixeldownloader.bridge`
- config directory: `.pixel-downloader`

## Tooling Notes

Biome is the formatter/linter standard for this repo.

Typical package scripts should look like:

```json
{
  "scripts": {
    "lint": "biome check .",
    "format": "biome check --write ."
  }
}
```

Turbo should own orchestration across packages.

## First Milestone

The first successful milestone for this rebuild is:

- `apps/native/client` runs
- `apps/native/host` launches correctly
- the native app builds

Do not start migrating downloader logic before that milestone is complete.

## Implementation Checklist

Assumption for the next phase:

- `bun run dev` works for the native shell

Recommended order after the native shell milestone:

### 1. Shared Types

- [ ] Create `packages/types`
- [ ] Add `packages/types/package.json`
- [ ] Add `packages/types/index.ts`
- [ ] Port the shared type shapes from `../pxdl/packages/types/index.ts`
- [ ] Rename package usage to `@pixel/types`

Initial types to include:

- [ ] `DownloadTask`
- [ ] `SegmentTask`
- [ ] `ProbeResult`
- [ ] `DaemonConfig`
- [ ] `NewDownload`

### 2. Minimal Daemon App

- [ ] Create `apps/daemon`
- [ ] Add `apps/daemon/package.json`
- [ ] Add `apps/daemon/tsconfig.json`
- [ ] Add `apps/daemon/src/index.ts`
- [ ] Add `dev`, `build`, `check-types`, `lint`, and `format` scripts

### 3. Minimal Read-Only API

- [ ] Implement `GET /status`
- [ ] Implement `GET /events`
- [ ] Implement `GET /config`
- [ ] Implement `POST /config`
- [ ] Use in-memory mock data first
- [ ] Keep SSE updates simple and stable

Do not port the real scheduler or downloader engine yet.

### 4. Client Data Flow

- [ ] Add a client store in `apps/native/client/src/store`
- [ ] Add a shared API base constant for the daemon URL
- [ ] Fetch task data from `/status`
- [ ] Subscribe to `/events`
- [ ] Fetch config from `/config`
- [ ] Replace hardcoded task arrays in `app-shell.tsx`

### 5. UI Wiring

- [ ] Derive sidebar counts from live tasks
- [ ] Render the download list from daemon data
- [ ] Derive status bar summary from daemon data
- [ ] Keep the current shell layout, but remove mock-only state

### 6. Write Actions

- [ ] Implement `POST /add`
- [ ] Implement `POST /pause`
- [ ] Implement `POST /resume`
- [ ] Implement `POST /clear-completed`
- [ ] Wire topbar and row actions to those endpoints

### 7. Backend Migration After the Slice Works

- [ ] Add `packages/utils`
- [ ] Add `packages/core`
- [ ] Port persistent config and storage
- [ ] Port scheduler logic
- [ ] Port downloader logic
- [ ] Add `apps/bridge` only if browser integration remains in scope
