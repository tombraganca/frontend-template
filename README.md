# Frontend Template

React 19 + Vite + TypeScript starter with routing, server state, authentication and a component library already wired together.

| Concern | Choice |
| --- | --- |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based, typed) |
| Server state | [TanStack Query](https://tanstack.com/query) |
| Forms | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) |
| UI | [shadcn/ui](https://ui.shadcn.com) (Base UI, style `base-rhea`) + Tailwind CSS v4 |
| Lint / format | [Biome](https://biomejs.dev) |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Scripts: `pnpm build`, `pnpm typecheck`, `pnpm check` (Biome lint + format).

## Routes

| Path | Access | What |
| --- | --- | --- |
| `/` | public | Landing page showcasing the stack and components |
| `/login` | public | Email + password form (show/hide password) |
| `/home` | **protected** | shadcn `dashboard-01` example |

Everything inside `src/routes/_authenticated/` is protected and rendered in the dashboard shell (sidebar + header). To add a page, create `src/routes/_authenticated/<name>.tsx` and set `staticData: { title: "..." }` to name it in the header.

## Authentication

The app depends only on the `AuthClient` interface in `src/features/auth/types.ts`:

```ts
interface AuthClient {
  getSession(): Promise<User | null>
  signIn(credentials: Credentials): Promise<User>
  signOut(): Promise<void>
}
```

- **Demo mode** (default): `mock-auth-client.ts` keeps the session in `localStorage`. Sign in with `demo@example.com` / `password`.
- **Your backend**: copy `.env.example` to `.env` and set `VITE_API_URL`. `http-auth-client.ts` then talks to `POST /auth/login`, `GET /auth/me` and `POST /auth/logout` using cookies. Adjust paths/payloads there, or implement `AuthClient` for Firebase, Supabase, Auth0, Clerk... and export it from `src/features/auth/auth-client.ts`.
- Using bearer tokens instead of cookies? Add the `Authorization` header in `src/lib/http.ts`.

How it works: the session is a TanStack Query (`sessionQueryOptions`). The `_authenticated` route guard reads it in `beforeLoad` and redirects to `/login?redirect=<path>`; after login the user returns to where they were (the `redirect` param is sanitized against open redirects). On logout the query cache is cleared.

## Data fetching conventions

- One `QueryClient` (`src/lib/query-client.ts`), shared through router context, so loaders and components use the same cache.
- Define queries as `queryOptions` factories with a key factory per feature (see `src/features/dashboard/queries.ts`).
- Prefetch in route loaders with `context.queryClient.ensureQueryData(...)` and read with `useSuspenseQuery(...)`.
- `defaultPreloadStaleTime: 0` in the router so Query, not the router, decides freshness.
- Devtools (Router + Query) only render in development.

## Project layout

```
src/
  components/ui/      shadcn components (generated — add with `pnpm dlx shadcn@latest add <name>`)
  components/layout/  dashboard shell: sidebar, header, user menu
  features/auth/      AuthClient, adapters, queries, login form
  features/dashboard/ dashboard example (cards, chart, table, queries)
  lib/                http client, QueryClient, utils
  routes/             file-based routes
```

The sidebar entries other than *Dashboard* are placeholders from the shadcn example; edit `src/components/layout/app-sidebar.tsx`.
