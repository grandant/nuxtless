# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Added
- Account verification page (/account/verify)
- Token-based verification via verifyCustomerAccount
- Alias /verify → /account/verify for Vendure link support
- Password reset request page (/account/request-reset)
- ResetPasswordRequestForm component

### Changed
- Refactored verify(), register(), and reset logic to return raw API results
- Page-level error handling replaces global error.value
- Improved form validation and result messaging

### Planned
- Resend verification form using Vendure’s refreshCustomerVerification()
- Final password reset form (with token)

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
