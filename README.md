# Nuxtless

**Nuxtless** is a reusable **Nuxt 4 layer** for building headless ecommerce storefronts powered by [Vendure](https://www.vendure.io/). It provides a typed Shop API integration, storefront pages, checkout flows, and a UI foundation that consuming Nuxt applications can extend or override.

Built with an emphasis on **SEO, security, type safety, and maintainability**.

## Goals

- Provide a reusable foundation for Vendure-powered Nuxt storefronts.
- Keep storefront functionality separate from merchant-specific branding and integrations.
- Support SSR, localized content, and discoverability by default.
- Use Nuxt UI and Tailwind CSS for consistent, customizable interfaces.
- Improve automated test coverage and harden critical customer and checkout flows.

## Features

- **Layer-first architecture** — extend Nuxtless from a Nuxt application or another layer.
- **Vendure Shop API integration** — GraphQL operations with [gql.tada](https://gql-tada.0no.co/) and [urql](https://commerce.nearform.com/open-source/urql/).
- **Server-side GraphQL proxy** — Vendure bearer tokens are handled by the Nuxt server and stored in an HttpOnly browser cookie.
- **Storefront functionality** — product discovery, variants, cart, customer accounts, checkout, shipping, and payments.
- **SEO and localization** — Nuxt SEO modules, internationalized routes, and Vendure language selection.
- **Runtime validation** — Valibot schemas for important data boundaries.
- **Composable UI** — Nuxt UI v4, Tailwind CSS v4, and overridable components and pages.

## Core dependencies

- Nuxt 4, Vue 3, Nuxt UI v4, Tailwind CSS v4
- Pinia with persisted state
- gql.tada, urql, and `@bicou/nuxt-urql`
- Valibot
- `@nuxtjs/i18n` and `@nuxtjs/seo`
- `@nuxt/image`, `@nuxt/fonts`, `@nuxt/scripts`, and VueUse

See [`package.json`](./package.json) for the complete dependency list.

## Getting started

Nuxtless is a **layer, not a standalone merchant application**. The repository includes a `.playground` application for local development.

```bash
pnpm install
```

Start the playground using the development script defined in `package.json`. Make sure a Vendure Shop API is accessible and configure the required environment variables before testing the storefront.

The intended usage is to **extend Nuxtless directly from this GitHub repository** in the consuming application's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ["github:grandant/nuxtless#<version>"],
});
```

Replace `<version>` with the desired release tag. This allows downstream projects to receive upstream changes by updating their pinned version. **Breaking changes will be documented in release notes.**

Alternatively, you can clone the **starter template** and follow the release notes to apply future updates manually. **The starter template has not yet been published.**

The consuming application should supply its own site metadata, runtime configuration, branding, and merchant-specific overrides.

### Environment variables

Create a local `.env` file (do not commit real credentials). Configure these variables for the playground or the consuming storefront:

```dotenv
# Locales enabled in the storefront (use the format required by your app configuration)
APP_LOCALES=en,bg

# Vendure Shop API and channel (server-side)
NUXT_VENDURE_BASE=http://localhost:3001/shop-api
NUXT_CHANNEL_TOKEN=

# Nuxt Image provider
NUXT_IMAGE_PROVIDER=ipx

# Secret for Nuxt OG Image
NUXT_OG_IMAGE_SECRET=replace-with-generated-secret

# Storefront URL and name
NUXT_SITE_URL=http://localhost:3000
NUXT_SITE_NAME=Nuxtless

# Stripe publishable key, if Stripe is enabled
STRIPE_PUBLIC_KEY=
```

Generate the OG image secret with:

```bash
openssl rand -hex 32
```

`NUXT_CHANNEL_TOKEN` is only needed when using a specific Vendure channel; `STRIPE_PUBLIC_KEY` is only needed for Stripe integration. Keep the OG image secret private. Additional deployment-specific settings may be required by individual storefronts.

### Vendure authentication

Nuxtless uses Vendure **bearer tokens** through a Nuxt server endpoint (`/api/graphql`). The proxy sends requests to Vendure, receives the `vendure-auth-token` response header, and maintains the token in an **HttpOnly, SameSite cookie**.

In Vendure, enable bearer authentication:

```ts
authOptions: {
  tokenMethod: 'bearer',
  // Keep your existing Vendure authentication configuration.
},
```

The browser calls the Nuxt proxy rather than sending authentication tokens directly to Vendure. Customer and active-order state are initialized client-side on application load; the storefront's public pages can still use SSR.

**Before production:** review cookie security, proxy request validation, CSRF protections, and rate limiting for your deployment environment.

### GraphQL workflow

GraphQL queries, mutations, and fragments are written in TypeScript using **gql.tada**. Project-specific scalar configuration (including Vendure's `Money` scalar) is maintained in the custom GraphQL initializer rather than editing generated declarations.

When the Vendure schema changes, refresh the local schema and regenerate gql.tada output using the project's configured scripts or gql.tada CLI. Keep generated files generated; do not edit them manually.

## Project structure

```text
nuxtless/
├── .playground/           # Development application consuming the layer
├── app/
│   ├── assets/            # Global styles and assets
│   ├── components/        # Shared storefront UI
│   ├── composables/       # Reusable application logic
│   ├── layouts/           # Shared layouts
│   ├── pages/             # Storefront routes
│   ├── plugins/           # Client initialization and other plugins
│   └── stores/            # Pinia state and actions
├── gql/
│   ├── fragments/         # Typed GraphQL fragments
│   ├── mutations/         # Typed GraphQL mutations
│   └── queries/           # Typed GraphQL queries
├── server/
│   └── api/               # Nuxt server API, including GraphQL proxy
├── validators/            # Valibot schemas and inferred types
├── nuxt.config.ts         # Reusable layer configuration
├── package.json
└── README.md
```

This is a high-level overview; consult the repository for the current layout and additional directories.

## Testing and deployment

The refactor to a standalone layer is ongoing. Before a production release, verify type checking, linting, production builds, and end-to-end flows for product discovery, localization, cart persistence, authentication, checkout, and payments.

Nuxtless targets standard Nuxt/Nitro deployment environments, including **Cloudflare Workers**. Deployment configuration, runtime secrets, and environment-specific bindings belong to the consuming application. Validate each deployment target rather than assuming the playground configuration is production-ready.

## Status

Nuxtless is under active development. It aims to offer an independent, developer-friendly Nuxt storefront foundation for Vendure. APIs, layer conventions, and integration details may evolve before a stable release.

## Contributing

Contributions are welcome, particularly around Nuxt best practices, accessibility, testing, storefront performance, and developer experience. Please open an issue or pull request to discuss changes.

## License

[MIT](./LICENSE)
