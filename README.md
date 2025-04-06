# Nuxtless

**Nuxtless** is a clean, developer-friendly starter for building headless ecommerce frontends using [Nuxt 3](https://nuxt.com) and [Vendure](https://www.vendure.io) out of the box — but easily swappable.

Built with a focus on SEO, security, and type safety.

---

## Goals and Features

- **SEO-first architecture** – optimized routes, head tags, i18n
- **Token-based session handling** – secure by default
- **Composable & modular** – customize what you need, swap the rest
- **Vendure-ready** – built for Vendure, but not tied to it
- **Developer-first DX** – no clutter, readable code, typed GraphQL

---

## Core Dependencies

- **Nuxt 3** with **Nuxt UI v3**
- **Tailwind CSS v4**
- **Pinia** with persisted state
- **Valibot** for validation
- **nuxt-graphql-client** for typed GraphQL
- **@nuxtjs/i18n** for localization/localized SEO
- **VueUse** for utility composables

> For a full list, see [`package.json`](./package.json)

---

## Getting Started

```bash
pnpm install
pnpm run dev
```

> Update `.env.example` → `.env` with your API endpoint and other project values.

---

## Status

Vendure currently offers official starters for React and Angular, but not for Nuxt. **Nuxtless aims to fill that gap** — providing a clean, minimal, and SEO-friendly Nuxt 3 starter tailored for headless commerce.

The current UI displays test data from Vendure in simple layouts.
Focus is on building clean architecture and frontend logic.

Expect rapid iteration and improvements.

---

## Project Structure (Nuxt 4 compat mode)

```
nuxtless/
├── app/
│   ├── assets/css/
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   └── index.vue
│   └── app.vue
├── base/
│   ├── components/
│   ├── composables/
│   ├── gql/
│   ├── i18n/locales/
│   ├── pages/
│   ├── stores/
│   ├── app.config.ts
│   └── nuxt.config.ts
├── public/
├── server/
├── types/
├── .env
├── nuxt.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

> Note: This structure reflects compatibility with Tailwind CSS v4. Some issues were resolved by placing layout and page files inside the `app/` directory. Suggestions welcome.

## Environment Example

```env
GQL_HOST="https://your-vendure-backend.com/shop-api"
NUXT_PUBLIC_I18N_BASE_URL="nuxtless.unstack.dev"
```

> `GQL_HOST` is the main GraphQL endpoint (typically Vendure's `/shop-api`).
> `NUXT_PUBLIC_I18N_BASE_URL` is the base domain used for localized routing and SEO. Both are **required** for the app to function correctly.

---

## License

[MIT License](./LICENSE)

---

## Contributing

I'm coming from a Python/FastAPI background, so help with Nuxt best practices, testing patterns, or DX improvements is very welcome. If you're using Nuxtless or want to get involved, feel free to reach out or open a PR.
