# Changelog

All notable changes to this project will be documented here.

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
