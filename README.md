# Nuxtless

**Nuxtless** is a clean, developer-friendly starter for building headless ecommerce frontends using [Nuxt 4](https://nuxt.com) and [Vendure](https://www.vendure.io) out of the box.

Built with a focus on SEO, security, and type safety in mind.

**Live Demo:** [https://nuxtless.unstack.dev](https://nuxtless.unstack.dev)

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

### Vendure Configuration

Nuxtless relies on **bearer authentication**. In your Vendure `server.config.ts`, cookie auth must be disabled:

```ts
authOptions: {
  tokenMethod: "bearer",
  superadminCredentials: {
    identifier: process.env.SUPERADMIN_USERNAME,
    password: process.env.SUPERADMIN_PASSWORD,
  },
  // Below lines ca be removed
  // cookieOptions: {
  //   secret: process.env.COOKIE_SECRET,
  // },
},
```

---

## Status

Vendure currently offers official starters for React and Angular, but not for Nuxt. **Nuxtless aims to fill that gap** — providing a clean, minimal, and SEO-friendly Nuxt 4 starter tailored for modern headless commerce.

A new `docs/` directory has been added to hold technical audits generated during early optimization phases. These documents provide deep-dive insights into bundle composition, test planning, and project-wide critical path analysis.

The audits include:

- **critical-path.md** — full sitemap-level breakdown of all flows
- **test-blueprint.md** — proposed testing structure
- **bundle-audit.md** — client bundle inspection

These are reference materials, meant as starting points rather than final specifications.

---

## Project Structure

```
nuxtless/
├── docs/                     # Technical audits (agent-generated)
│   ├── critical-path.md
│   ├── test-blueprint.md
│   └── bundle-audit.md
├── app/                      # Application layer (final composition)
│   ├── assets/               # Global assets processed by Vite (CSS, fonts, etc.)
│   │   └── css/              # TailwindCSS and global styles
│   ├── layouts/              # Application layouts (default, admin, etc.)
│   ├── pages/                # Top-level page overrides (if any)
│   └── app.vue               # Root Vue component
│
├── layers/
│   ├── base/                 # Nuxtless base layer - core ecommerce functionality
│   │   ├── components/       # Base reusable UI components
│   │   │   ├── account/      # Account-related components
│   │   │   ├── cart/         # Shopping cart components
│   │   │   ├── category/     # Category/collection components
│   │   │   ├── checkout/     # Checkout flow components
│   │   │   ├── header/       # Header components
│   │   │   ├── product/      # Product display components
│   │   │   └── CLAUDE.md     # Generic component/UI rules for Vue/Nuxt
│   │   ├── composables/      # Core composition functions
│   │   ├── gql/              # GraphQL queries and fragments
│   │   │   ├── queries/      # GraphQL query definitions
│   │   │   └── fragments/    # GraphQL fragment definitions
│   │   ├── i18n/             # Internationalization files
│   │   ├── pages/            # Base pages (can be overridden by layers)
│   │   │   ├── account/      # Account pages
│   │   │   ├── category/     # Category pages
│   │   │   ├── checkout/     # Checkout pages
│   │   │   ├── product/      # Product pages
│   │   │   └── CLAUDE.md     # Generic page/SEO/routing rules for Nuxt
│   │   ├── plugins/          # Core Nuxt plugins
│   │   ├── stores/           # Base Pinia stores (state management, NOT data fetching)
│   │   ├── utils/            # Base utility functions
│   │   ├── validators/       # Base validation schemas
│   │   └── nuxt.config.ts    # Base layer configuration (modules & settings)
│   │
│   └── <layer-name>/         # Custom extension layers (Example: unstack, theater, festival, etc.)
│       ├── components/       # Layer-specific components
│       ├── composables/      # Layer-specific composables
│       ├── pages/            # Layer-specific pages (extends base)
│       ├── stores/           # Layer-specific stores
│       ├── utils/            # Layer-specific utilities
│       ├── validators/       # Layer-specific validators
│       └── nuxt.config.ts    # Layer configuration
│
├── schema/                   # Schema definitions (schema-org, structured data)
├── server/                   # Nuxt server directory
│   ├── api/                  # Server API routes
│   └── routes/               # Server routes
├── types/                    # Global TypeScript type definitions
│   ├── collection.ts
│   ├── customer.ts
│   ├── order.ts
│   ├── product.ts
│   └── ...
│
├── public/                   # Static files served as-is (favicon, robots.txt, etc.)
├── nuxt.config.ts            # Root config (extends base)
├── tsconfig.json
├── package.json
└── README.md
```

> Note: This structure reflects compatibility with Tailwind CSS v4. Some issues were resolved by placing layout and page files inside the `app/` directory. Suggestions welcome.

## Deployment

Nuxtless now supports **instant deployment on Cloudflare Workers**, with NuxtHub Admin sunsetting as NuxtHub moves toward **self‑hosting**. See announcement: [https://hub.nuxt.com/changelog/self-hosting-first](https://hub.nuxt.com/changelog/self-hosting-first).

### Steps

1. **Copy the Wrangler template**

   - Rename `wrangler.jsonc.example` → `wrangler.jsonc`.

2. **Fill in the required variables**

   - Update all values inside `wrangler.jsonc` according to your environment.

3. **Deploy via Cloudflare Dashboard**

   - Go to **Cloudflare → Workers & Pages → Create Application**.
   - Choose **Link to Git Repository** and select your Nuxtless repo.

4. **Set Build Variables** (Important)

   - Add **GQL\_HOST** under *Build Environment Variables and Secrets*.
   - This value must match the one in your `.env` / wrangler config.

That's it — **Nuxtless running on the edge**.

---

## Environment Example

```env
GQL_HOST="http://localhost:3000/shop-api"
NUXT_IMAGE_PROVIDER="ipx"
PORT=8080
NUXT_PUBLIC_I18N_BASE_URL="nuxtless.unstack.dev"
NUXT_PUBLIC_CHANNEL_TOKEN="your-channel-token"
NUXT_PUBLIC_SITE_NAME="Nuxtless"
NUXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_prod_super-long-key"
NUXT_PUBLIC_UNSPLASH_API_KEY="your-unsplash-api-key"
```

> **Required:**
>
> - `GQL_HOST` is the main GraphQL endpoint (typically Vendure's `/shop-api`).
> - `NUXT_IMAGE_PROVIDER` is set to `ipx` for local development.
> - `PORT` can be set to `8080` to work with Vendure out of the box.
> - `NUXT_PUBLIC_I18N_BASE_URL` is the base domain used for localized routing and SEO.
>
> `NUXT_PUBLIC_UNSPLASH_API_KEY` is only needed if not using your own images for the hero banner on the index page.

---

## License

[MIT License](./LICENSE)

---

## Contributing

I'm coming from a Python/FastAPI background, so help with Nuxt best practices, testing patterns, or DX improvements is very welcome. If you're using Nuxtless or want to get involved, feel free to reach out or open a PR.
