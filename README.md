# Ed Blog

A statically generated Next.js blog powered by local MDX content files.

## Stack

- Next.js 16 (App Router)
- React 19 + React Compiler
- Cache Components (`"use cache"` + `cacheLife`)
- MDX with `@next/mdx`
- Tailwind CSS + shadcn/ui primitives
- TypeScript + ESLint 9

## Content

- About page: `docs/about.mdx`
- Blog posts: `docs/posts/*.mdx`

Each post file exports metadata:

```mdx
export const metadata = {
  title: "Post title",
  date: "YYYY-MM-DD",
};
```

## Prerequisites

- Node.js 22+
- pnpm 10+

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

## Scripts

- `pnpm dev`: run local dev server
- `pnpm build`: production build
- `pnpm start`: run production server
- `pnpm run check`: lint + type-check + prettier check
- `pnpm run format`: auto-format files

## Validation

Run the full repository checks before opening a PR:

```bash
pnpm run check
```
