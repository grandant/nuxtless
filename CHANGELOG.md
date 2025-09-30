# Changelog

All notable changes to this project will be documented here.
This project follows [Semantic Versioning](https://semver.org/) and the [Conventional Commits](https://www.conventionalcommits.org/) style.

## [0.8.0] - 2025-09-30
### Framework & UI
- Migrated to Nuxt 4
- Upgraded to Nuxt UI 4
- Updated Tailwind + @tailwindcss/vite to 4.1.13

### Assets
- Added custom logos
- Added project favicon

## [0.7.0] - 2025-09-30
### SEO Enhancements
- Added robots rules:
  - Disallow: `/account`, `/checkout`, `/confirmation`, `/cart`, `/search`
  - Block non-SEO bots
  - Staging set as non-indexable
- Integrated sitemap module (config pending Vendure products/collections + CMS pages)
- Implemented Schema.org coverage:
  - **Global**: `Organization`
  - **PDP**: `Product`, `Offer`, `BreadcrumbList`
  - **Category**: `CollectionPage`, `ItemList`, `BreadcrumbList`
- Wired OG image generation via `defineOgImageComponent` (home, PDPs, categories)
- Enabled LinkChecker with baseline clean run (rules enforced project-wide)

## [0.6.0] - 2025-09-25
### Added
- **Stripe** integration via NuxtScripts (`useStripe` composable, StripeElement).
- Checkout confirmation page with **polling** until final order state.
- Centralized **useCheckout** composable for unified state and mutations.

### Changed
- Optimized checkout process with guarded watchers and reduced redundant API calls.
- Improved loading/error handling for Stripe errors (release loading state properly).
- Polished confirmation page with semantic HTML, accessibility, and print-friendly styles.

### Breaking Changes
- Checkout flow refactored; old form watchers and payment handling replaced by new composables.

## [0.5.0] - 2025-08-25

### Added
- Unified loading states in cart and checkout components with `orderStore.loading`
- New `syncOrderShippingAddress` util for updating shipping address in Vendure
- `OrderSummary` component for improved checkout UX
- Order confirmation page polished (replaced raw JSON with proper UI)
- Checkout page polish with improved flow and visuals

### Fixed
- Stale data issue on the PDP page

### Changed
- Polished product detail page (PDP) for MVP readiness
- Minor refinements to existing GQL queries, UI elements, and `orderStore`

## [0.4.0] - 2025-05-13

### Added
- Completed checkout flow: address → shipping → payment → confirmation
- Confirmation page with dynamic order data
- Checkout guard to prevent partial/incomplete access
- Type-safe integration of all checkout mutations

### Fixed
- Vendure admin now correctly reflects customer, shipping, and payment data
- Minor logic errors across shipping/payment handling

## [0.3.0] - 2025-05-05

### Added
- Account verification page (`/account/verify`) with token-based activation
- Password reset request page (`/account/request-reset`)
- Fallback alias `/verify` → `/account/verify` to support Vendure email links

### Changed
- Refactored `verify()`, `register()`, `requestPasswordReset()`, and `resetPassword()` to return raw results
- Replaced global `error.value` handling with page/component-level logic
- Toasts and alerts now handled locally in forms for better UX
- Refined login redirection and session token handling

### Fixed
- Session token now persists correctly across login and refresh
- Authenticated user info is fetched and stored reliably
- Minor ESLint/TypeScript cleanup

## [0.2.0] - 2025-04-27

### Added
- Customer account creation and login flow (Vendure integration)
- Fixed session persistence (cart state survives page reloads and logins)
- Fixed cart rendering issue
- From validation
- Minor improvements (renamed GQL queries and mutations)

## [0.1.0] - 2025-04-06

### Added
- Initial project structure (Nuxt 4 compat mode)
- Tailwind CSS v4 support
- Vendure GraphQL integration (test data only)
- SEO-ready routing and layout structure
- Environment variable support
