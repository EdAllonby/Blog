# Agent Workflows

## Package Manager

- Currently uses npm, but I want to upgrade to use `pnpm` only.
- Do not use `pnpm --config.store-dir=...`.

## Install / Sync

- Use `pnpm install` after dependency or lockfile updates.
- Run `pnpm dedupe` after dependency updates.

## Validation (Repo-wide)

- Run `pnpm run check`.
