# Ed Blog

A statically generated Next.js blog powered by Hygraph content.

## Stack

- Next.js 16 (App Router)
- React 19 + React Compiler
- Cache Components (`"use cache"` + `cacheLife`)
- Tailwind CSS + shadcn/ui primitives
- TypeScript + ESLint 9

## Prerequisites

- Node.js 22+
- pnpm 10+

## Setup

1. Copy environment values:

```bash
cp .env-example .env
```

2. Install dependencies:

```bash
pnpm install
```

3. Start development server:

```bash
pnpm dev
```

## Environment Variables

- `CMS_SCHEMA_URL` (required): Hygraph API endpoint
- `CMS_TOKEN` (optional): bearer token for protected content

## Scripts

- `pnpm dev`: run local dev server
- `pnpm build`: production build
- `pnpm start`: run production server
- `pnpm run check`: lint + type-check + prettier check
- `pnpm run format`: auto-format files
- `pnpm run codegen`: regenerate GraphQL types

## Validation

Run the full repository checks before opening a PR:

```bash
pnpm run check
```
