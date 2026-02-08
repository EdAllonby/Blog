# Agent Workflows

## Package Manager

- Use `pnpm` only.
- Do not use `pnpm --config.store-dir=...`.

## Install / Sync

- Use `pnpm install` after dependency or lockfile updates.
- Run `pnpm dedupe` after dependency updates.

## Validation

- Run `pnpm run check`.
- Run `pnpm build` after framework or routing changes.

## Dev mode

- Run `dev`.
