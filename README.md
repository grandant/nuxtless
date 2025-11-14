# Nuxtless

**Nuxtless** is a clean, developer-friendly starter for building headless ecommerce frontends using [Nuxt 4](https://nuxt.com) and [Vendure](https://www.vendure.io) out of the box.

Built with a focus on SEO, security, and type safety in mind.

---

## Goals

- Deliver a solid foundation for projects built on [Vendure](https://www.vendure.io).
- Keep SEO capabilities current and expand with new Nuxt SEO modules.
- Improve design foundations using Nuxt UI v4 components and modern Tailwind features.
- Introduce automated testing for key flows and components.
- Strengthen security practices and validation across all layers.

---

## Features

- **SEO-first architecture** – optimized routes, head tags, i18n
- **Token-based session handling** – secure by default
- **Composable & modular** – customize what you need, extend the rest
- **Vendure integration** – built for Vendure and optimized for its Shop API
- **Developer-first DX** – no clutter, readable code, typed GraphQL

---

## Core Dependencies

- **Nuxt 4** with **Nuxt UI v4**
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

Vendure currently offers official starters for React and Angular, but not for Nuxt. **Nuxtless aims to fill that gap** — providing a clean, minimal, and SEO-friendly Nuxt 4 starter tailored for Vendure.

Since **v0.5.0**, Nuxtless has reached its MVP stage and continues to evolve through gradual improvements. Most strings are now localized, and all key features—accounts, checkout, and product listings—are functional.

Additional niceties include a loading widget, disabled checkout buttons during processing, pagination, and an image gallery powered by PhotoSwipe. The order confirmation page is fully implemented with printable receipts, marking an important milestone for the project's core user flow.

---

## Project Structure

```
nuxtless/
├── src/
│   ├── app/                    # Application layer (final composition)
│   │   ├── assets/             # Global assets processed by Vite (CSS, fonts, etc.)
│   │   │   └── css/            # TailwindCSS and global styles
│   │   ├── layouts/            # Application layouts (default, admin, etc.)
│   │   ├── pages/              # Top-level page overrides (if any)
│   │   └── app.vue             # Root Vue component
│   │
│   ├── base/                   # Nuxtless base layer - core ecommerce functionality
│   │   ├── components/         # Base reusable UI components
│   │   │   ├── account/        # Account-related components
│   │   │   ├── cart/           # Shopping cart components
│   │   │   ├── category/       # Category/collection components
│   │   │   ├── checkout/       # Checkout flow components
│   │   │   ├── header/         # Header components
│   │   │   ├── product/        # Product display components
│   │   │   └── CLAUDE.md       # Generic component/UI rules for Vue/Nuxt
│   │   ├── composables/        # Core composition functions
│   │   ├── gql/                # GraphQL queries and fragments
│   │   │   ├── queries/        # GraphQL query definitions
│   │   │   └── fragments/      # GraphQL fragment definitions
│   │   ├── i18n/               # Internationalization files
│   │   ├── pages/              # Base pages (can be overridden by layers)
│   │   │   ├── account/        # Account pages
│   │   │   ├── category/       # Category pages
│   │   │   ├── checkout/       # Checkout pages
│   │   │   ├── product/        # Product pages
│   │   │   └── CLAUDE.md       # Generic page/SEO/routing rules for Nuxt
│   │   ├── plugins/            # Core Nuxt plugins
│   │   ├── stores/             # Base Pinia stores (state management, NOT data fetching)
│   │   ├── utils/              # Base utility functions
│   │   ├── validators/         # Base validation schemas
│   │   └── nuxt.config.ts      # Base layer configuration (modules & settings)
│   │
│   ├── layers/                 # Custom extension layers (added by extending projects)
│   │   └── <layer-name>/       # Example: unstack, theater, festival, etc.
│   │       ├── components/     # Layer-specific components
│   │       ├── composables/    # Layer-specific composables
│   │       ├── pages/          # Layer-specific pages (extends base)
│   │       ├── stores/         # Layer-specific stores
│   │       ├── utils/          # Layer-specific utilities
│   │       ├── validators/     # Layer-specific validators
│   │       └── nuxt.config.ts  # Layer configuration
│   │
│   ├── schema/                 # Schema definitions (schema-org, structured data)
│   ├── server/                 # Nuxt server directory
│   │   ├── api/                # Server API routes
│   │   └── routes/             # Server routes
│   └── types/                  # Global TypeScript type definitions
│       ├── collection.ts
│       ├── customer.ts
│       ├── order.ts
│       ├── product.ts
│       └── ...
│
├── public/                     # Static files served as-is (favicon, robots.txt, etc.)
├── nuxt.config.ts              # Root config (extends base, defines srcDir)
├── tsconfig.json
├── package.json
└── README.md
```

> Note: This structure reflects compatibility with Tailwind CSS v4. Some issues were resolved by placing layout and page files inside the `app/` directory. Suggestions welcome.

## Environment Example

```env
GQL_HOST="http://localhost:3001/shop-api"
NUXT_PUBLIC_I18N_BASE_URL="nuxtless.unstack.dev"
NUXT_PUBLIC_IMAGE_PROVIDER="ipx"
NUXT_PUBLIC_CHANNEL_TOKEN="your-channel-token"
NUXT_PUBLIC_SITE_NAME="Nuxtless"
NUXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_prod_super-long-key"
NUXT_PUBLIC_UNSPLASH_API_KEY="your-unsplash-api-key"
```

> `GQL_HOST` is the main GraphQL endpoint (typically Vendure's `/shop-api`). `NUXT_PUBLIC_I18N_BASE_URL` is the base domain used for localized routing and SEO. Both are **required** for the app to function correctly.
>
> `NUXT_PUBLIC_UNSPLASH_API_KEY` is only needed if not using your own images for the hero banner on the index page.

---

## License

[MIT License](./LICENSE)

---

## Contributing

I'm coming from a Python/FastAPI background, so help with Nuxt best practices, testing patterns, or DX improvements is very welcome. If you're using Nuxtless or want to get involved, feel free to reach out or open a PR.
