# Nuxtless Test Blueprint

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Draft

---

## Table of Contents

1. [Introduction](#introduction)
2. [Test Philosophy](#test-philosophy)
3. [Test Folder Structure](#test-folder-structure)
4. [Test Categories & Domains](#test-categories--domains)
5. [Testing Standards](#testing-standards)
6. [Test Scenarios by Domain](#test-scenarios-by-domain)
   - [Authentication & Session Management](#authentication--session-management)
   - [Cart Operations](#cart-operations)
   - [Checkout Flow](#checkout-flow)
   - [Category Pages](#category-pages)
   - [Product Detail Pages](#product-detail-pages)
   - [Account Management](#account-management)
   - [Navigation & Routing](#navigation--routing)
   - [SEO & Metadata](#seo--metadata)
   - [GraphQL Operations](#graphql-operations)
   - [Stores & State Management](#stores--state-management)
   - [Composables](#composables)
   - [Utilities & Validators](#utilities--validators)
   - [Error Handling & Fallbacks](#error-handling--fallbacks)
7. [Mock Strategy](#mock-strategy)
8. [SSR vs CSR Testing](#ssr-vs-csr-testing)
9. [Mobile vs Desktop Testing](#mobile-vs-desktop-testing)
10. [Performance Testing](#performance-testing)
11. [Accessibility Testing](#accessibility-testing)
12. [Implementation Priorities](#implementation-priorities)
13. [Appendix: Tools & Setup](#appendix-tools--setup)

---

## Introduction

This Test Blueprint provides a comprehensive testing strategy for Nuxtless, a modular Nuxt 4 headless ecommerce template. The blueprint is based on:

- **Architecture Reference:** `/docs/critical-path.md` - Complete flow analysis
- **Component Standards:** `/src/base/components/CLAUDE.md` - Vue/Nuxt component patterns
- **Page Standards:** `/src/base/pages/CLAUDE.md` - Page structure, SEO, and routing
- **Project Rules:** Root `/CLAUDE.md` - Development workflow and standards

### Goals

1. **Ensure Critical Path Coverage:** All three user flows from critical-path.md must be tested
2. **Enforce Code Standards:** Tests validate adherence to CLAUDE.md conventions
3. **Security & Type Safety:** Address 11 critical issues identified in the audit
4. **Maintainability:** Tests should be co-located, well-organized, and easy to maintain
5. **Layer Architecture:** Tests work across base layer and extension layers

---

## Test Philosophy

### Core Principles

1. **Co-location:** Keep tests next to the code they test
   - `Button.vue` → `Button.spec.ts` in same directory
   - Integration tests can group related components

2. **Testing Trophy:** Focus distribution
   - **70%** Integration tests (component interactions, user flows)
   - **20%** Unit tests (utilities, composables, stores)
   - **10%** E2E tests (critical paths only)

3. **User-Centric:** Test behavior, not implementation
   - Test what users see and do
   - Avoid testing internal state unless necessary

4. **Mock Sparingly:** 
   - Mock external dependencies (GraphQL, Stripe)
   - Avoid mocking internal modules when possible

5. **Type Safety:** Tests should catch type errors
   - Use TypeScript in all test files
   - Validate GraphQL response types

### What NOT to Test

- Third-party library internals (Nuxt, Vue, Pinia)
- GraphQL schema validation (handled by codegen)
- CSS styling details (use visual regression for critical UI)
- Auto-generated code

---

## Test Folder Structure

```
src/
├── base/
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartAddButton.vue
│   │   │   ├── CartAddButton.spec.ts          # Unit: Component behavior
│   │   │   ├── CartPanel.vue
│   │   │   └── CartPanel.spec.ts
│   │   └── checkout/
│   │       ├── AddressForm.vue
│   │       ├── AddressForm.spec.ts
│   │       └── checkout.integration.spec.ts    # Integration: Form coordination
│   ├── composables/
│   │   ├── useCheckout.ts
│   │   ├── useCheckout.spec.ts                 # Unit: Logic testing
│   │   ├── useOrderMutation.ts
│   │   └── useOrderMutation.spec.ts
│   ├── stores/
│   │   ├── useAuthStore.ts
│   │   ├── useAuthStore.spec.ts                # Unit: Store actions/state
│   │   ├── useOrderStore.ts
│   │   └── useOrderStore.spec.ts
│   ├── utils/
│   │   ├── getCategoryTrail.ts
│   │   ├── getCategoryTrail.spec.ts            # Unit: Pure functions
│   │   └── ...
│   └── validators/
│       ├── addressForm.ts
│       └── addressForm.spec.ts                 # Unit: Validation schemas
│
└── layers/
    └── <custom-layer>/
        ├── components/
        │   └── CustomComponent.spec.ts         # Layer-specific tests
        └── ...

tests/
├── e2e/                                        # Playwright E2E tests
│   ├── flows/
│   │   ├── homepage-to-cart.spec.ts           # Critical Path Flow 1
│   │   ├── login-to-account.spec.ts           # Critical Path Flow 2
│   │   └── cart-to-confirmation.spec.ts       # Critical Path Flow 3
│   ├── seo/
│   │   ├── product-seo.spec.ts
│   │   └── category-seo.spec.ts
│   └── accessibility/
│       ├── keyboard-navigation.spec.ts
│       └── screen-reader.spec.ts
│
├── fixtures/                                   # Shared test data
│   ├── products.ts
│   ├── collections.ts
│   ├── orders.ts
│   └── customers.ts
│
├── mocks/                                      # Shared mocks
│   ├── graphql/
│   │   ├── handlers.ts                        # MSW handlers
│   │   └── responses/
│   │       ├── products.ts
│   │       ├── orders.ts
│   │       └── collections.ts
│   ├── stores/
│   │   └── mockStores.ts
│   └── composables/
│       └── mockComposables.ts
│
└── setup/                                      # Test configuration
    ├── vitest.config.ts
    ├── playwright.config.ts
    └── test-utils.ts                          # Helper functions
```

### File Naming Conventions

- **Unit tests:** `ComponentName.spec.ts` or `functionName.spec.ts`
- **Integration tests:** `feature.integration.spec.ts`
- **E2E tests:** `flow-name.spec.ts`
- **Test utilities:** `test-utils.ts` or `helpers.ts`

---

## Test Categories & Domains

Based on critical-path.md analysis, tests are organized into these domains:

| Domain | Priority | Test Types | Critical Issues |
|--------|----------|------------|-----------------|
| **Authentication** | High | Unit, Integration, E2E | #13, #14, #15, #16 |
| **Cart Operations** | High | Unit, Integration, E2E | #10, #11 |
| **Checkout Flow** | High | Integration, E2E | #22, #23, #28, #31 |
| **Category Pages** | Medium | Integration, E2E | #4, #5, #6 |
| **Product Pages** | High | Integration, E2E | #7, #8, #9 |
| **Account Pages** | Medium | Integration, E2E | #17, #18, #19 |
| **Navigation & Routing** | Medium | Integration, E2E | #3 |
| **SEO & Metadata** | Medium | E2E | #1, #4, #7 |
| **GraphQL Operations** | High | Unit, Integration | #29 |
| **Stores** | High | Unit | #8, #15 |
| **Composables** | High | Unit | #10, #29, #30 |
| **Utilities** | Low | Unit | - |
| **Error Handling** | High | Integration | #10, #32, #33 |

---

## Testing Standards

### Component Testing Rules

From `src/base/components/CLAUDE.md`:

1. **Props Testing:**
   - Test all defined props with various types
   - Validate prop defaults
   - Test required vs optional props
   - Verify prop validation errors

2. **Emits Testing:**
   - Test all defined emits are triggered
   - Validate emit payloads match types
   - Test event naming (camelCase in code, kebab-case in template)

3. **v-model Testing:**
   - Test `defineModel()` bindings work correctly
   - Test modifiers if implemented
   - Test get/set transformations

4. **Composition API:**
   - Test `<script setup>` behavior
   - Verify reactive state updates
   - Test lifecycle hooks (onMounted, onUnmounted)

### Page Testing Rules

From `src/base/pages/CLAUDE.md`:

1. **Route Validation:**
   - Test file-based routing matches expected URLs
   - Test route groups don't affect URLs
   - Test optional parameters with `[[param]]`
   - Test repeatable parameters with `+` modifier

2. **Route Meta:**
   - Test `definePage()` metadata
   - Test aliases work correctly
   - Test route names for type safety

3. **Data Fetching:**
   - Test SSR data is available on mount
   - Test loading states
   - Test error states

### SSR Testing Requirements

1. **Must Work on Server:**
   - No `window` or `document` access without guards
   - Test with `process.server` conditions
   - Verify hydration mismatch prevention

2. **Data Availability:**
   - Test `useAsyncData` / `useAsyncGql` work SSR
   - Test data is serialized to client
   - Test refs are reactive after hydration

---

## Test Scenarios by Domain

### Authentication & Session Management

**Critical Path Reference:** Flow 2 (Login → Account Pages)  
**Files:**
- `src/base/stores/useAuthStore.ts`
- `src/base/composables/useGqlSession.ts`
- `src/base/pages/account/login.vue`
- `src/base/components/account/LoginForm.vue`

**Critical Issues:** #13, #14, #15, #16

#### Unit Tests: useAuthStore

**File:** `src/base/stores/useAuthStore.spec.ts`

**Test Cases:**

1. **Initial State**
   - [ ] Store initializes with empty session
   - [ ] `isAuthenticated` computed returns false when no user
   - [ ] Session persists across page reloads (persistedstate)

2. **setSession()**
   - [ ] Stores token correctly
   - [ ] Stores user data (id, email)
   - [ ] Records token source (login, register, etc.)
   - [ ] Updates `isAuthenticated` to true
   - [ ] Persists to localStorage (SECURITY: Issue #15)

3. **setUser()**
   - [ ] Updates user details without changing token
   - [ ] Maintains authentication state

4. **clearSession()**
   - [ ] Removes token from state
   - [ ] Removes user from state
   - [ ] Sets `isAuthenticated` to false
   - [ ] Clears persisted data

**Mocks:**
- Pinia testing utilities
- localStorage (mock to avoid browser dependency)

**Edge Cases:**
- [ ] Expired token handling
- [ ] Invalid user object
- [ ] Concurrent session modifications

**Security Tests:**
- [ ] Token is stored as expected (document security concern)
- [ ] Session data matches expected shape
- [ ] No sensitive data exposed in logs

---

#### Integration Tests: Login Flow

**File:** `src/base/components/account/LoginForm.integration.spec.ts`

**Test Cases:**

1. **Successful Login**
   - [ ] Form validates email and password
   - [ ] Calls `useGqlSession()` with correct params
   - [ ] Stores token in authStore
   - [ ] Fetches active order after login
   - [ ] Emits success event
   - [ ] Shows success feedback

2. **Failed Login - Invalid Credentials**
   - [ ] Shows error message
   - [ ] Does not store token
   - [ ] Does not emit success
   - [ ] Form remains enabled for retry

3. **Failed Login - Network Error**
   - [ ] Handles GraphQL errors gracefully
   - [ ] Shows network error message
   - [ ] Allows retry

4. **Remember Me Checkbox**
   - [ ] Passes `rememberMe` to mutation
   - [ ] Token persistence behavior (if different)

**Mocks:**
- GraphQL client (MSW or mock responses)
- `useGqlSession` composable
- `useOrderStore` actions
- Router navigation

**SSR Considerations:**
- [ ] Form renders server-side
- [ ] Client-side validation works after hydration
- [ ] No hydration mismatches

---

#### E2E Tests: Complete Auth Flow

**File:** `tests/e2e/flows/login-to-account.spec.ts`

**Critical Path Coverage:** Flow 2

**Test Cases:**

1. **Guest to Authenticated User**
   - [ ] Navigate to `/login`
   - [ ] Fill email and password
   - [ ] Submit form
   - [ ] Redirected to `/account` or intended destination
   - [ ] User greeting displays correctly
   - [ ] Logout button visible

2. **Already Authenticated Redirect**
   - [ ] Log in successfully
   - [ ] Navigate to `/login` again
   - [ ] Automatically redirected to `/account`
   - [ ] (Tests Issue #13 - client-side guard)

3. **Protected Route Access**
   - [ ] Visit `/account` as guest
   - [ ] Redirected to `/login`
   - [ ] After login, redirected back to `/account`

4. **Logout Flow**
   - [ ] Log in successfully
   - [ ] Click logout button
   - [ ] Session cleared
   - [ ] Redirected to home or login
   - [ ] Cannot access `/account` without re-login

**Failure Modes:**
- [ ] Invalid credentials show error
- [ ] Network timeout handled gracefully
- [ ] CSRF token missing (Issue #16)

**Mobile vs Desktop:**
- [ ] Login form responsive on mobile
- [ ] Touch targets adequate size
- [ ] Virtual keyboard doesn't obscure inputs

---

### Cart Operations

**Critical Path Reference:** Flow 1 (Step 1.5: Add to Cart), Flow 3 (Cart → Checkout)  
**Files:**
- `src/base/stores/useOrderStore.ts`
- `src/base/components/cart/CartAddButton.vue`
- `src/base/components/cart/CartPanel.vue`

**Critical Issues:** #10, #11, #12

#### Unit Tests: useOrderStore

**File:** `src/base/stores/useOrderStore.spec.ts`

**Test Cases:**

1. **Initial State**
   - [ ] Order is null initially
   - [ ] Loading is false
   - [ ] Error is null
   - [ ] ShippingMethods and paymentMethods are empty

2. **fetchOrder()**
   - [ ] Fetches base order correctly
   - [ ] Fetches detail order with full data
   - [ ] Sets loading state during fetch
   - [ ] Updates order state on success
   - [ ] Sets error state on failure

3. **addItemToOrder()**
   - [ ] Adds new product to order
   - [ ] Increments quantity if product exists
   - [ ] Returns success status
   - [ ] Updates order state
   - [ ] Handles out-of-stock errors

4. **removeItemFromOrder()**
   - [ ] Removes line item by ID
   - [ ] Updates order totals
   - [ ] Returns success status

5. **adjustOrderLine()**
   - [ ] Updates line item quantity
   - [ ] Handles quantity = 0 as removal
   - [ ] Returns success status

6. **applyCouponCode() / removeCouponCode()**
   - [ ] Applies valid coupon
   - [ ] Handles invalid coupon errors
   - [ ] Updates order totals with discount
   - [ ] Removes coupon correctly

7. **Checkout Methods**
   - [ ] `setCustomerForOrder()` sets guest customer
   - [ ] `setOrderShippingAddress()` updates address
   - [ ] `getShippingMethods()` fetches available methods
   - [ ] `setShippingMethod()` sets selected method
   - [ ] `getPaymentMethods()` fetches available methods
   - [ ] `transitionToState()` changes order state
   - [ ] `addPaymentToOrder()` completes payment

**Mocks:**
- GraphQL mutations (MSW handlers)
- `useOrderMutation` composable
- Toast notifications

**Edge Cases:**
- [ ] Adding to cart when out of stock
- [ ] Network failure during cart operations
- [ ] Concurrent cart modifications
- [ ] Invalid product IDs
- [ ] Invalid coupon codes

---

#### Integration Tests: Cart Panel

**File:** `src/base/components/cart/CartPanel.integration.spec.ts`

**Test Cases:**

1. **Empty Cart State**
   - [ ] Shows "Cart is empty" message
   - [ ] No items displayed
   - [ ] Checkout button disabled or hidden

2. **Cart with Items**
   - [ ] Displays all line items
   - [ ] Shows product images, names, prices
   - [ ] Shows quantity controls
   - [ ] Shows line totals
   - [ ] Shows order subtotal, shipping, tax, total

3. **Quantity Adjustment**
   - [ ] Increase quantity updates total
   - [ ] Decrease quantity updates total
   - [ ] Remove item (quantity to 0) works
   - [ ] Loading state during update

4. **Coupon Code**
   - [ ] Input field for coupon code
   - [ ] Apply button triggers mutation
   - [ ] Valid coupon shows discount
   - [ ] Invalid coupon shows error
   - [ ] Remove coupon restores total

5. **Clear Cart**
   - [ ] Clear button visible (if implemented)
   - [ ] Confirms before clearing
   - [ ] Removes all items
   - [ ] (Addresses Issue #12)

**Mocks:**
- `useOrderStore` with mock order data
- GraphQL mutations
- Toast notifications

**Mobile vs Desktop:**
- [ ] Panel slides in from right on desktop
- [ ] Panel full-screen on mobile
- [ ] Touch gestures work (swipe to close)

---

#### E2E Tests: Add to Cart Flow

**File:** `tests/e2e/flows/homepage-to-cart.spec.ts`

**Critical Path Coverage:** Flow 1

**Test Cases:**

1. **Browse and Add to Cart**
   - [ ] Start on homepage
   - [ ] Click category from carousel
   - [ ] Click product from category page
   - [ ] Select product variant (if applicable)
   - [ ] Click "Add to Cart"
   - [ ] Cart panel opens with item
   - [ ] Cart count badge updates

2. **Add Multiple Items**
   - [ ] Add first product
   - [ ] Close cart panel
   - [ ] Navigate to different product
   - [ ] Add second product
   - [ ] Cart panel shows both items
   - [ ] Totals calculated correctly

3. **Cart Persistence**
   - [ ] Add items to cart
   - [ ] Refresh page
   - [ ] Cart items still present
   - [ ] Quantities preserved

4. **Error Handling**
   - [ ] Add out-of-stock item shows error
   - [ ] Network error handled gracefully
   - [ ] (Tests Issue #10)

**Failure Modes:**
- [ ] Product not found (invalid ID)
- [ ] Variant selection incomplete
- [ ] Backend order creation fails
- [ ] Session expires during cart operation

---

### Checkout Flow

**Critical Path Reference:** Flow 3 (Cart → Checkout → Order Confirmation)  
**Files:**
- `src/base/pages/checkout/index.vue`
- `src/base/composables/useCheckout.ts`
- `src/base/components/checkout/AddressForm.vue`
- `src/base/components/checkout/ShippingForm.vue`
- `src/base/components/checkout/PaymentForm.vue`

**Critical Issues:** #22, #23, #26, #27, #28, #31

#### Unit Tests: useCheckout Composable

**File:** `src/base/composables/useCheckout.spec.ts`

**Test Cases:**

1. **Initialization**
   - [ ] Accepts checkoutState parameter
   - [ ] Sets up watchers correctly

2. **Postal Code Watcher**
   - [ ] Triggers recalcShipping on postal code change
   - [ ] Debounces rapid changes (Issue #30)
   - [ ] Handles empty postal code

3. **Shipping Method Watcher**
   - [ ] Triggers recalcShipping on method change
   - [ ] Only fires when value actually changes

4. **Payment Method Watcher**
   - [ ] Sets custom field on payment method change
   - [ ] Triggers recalcShipping
   - [ ] Handles GraphQL errors

5. **recalcShipping()**
   - [ ] Fetches order with updated data
   - [ ] Updates checkout state
   - [ ] Handles errors gracefully

**Mocks:**
- `useState` for checkoutState
- GraphQL mutations
- `useOrderStore`

**Edge Cases:**
- [ ] Multiple watchers firing simultaneously (Issue #30)
- [ ] Invalid postal codes
- [ ] Missing GQL operation types (Issue #29)

---

#### Integration Tests: Checkout Forms Coordination

**File:** `src/base/components/checkout/checkout.integration.spec.ts`

**Test Cases:**

1. **Form Sequence - Authenticated User**
   - [ ] Address form pre-filled with customer data
   - [ ] Email field disabled
   - [ ] Submit address → shipping methods fetched
   - [ ] Select shipping → payment methods fetched
   - [ ] Submit payment → order confirmed

2. **Form Sequence - Guest User**
   - [ ] Empty address form
   - [ ] Email field enabled and validated
   - [ ] SetCustomerForOrder called before address (Issue #26)
   - [ ] Same sequence after that

3. **Address Form Validation**
   - [ ] Required fields enforced
   - [ ] Email format validated
   - [ ] Country dropdown populated
   - [ ] Postal code format per country

4. **Shipping Form Auto-Selection**
   - [ ] First shipping method auto-selected (Issue #27)
   - [ ] User can change selection
   - [ ] Recalculates totals on change

5. **Payment Form**
   - [ ] Standard payment option works
   - [ ] Stripe payment delegates to component
   - [ ] Hardcoded logic documented (Issue #28)

6. **Multi-Form Coordination**
   - [ ] Forms submit in sequence
   - [ ] Each waits for previous to succeed
   - [ ] Errors in one form don't block others
   - [ ] (Addresses Issue #22)

7. **Order Submission**
   - [ ] All three forms must succeed
   - [ ] Navigation to confirmation page
   - [ ] Order cleared after navigation (Issue #31)
   - [ ] Success toast shown

**Mocks:**
- `useOrderStore` with mock order
- `useCheckout` composable
- GraphQL mutations (address, shipping, payment)
- Stripe SDK (if needed)
- Router navigation

**SSR Considerations:**
- [ ] Forms render on server
- [ ] Country data fetched SSR
- [ ] No hydration mismatches

---

#### E2E Tests: Complete Checkout Flow

**File:** `tests/e2e/flows/cart-to-confirmation.spec.ts`

**Critical Path Coverage:** Flow 3

**Test Cases:**

1. **Guest Checkout - Happy Path**
   - [ ] Add product to cart
   - [ ] Click "Checkout"
   - [ ] Fill address form as guest
   - [ ] Submit address
   - [ ] Select shipping method
   - [ ] Submit shipping
   - [ ] Enter payment details (test mode)
   - [ ] Submit payment
   - [ ] Arrive at confirmation page
   - [ ] Order details displayed correctly

2. **Authenticated Checkout**
   - [ ] Log in first
   - [ ] Add product to cart
   - [ ] Click "Checkout"
   - [ ] Address form pre-filled
   - [ ] Complete checkout faster

3. **Address Validation Errors**
   - [ ] Submit empty address form
   - [ ] See validation errors
   - [ ] Fill in valid data
   - [ ] Errors clear
   - [ ] Submission succeeds

4. **Shipping Method Selection**
   - [ ] Multiple shipping options available
   - [ ] Select different method
   - [ ] Order total updates
   - [ ] Selection persists

5. **Payment Errors**
   - [ ] Invalid credit card number
   - [ ] Declined payment
   - [ ] Network error during payment
   - [ ] User can retry payment

6. **Confirmation Page**
   - [ ] Order code displayed
   - [ ] Order details shown
   - [ ] Payment status shown
   - [ ] Print button works (Issue #34)
   - [ ] Invalid order code shows 404 (Issue #33)

**Failure Modes:**
- [ ] Empty cart at checkout
- [ ] Address validation fails
- [ ] No shipping methods available
- [ ] Payment gateway timeout
- [ ] Order state transition fails

**Mobile vs Desktop:**
- [ ] Forms responsive on mobile
- [ ] Multi-step indicator visible
- [ ] Payment fields accessible
- [ ] Keyboard doesn't obscure inputs

---

### Category Pages

**Critical Path Reference:** Flow 1 (Step 1.3: Category Page)  
**Files:**
- `src/base/pages/category/[slug].vue`
- `src/base/components/category/CategoryCard.vue`

**Critical Issues:** #4, #5, #6

#### Integration Tests: Category Page

**File:** `src/base/pages/category/category.integration.spec.ts`

**Test Cases:**

1. **Valid Category**
   - [ ] Fetches collection by slug
   - [ ] Displays category name as h1
   - [ ] Shows category description (if available)
   - [ ] Lists products in category
   - [ ] Shows product cards with images, names, prices

2. **Pagination**
   - [ ] Shows first page of products (default 24)
   - [ ] Pagination controls visible if > 24 products
   - [ ] Click next page loads more products
   - [ ] URL updates with page param
   - [ ] Can navigate directly to page 2

3. **Invalid Category Slug**
   - [ ] Non-existent slug returns 404
   - [ ] Error handled gracefully
   - [ ] (Addresses Issue #5)

4. **SEO Elements**
   - [ ] Meta title includes category name
   - [ ] Meta description present (Issue #4)
   - [ ] Breadcrumb trail correct
   - [ ] CollectionPage schema.org markup
   - [ ] Pagination prev/next link tags

5. **Product Count**
   - [ ] Shows total product count
   - [ ] Shows current page range

**Mocks:**
- GraphQL `GetCollectionBySlug` query
- Product fixtures
- Collection fixtures

**SSR Testing:**
- [ ] Page renders on server
- [ ] Collection data available on mount
- [ ] No flicker on client hydration

**Edge Cases:**
- [ ] Empty category (0 products)
- [ ] Category with exactly 24 products (no pagination)
- [ ] Very long category names/descriptions
- [ ] Special characters in slugs

---

#### E2E Tests: Category Navigation

**File:** `tests/e2e/flows/category-navigation.spec.ts`

**Test Cases:**

1. **Browse Categories**
   - [ ] Homepage shows category carousel
   - [ ] Click category card
   - [ ] Category page loads
   - [ ] Breadcrumb shows: Home > Category Name
   - [ ] Products displayed

2. **Scroll Behavior**
   - [ ] Scroll down on category page
   - [ ] Click product
   - [ ] Return to category
   - [ ] Scroll position maintained (Issue #6)

3. **Filter/Sort (if implemented)**
   - [ ] Sort by price low/high
   - [ ] Filter by availability
   - [ ] URL params update
   - [ ] Results update correctly

**Mobile vs Desktop:**
- [ ] Category grid responsive (2 cols mobile, 4+ desktop)
- [ ] Infinite scroll or pagination on mobile
- [ ] Touch gestures work

---

### Product Detail Pages

**Critical Path Reference:** Flow 1 (Step 1.4: Product Detail Page)  
**Files:**
- `src/base/pages/product/[slug].vue`
- `src/base/stores/useProductStore.ts`
- `src/base/composables/useProductVariants.ts`
- `src/base/composables/useProductLightbox.ts`

**Critical Issues:** #7, #8, #9

#### Unit Tests: useProductStore

**File:** `src/base/stores/useProductStore.spec.ts`

**Test Cases:**

1. **init(product)**
   - [ ] Sets product in state
   - [ ] Initializes selectedOptions
   - [ ] Selects default variant
   - [ ] Populates optionGroups computed
   - [ ] Sets galleryAssets from default variant

2. **setOption(groupId, optionId)**
   - [ ] Updates selectedOptions
   - [ ] Triggers selectedVariant recomputation
   - [ ] Updates galleryAssets if variant changes
   - [ ] Updates stock level

3. **selectedVariant Computed**
   - [ ] Returns correct variant based on selections
   - [ ] Returns null if no match
   - [ ] Handles partial selections

4. **optionGroups Computed**
   - [ ] Flattens product.optionGroups
   - [ ] Each group has name, id, options array

5. **stockLevel State**
   - [ ] Initializes from product data
   - [ ] Dual-source pattern documented (Issue #8)

6. **refreshStock()**
   - [ ] Fetches live stock for selected variant
   - [ ] Updates stockLevel state
   - [ ] Handles errors gracefully

7. **galleryAssets Computed**
   - [ ] Returns variant assets if variant selected
   - [ ] Falls back to product assets
   - [ ] Returns empty array if none

**Mocks:**
- GraphQL queries
- Product fixtures with variants

**Edge Cases:**
- [ ] Product with no variants
- [ ] Product with single variant
- [ ] Product with multiple option groups (color + size)
- [ ] Out of stock variant selection

---

#### Integration Tests: Product Page

**File:** `src/base/pages/product/product.integration.spec.ts`

**Test Cases:**

1. **Product with Single Variant**
   - [ ] Displays product name, price, description
   - [ ] No variant selector shown
   - [ ] Add to cart button enabled
   - [ ] Stock level displayed

2. **Product with Multiple Variants**
   - [ ] Displays product name
   - [ ] Shows variant selectors (dropdowns or buttons)
   - [ ] Default variant pre-selected
   - [ ] Price updates on variant change
   - [ ] Stock level updates on variant change
   - [ ] Add to cart button disabled until variant selected

3. **Image Gallery**
   - [ ] Shows product images
   - [ ] Thumbnail navigation works
   - [ ] Click image opens lightbox
   - [ ] Lightbox navigation works
   - [ ] Images update on variant change

4. **Add to Cart**
   - [ ] Click "Add to Cart"
   - [ ] Loading state shown (Issue #9 watch flush)
   - [ ] Success feedback
   - [ ] Cart panel opens
   - [ ] Product added with selected variant

5. **SEO Elements**
   - [ ] Meta title includes product name
   - [ ] Meta description present
   - [ ] Product schema.org markup (Issue #7 - missing brand)
   - [ ] Breadcrumb trail: Home > Category > Product
   - [ ] OpenGraph tags for social sharing
   - [ ] Canonical URL set

6. **Out of Stock Product**
   - [ ] Stock level shows "Out of Stock"
   - [ ] Add to cart button disabled
   - [ ] Alternative messaging shown

**Mocks:**
- GraphQL `GetProductBySlug` query
- `useProductStore`
- `useOrderStore.addItemToOrder`
- Product fixtures with variants

**SSR Testing:**
- [ ] Product data fetched server-side
- [ ] Images load with SSR
- [ ] No CLS (Cumulative Layout Shift)

**Edge Cases:**
- [ ] Invalid product slug (404)
- [ ] Product with 10+ variants
- [ ] Product with no images
- [ ] Very long product descriptions

---

#### E2E Tests: Product Interaction

**File:** `tests/e2e/flows/product-interaction.spec.ts`

**Test Cases:**

1. **Variant Selection**
   - [ ] Navigate to product with variants
   - [ ] Select first option (e.g., color)
   - [ ] Select second option (e.g., size)
   - [ ] Price updates live
   - [ ] Stock level updates
   - [ ] Images change to variant images

2. **Image Lightbox**
   - [ ] Click product image
   - [ ] Lightbox opens full-screen
   - [ ] Navigate between images with arrows
   - [ ] Close lightbox with X or Esc
   - [ ] Keyboard navigation works

3. **Stock Refresh**
   - [ ] Product shows initial stock level
   - [ ] Change variant
   - [ ] Stock level updates immediately
   - [ ] (Tests Issue #8 dual-source pattern)

**Mobile vs Desktop:**
- [ ] Variant selectors usable on mobile
- [ ] Image gallery swipeable
- [ ] Lightbox works with touch gestures
- [ ] Add to cart button always visible (sticky)

---

### Account Management

**Critical Path Reference:** Flow 2 (Steps 2.3 & 2.4)  
**Files:**
- `src/base/pages/account/index.vue`
- `src/base/pages/account/orders.vue`
- `src/base/stores/useCustomerStore.ts`

**Critical Issues:** #17, #18, #19, #20, #21

#### Unit Tests: useCustomerStore

**File:** `src/base/stores/useCustomerStore.spec.ts`

**Test Cases:**

1. **Initial State**
   - [ ] Customer is null
   - [ ] Loading is false
   - [ ] Error is null

2. **fetchCustomer(type)**
   - [ ] Fetches base customer data
   - [ ] Fetches detail customer with addresses
   - [ ] Sets loading state during fetch
   - [ ] Updates customer state on success
   - [ ] Sets error state on failure

3. **login(email, password, rememberMe)**
   - [ ] Calls GraphQL mutation
   - [ ] Returns success result
   - [ ] Returns error codes on failure
   - [ ] Updates auth store on success

4. **logout()**
   - [ ] Clears customer state
   - [ ] Calls auth store clearSession
   - [ ] Handles errors gracefully

5. **register(input)**
   - [ ] Creates new customer account
   - [ ] Returns success or error result
   - [ ] Sets session on success

6. **verify(token)**
   - [ ] Verifies email with token
   - [ ] Returns result with error codes

7. **requestPasswordReset(email)**
   - [ ] Sends reset email
   - [ ] Returns success status

8. **resetPassword(token, password)**
   - [ ] Resets password with token
   - [ ] Returns success or error result

**Mocks:**
- GraphQL mutations
- `useAuthStore`
- Toast notifications

**Edge Cases:**
- [ ] Network errors during operations
- [ ] Invalid tokens
- [ ] Already verified accounts
- [ ] Duplicate email registration

---

#### Integration Tests: Account Pages

**File:** `src/base/pages/account/account.integration.spec.ts`

**Test Cases:**

1. **Account Dashboard - Authenticated**
   - [ ] Loads customer details
   - [ ] Shows loading state (Issue #18)
   - [ ] Displays name, email, phone
   - [ ] Shows default address
   - [ ] Logout button visible and works

2. **Account Dashboard - Not Authenticated**
   - [ ] Redirects to login page
   - [ ] (Tests Issue #17 - duplicate auth guard)

3. **Orders History Page**
   - [ ] Fetches order history
   - [ ] Displays orders in table
   - [ ] Shows order date, code, total, state
   - [ ] Formats currency correctly
   - [ ] Formats dates correctly
   - [ ] Orders sorted by date (newest first)

4. **Order Detail Links**
   - [ ] Click order row
   - [ ] Navigates to order detail page
   - [ ] (Addresses Issue #21)

5. **Type Safety**
   - [ ] Customer data properly typed
   - [ ] No unsafe type assertions
   - [ ] (Addresses Issue #19)

**Mocks:**
- `useCustomerStore`
- `useAuthStore`
- GraphQL queries
- Router navigation
- Customer and order fixtures

**SSR Testing:**
- [ ] Pages render on server (with auth check)
- [ ] Protected routes handled server-side
- [ ] No hydration issues

---

#### E2E Tests: Account Flow

**File:** `tests/e2e/flows/account-management.spec.ts`

**Test Cases:**

1. **View Account Dashboard**
   - [ ] Log in as user
   - [ ] Navigate to `/account`
   - [ ] See user information
   - [ ] Default address displayed
   - [ ] No loading flicker (Issue #18)

2. **View Order History**
   - [ ] From account dashboard, click "Orders"
   - [ ] Navigate to `/account/orders`
   - [ ] See list of past orders
   - [ ] Orders sorted by date
   - [ ] Click order to view details

3. **Logout**
   - [ ] Click logout button
   - [ ] Redirected to home or login
   - [ ] Cannot access account pages
   - [ ] Session cleared

4. **Protected Route Guard**
   - [ ] Visit `/account` as guest
   - [ ] Redirected to `/login`
   - [ ] No flash of protected content (Issue #17, #13)

**Failure Modes:**
- [ ] API error loading customer data
- [ ] No orders in history
- [ ] Session expires while viewing account

---

### Navigation & Routing

**Critical Path Reference:** All flows  
**Files:**
- `src/base/components/header/Navigation.vue`
- `src/base/components/BreadcrumbTrail.vue`
- `src/base/utils/getCategoryTrail.ts`
- `src/base/utils/getProductTrail.ts`

**Critical Issues:** #3, #6

#### Unit Tests: Trail Utilities

**File:** `src/base/utils/getCategoryTrail.spec.ts`

**Test Cases:**

1. **getCategoryTrail(collection, collections)**
   - [ ] Returns array of breadcrumb items
   - [ ] Includes parent collections
   - [ ] Handles nested categories
   - [ ] Returns empty array for root collection
   - [ ] Handles circular references gracefully

**File:** `src/base/utils/getProductTrail.spec.ts`

**Test Cases:**

1. **getProductTrail(product, collections)**
   - [ ] Returns product breadcrumb with category
   - [ ] Uses first collection if multiple
   - [ ] Includes category trail
   - [ ] Handles products without collections

**Mocks:**
- Collection fixtures
- Product fixtures

**Edge Cases:**
- [ ] Missing parent collections
- [ ] Deep nesting (5+ levels)
- [ ] Collections with same name

---

#### Integration Tests: Navigation Component

**File:** `src/base/components/header/Navigation.integration.spec.ts`

**Test Cases:**

1. **Menu Collections Display**
   - [ ] Fetches menuCollections state
   - [ ] Displays top-level categories
   - [ ] Shows child categories in dropdown
   - [ ] (Addresses Issue #3 - data source documentation)

2. **Active Route Highlighting**
   - [ ] Current page highlighted in nav
   - [ ] Parent category highlighted on child pages

3. **Mobile Navigation**
   - [ ] Hamburger menu toggles
   - [ ] Mobile menu slides in
   - [ ] Categories expandable
   - [ ] Close button works

**Mocks:**
- `useState("menuCollections")`
- Router current route
- Collection fixtures

---

#### E2E Tests: Navigation Flow

**File:** `tests/e2e/flows/navigation.spec.ts`

**Test Cases:**

1. **Main Navigation**
   - [ ] Hover over category in header
   - [ ] Dropdown shows subcategories
   - [ ] Click subcategory
   - [ ] Navigate to category page
   - [ ] Breadcrumb correct

2. **Breadcrumb Navigation**
   - [ ] Navigate to product page
   - [ ] Breadcrumb shows: Home > Category > Product
   - [ ] Click category in breadcrumb
   - [ ] Navigate back to category
   - [ ] Click home in breadcrumb
   - [ ] Navigate to homepage

3. **Scroll Restoration**
   - [ ] Browse category page, scroll down
   - [ ] Click product
   - [ ] Click back button
   - [ ] Scroll position restored (Issue #6)

4. **Mobile Navigation**
   - [ ] Open mobile menu
   - [ ] Navigate to category
   - [ ] Menu closes automatically
   - [ ] Back button works

**Mobile vs Desktop:**
- [ ] Desktop shows hover dropdowns
- [ ] Mobile shows hamburger menu
- [ ] Touch targets adequate size
- [ ] Swipe gestures work

---

### SEO & Metadata

**Critical Path Reference:** Cross-Cutting Concerns (SEO & Schema.org)  
**Files:**
- `src/app/layouts/default.vue`
- `src/schema/identity.ts`
- `nuxt.config.ts` (SEO modules)

**Critical Issues:** #1, #4, #7

#### E2E Tests: Product SEO

**File:** `tests/e2e/seo/product-seo.spec.ts`

**Test Cases:**

1. **Meta Tags**
   - [ ] Title tag includes product name
   - [ ] Meta description present and unique
   - [ ] OpenGraph title, description, image
   - [ ] Twitter Card tags present
   - [ ] Canonical URL correct

2. **Schema.org Markup**
   - [ ] Product schema present
   - [ ] Includes name, description, price
   - [ ] Includes images
   - [ ] Includes brand (Issue #7)
   - [ ] Includes availability/stock
   - [ ] Offer schema nested correctly

3. **Structured Data Validation**
   - [ ] JSON-LD script tag present
   - [ ] Valid JSON syntax
   - [ ] Passes Google Rich Results Test

4. **Breadcrumb Schema**
   - [ ] BreadcrumbList schema present
   - [ ] All levels included
   - [ ] URLs correct

**Tools:**
- Playwright HTML parsing
- Schema.org validator
- Google Rich Results API

---

#### E2E Tests: Category SEO

**File:** `tests/e2e/seo/category-seo.spec.ts`

**Test Cases:**

1. **Meta Tags**
   - [ ] Title tag includes category name
   - [ ] Meta description present (Issue #4)
   - [ ] OpenGraph tags present
   - [ ] Canonical URL correct

2. **CollectionPage Schema**
   - [ ] Schema.org markup present
   - [ ] Includes category name, description
   - [ ] Number of items shown

3. **Pagination SEO**
   - [ ] Page 2+ has rel="prev"
   - [ ] Page 1+ has rel="next"
   - [ ] Canonical points to page 1 or self
   - [ ] Meta robots allows indexing

4. **Image Alt Text**
   - [ ] Product images have descriptive alt text
   - [ ] Not generic like "Hero image" (Issue #1)

---

#### E2E Tests: General SEO

**File:** `tests/e2e/seo/general-seo.spec.ts`

**Test Cases:**

1. **Robots.txt**
   - [ ] File accessible at `/robots.txt`
   - [ ] Disallows /account, /checkout, /cart
   - [ ] Allows /category, /product
   - [ ] Sitemap URL present

2. **Sitemap.xml**
   - [ ] File accessible at `/sitemap.xml`
   - [ ] Includes all public pages
   - [ ] Excludes protected pages
   - [ ] Valid XML format

3. **Global Meta**
   - [ ] Default title from config
   - [ ] Default description from config
   - [ ] OG locale set
   - [ ] Site name consistent

4. **Accessibility**
   - [ ] All pages have h1
   - [ ] Heading hierarchy logical
   - [ ] Lang attribute on html tag
   - [ ] Skip to content link present

---

### GraphQL Operations

**Critical Path Reference:** Cross-Cutting Concerns (GraphQL Client)  
**Files:**
- `src/base/gql/queries/*.gql`
- `src/base/gql/fragments/*.gql`
- `src/base/plugins/gql-plugin.ts`

**Critical Issues:** #29

#### Unit Tests: GraphQL Plugin

**File:** `src/base/plugins/gql-plugin.spec.ts`

**Test Cases:**

1. **Global Error Handler**
   - [ ] Catches GraphQL errors
   - [ ] Logs statusCode, operationName, gqlErrors
   - [ ] Calls `useGqlError()` composable
   - [ ] Doesn't crash app on error

2. **Authentication Headers**
   - [ ] Token from authStore included in requests
   - [ ] Channel token included
   - [ ] Bearer prefix correct

3. **Error Response Handling**
   - [ ] Network errors handled
   - [ ] GraphQL errors parsed
   - [ ] Error codes extracted

**Mocks:**
- GraphQL client
- `useGqlError` composable
- `useAuthStore`

---

#### Integration Tests: Query/Mutation Patterns

**File:** `src/base/gql/graphql-operations.integration.spec.ts`

**Test Cases:**

1. **Product Queries**
   - [ ] `GetProductBySlug` returns correct product
   - [ ] Includes all required fragments
   - [ ] Returns null for invalid slug

2. **Collection Queries**
   - [ ] `GetCollectionBySlug` returns collection with products
   - [ ] Pagination params work
   - [ ] Includes product fragments

3. **Order Mutations**
   - [ ] `AddItemToOrder` creates or updates order
   - [ ] Returns order with line items
   - [ ] Handles error results

4. **Customer Mutations**
   - [ ] `LogInUser` returns token in headers
   - [ ] `RegisterCustomer` creates account
   - [ ] Returns error codes correctly

5. **Type Safety**
   - [ ] Generated types match operations (Issue #29)
   - [ ] No string literals for operation names
   - [ ] Response types enforced

**Mocks:**
- MSW GraphQL handlers
- Mock responses from fixtures

**SSR Testing:**
- [ ] Queries work server-side
- [ ] Tokens passed correctly in SSR
- [ ] No client-only operations called on server

---

### Stores & State Management

**Critical Path Reference:** Cross-Cutting Concerns (State Management)  
**Files:**
- `src/base/stores/useAuthStore.ts`
- `src/base/stores/useOrderStore.ts`
- `src/base/stores/useCustomerStore.ts`
- `src/base/stores/useProductStore.ts`

**Critical Issues:** #8, #15

#### Integration Tests: Store Interactions

**File:** `src/base/stores/store-interactions.integration.spec.ts`

**Test Cases:**

1. **Login Flow Store Updates**
   - [ ] Login updates authStore
   - [ ] AuthStore triggers orderStore.fetchOrder
   - [ ] CustomerStore syncs with authStore
   - [ ] All stores consistent

2. **Cart to Checkout Store Flow**
   - [ ] OrderStore has active order
   - [ ] Checkout updates order in store
   - [ ] CustomerStore provides address data
   - [ ] Payment completes in orderStore

3. **Logout Store Cleanup**
   - [ ] AuthStore cleared
   - [ ] CustomerStore cleared
   - [ ] OrderStore cleared (or kept for guest)
   - [ ] No stale data remains

4. **Store Persistence**
   - [ ] AuthStore persists to localStorage (Issue #15)
   - [ ] OrderStore does NOT persist (cart lost on refresh?)
   - [ ] Document persistence strategy

**Mocks:**
- GraphQL operations
- localStorage
- Pinia setup

**Edge Cases:**
- [ ] Multiple tabs open (state sync)
- [ ] Store mutations from multiple sources
- [ ] Race conditions in async actions

---

### Composables

**Critical Path Reference:** Various flows  
**Files:**
- `src/base/composables/useCheckout.ts`
- `src/base/composables/useGqlSession.ts`
- `src/base/composables/useOrderMutation.ts`
- `src/base/composables/usePagination.ts`
- `src/base/composables/useProductVariants.ts`
- `src/base/composables/useSimpleSearch.ts`
- `src/base/composables/useStripe.ts`

**Critical Issues:** #10, #29, #30

#### Unit Tests: useOrderMutation

**File:** `src/base/composables/useOrderMutation.spec.ts`

**Test Cases:**

1. **Success Result**
   - [ ] Returns status: "success"
   - [ ] Returns order data
   - [ ] No errors

2. **Partial Success**
   - [ ] Returns status: "partial"
   - [ ] Returns order with warnings
   - [ ] Error messages included

3. **Error Result**
   - [ ] Returns status: "error"
   - [ ] Returns error codes
   - [ ] Order may be null

4. **Normalize Responses**
   - [ ] Handles different mutation response shapes
   - [ ] Extracts errors consistently (Issue #10)
   - [ ] Type-safe return values

**Mocks:**
- GraphQL mutation responses
- Error result fixtures

---

#### Unit Tests: usePagination

**File:** `src/base/composables/usePagination.spec.ts`

**Test Cases:**

1. **Initialization**
   - [ ] Accepts initial page, pageSize
   - [ ] Calculates offset correctly
   - [ ] Provides reactive refs

2. **Navigation**
   - [ ] `nextPage()` increments page
   - [ ] `prevPage()` decrements page
   - [ ] `goToPage(n)` sets page
   - [ ] Doesn't go below page 1

3. **Total Items**
   - [ ] Calculates total pages
   - [ ] Handles exact multiples of pageSize
   - [ ] Handles remainders

4. **URL Sync (if implemented)**
   - [ ] Updates URL query params
   - [ ] Reads from URL on init
   - [ ] Browser back/forward works

**Edge Cases:**
- [ ] Page 0 or negative
- [ ] Page beyond total pages
- [ ] PageSize changes mid-navigation

---

#### Unit Tests: useSimpleSearch

**File:** `src/base/composables/useSimpleSearch.spec.ts`

**Test Cases:**

1. **Search Query**
   - [ ] Accepts search term
   - [ ] Debounces input
   - [ ] Triggers GraphQL query
   - [ ] Returns results

2. **Loading State**
   - [ ] Loading true during query
   - [ ] Loading false after results

3. **Empty Results**
   - [ ] Handles 0 results gracefully
   - [ ] Shows "no results" message

4. **Error Handling**
   - [ ] Network error handled
   - [ ] Shows error message

**Mocks:**
- GraphQL search query
- Product fixtures

---

#### Unit Tests: useStripe

**File:** `src/base/composables/useStripe.spec.ts`

**Test Cases:**

1. **Initialize Stripe**
   - [ ] Loads Stripe.js
   - [ ] Creates Stripe instance with public key
   - [ ] Returns client

2. **Create Payment Intent**
   - [ ] Calls Vendure API
   - [ ] Returns client secret
   - [ ] Handles errors

3. **Confirm Payment**
   - [ ] Calls Stripe confirmPayment
   - [ ] Returns result
   - [ ] Handles declined cards

**Mocks:**
- Stripe.js SDK
- Vendure payment endpoints
- Test credit cards

---

### Utilities & Validators

**Files:**
- `src/base/utils/*.ts`
- `src/base/validators/*.ts`

#### Unit Tests: Validators

**File:** `src/base/validators/addressForm.spec.ts`

**Test Cases:**

1. **Valid Address**
   - [ ] All required fields present
   - [ ] Email format valid
   - [ ] Postal code format valid
   - [ ] Country code valid

2. **Invalid Email**
   - [ ] Missing @ symbol
   - [ ] Missing domain
   - [ ] Returns validation error

3. **Missing Required Fields**
   - [ ] Returns error for each missing field
   - [ ] Error messages clear

4. **Postal Code Validation**
   - [ ] Validates format per country (if implemented)
   - [ ] Accepts various formats

**Similar Tests For:**
- `loginForm.spec.ts`
- `registerForm.spec.ts`
- `paymentForm.spec.ts`
- `shippingForm.spec.ts`
- `requestPasswordResetForm.spec.ts`
- `resetPasswordForm.spec.ts`

**Tools:**
- Zod schema testing
- Validator library

---

#### Unit Tests: syncOrderShippingAddress

**File:** `src/base/utils/syncOrderShippingAddress.spec.ts`

**Test Cases:**

1. **Sync Address from Customer**
   - [ ] Takes customer default address
   - [ ] Maps to order shipping address format
   - [ ] Handles missing fields gracefully

2. **Sync Address from Form**
   - [ ] Takes form data
   - [ ] Maps to order format
   - [ ] Validates required fields

**Edge Cases:**
- [ ] Customer with no address
- [ ] Partial address data
- [ ] Different address formats

---

### Error Handling & Fallbacks

**Critical Path Reference:** All flows  
**Critical Issues:** #10, #32, #33

#### Integration Tests: Error States

**File:** `src/base/components/error-handling.integration.spec.ts`

**Test Cases:**

1. **Network Errors**
   - [ ] GraphQL query fails
   - [ ] Shows error message to user
   - [ ] Provides retry button
   - [ ] Doesn't crash app

2. **GraphQL Errors**
   - [ ] Mutation returns error result
   - [ ] Error code extracted (Issue #10)
   - [ ] User-friendly message shown
   - [ ] Form allows retry

3. **404 Not Found**
   - [ ] Invalid product slug
   - [ ] Invalid category slug
   - [ ] Invalid order code (Issue #33)
   - [ ] Shows 404 page
   - [ ] Navigation to home available

4. **Authentication Errors**
   - [ ] Invalid credentials
   - [ ] Expired session
   - [ ] Token refresh fails
   - [ ] Redirects to login

5. **Payment Errors**
   - [ ] Card declined
   - [ ] Payment gateway timeout
   - [ ] Shows error message (Issue #32)
   - [ ] Allows retry without losing cart

6. **Out of Stock Errors**
   - [ ] Product out of stock during add to cart
   - [ ] Clear error message
   - [ ] Suggests alternatives

**Mocks:**
- GraphQL error responses
- Network failure simulation
- Error code fixtures

**SSR Considerations:**
- [ ] Errors rendered server-side
- [ ] Error boundaries work SSR
- [ ] No hydration errors from error states

---

#### E2E Tests: Error Recovery

**File:** `tests/e2e/flows/error-recovery.spec.ts`

**Test Cases:**

1. **Checkout Error Recovery**
   - [ ] Start checkout
   - [ ] Simulate payment failure
   - [ ] See error message
   - [ ] Click retry
   - [ ] Complete checkout successfully

2. **Cart Error Recovery**
   - [ ] Add item to cart
   - [ ] Item becomes unavailable
   - [ ] See error when proceeding to checkout
   - [ ] Remove unavailable item
   - [ ] Continue with available items

3. **Session Expiry**
   - [ ] Log in
   - [ ] Simulate session expiry
   - [ ] Next protected action fails
   - [ ] Redirected to login
   - [ ] After login, return to intended action

**Failure Modes:**
- [ ] Multiple errors simultaneously
- [ ] Error during error handling
- [ ] Infinite error loops prevented

---

## Mock Strategy

### GraphQL Mocking

**Tool:** MSW (Mock Service Worker)

**Setup:**
- Mock GraphQL endpoint: `http://localhost:3001/shop-api`
- Handlers in `tests/mocks/graphql/handlers.ts`
- Response fixtures in `tests/mocks/graphql/responses/`

**Example Handler:**

```typescript
import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetProductBySlug', (req, res, ctx) => {
    const { slug } = req.variables
    const product = productFixtures[slug]
    
    if (!product) {
      return res(ctx.data({ product: null }))
    }
    
    return res(ctx.data({ product }))
  }),
  
  graphql.mutation('AddItemToOrder', (req, res, ctx) => {
    const { productVariantId, quantity } = req.variables
    // ... return mock order with item added
  }),
]
```

**Best Practices:**
- Mock at network level, not module level
- Use realistic response data
- Include error scenarios
- Version fixtures with schema changes

---

### Store Mocking

**When to Mock:**
- Component tests that don't need full store logic
- Testing component in isolation

**How to Mock:**

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'

// In test setup
setActivePinia(createPinia())

// Mock specific store actions
const orderStore = useOrderStore()
vi.spyOn(orderStore, 'addItemToOrder').mockResolvedValue({ status: 'success' })
```

**What NOT to Mock:**
- Store internal logic (test that directly)
- Store interactions (test integration)

---

### Composable Mocking

**When to Mock:**
- Testing components that use composables
- Composable has complex side effects

**How to Mock:**

```typescript
import { vi } from 'vitest'

vi.mock('@/composables/useCheckout', () => ({
  useCheckout: () => ({
    recalcShipping: vi.fn(),
    loading: ref(false),
    error: ref(null),
  }),
}))
```

**Caution:**
- Over-mocking composables defeats purpose of integration tests
- Prefer real implementations when possible

---

### External Service Mocking

**Stripe:**
- Use Stripe test mode tokens
- Mock Stripe.js for unit tests
- Use real Stripe SDK for E2E (test mode)

**Unsplash API:**
- Mock API responses for homepage hero
- Use placeholder images in tests
- Don't call real API in CI/CD

**Vendure GraphQL:**
- Mock entirely for unit/integration tests
- Use test Vendure instance for E2E
- Seed database with test data

---

## SSR vs CSR Testing

### Server-Side Rendering Tests

**Requirements:**
1. All pages must render on server without errors
2. Data fetching must work server-side
3. No `window` or `document` access without guards

**Test Strategy:**

```typescript
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'

test('Component renders SSR', async () => {
  const app = createSSRApp(ProductPage, { props })
  const html = await renderToString(app)
  
  expect(html).toContain('Product Name')
  expect(html).not.toContain('undefined')
})
```

**What to Test:**
- [ ] Page components render without errors
- [ ] Data from `useAsyncData` available in HTML
- [ ] No client-only code executed
- [ ] Meta tags rendered in HTML
- [ ] Schema.org JSON-LD in HTML

---

### Client-Side Hydration Tests

**Requirements:**
1. Server HTML hydrates without mismatches
2. Reactive state works after hydration
3. Event handlers attached correctly

**Test Strategy:**

```typescript
test('Component hydrates without mismatch', async () => {
  // Render SSR
  const ssrHtml = await renderSSR(Component)
  
  // Mount client-side
  const wrapper = mount(Component, {
    attachTo: createFromHTML(ssrHtml)
  })
  
  // Check no hydration warnings
  expect(console.warn).not.toHaveBeenCalled()
  
  // Test interactivity
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
})
```

**Common Hydration Issues:**
- Different timestamps/dates rendered
- Client-only data in SSR HTML
- Conditional rendering based on `process.client`
- Random values without `useId()`

---

### Testing Both Modes

**Pattern:**

```typescript
describe.each([
  { mode: 'SSR', setup: setupSSR },
  { mode: 'CSR', setup: setupCSR },
])('ProductPage - $mode', ({ mode, setup }) => {
  test('displays product name', async () => {
    const { wrapper } = await setup(ProductPage, { props })
    expect(wrapper.text()).toContain('Product Name')
  })
})
```

---

## Mobile vs Desktop Testing

### Responsive Breakpoints

**Test at These Widths:**
- Mobile: 375px, 414px (iPhone sizes)
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

**What Changes:**
- Navigation (hamburger vs horizontal)
- Grid layouts (2 col vs 4 col)
- Image sizes
- Form layouts
- Modal behaviors

---

### Touch vs Mouse Testing

**Touch-Specific Tests:**
- [ ] Swipe gestures (carousel, gallery)
- [ ] Touch targets min 44x44px
- [ ] No hover-only interactions
- [ ] Pinch to zoom (where appropriate)
- [ ] Long press menus (if implemented)

**Mouse-Specific Tests:**
- [ ] Hover states visible
- [ ] Dropdown menus on hover
- [ ] Keyboard navigation
- [ ] Right-click context menus

---

### Mobile E2E Tests

**File:** `tests/e2e/mobile/mobile-checkout.spec.ts`

**Setup:**

```typescript
test.use({
  viewport: { width: 375, height: 667 },
  hasTouch: true,
  isMobile: true,
})
```

**Test Cases:**
- [ ] Complete checkout on mobile
- [ ] Image gallery swipe works
- [ ] Mobile menu navigation
- [ ] Sticky add to cart button
- [ ] Virtual keyboard handling
- [ ] Scroll position on navigation

---

## Performance Testing

### Core Web Vitals

**Metrics to Test:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms
- **TTFB (Time to First Byte):** < 800ms

**Test Strategy:**

```typescript
import { test, expect } from '@playwright/test'

test('Homepage Core Web Vitals', async ({ page }) => {
  await page.goto('/')
  
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        resolve(entries)
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    })
  })
  
  expect(metrics.renderTime).toBeLessThan(2500)
})
```

**Pages to Test:**
- [ ] Homepage
- [ ] Category page
- [ ] Product page
- [ ] Checkout page

---

### Bundle Size

**Targets:**
- Initial JS bundle: < 200KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Total page weight: < 1MB

**Test Strategy:**

```bash
# Build and analyze
pnpm run build
pnpm exec vite-bundle-visualizer
```

**What to Check:**
- [ ] No duplicate dependencies
- [ ] Tree-shaking working
- [ ] Lazy loading implemented
- [ ] Code splitting by route

---

### Image Performance

**Test Cases:**
- [ ] Images use modern formats (webp, avif)
- [ ] Responsive images with srcset
- [ ] Lazy loading on off-screen images
- [ ] Proper image sizing (no oversized)
- [ ] Placeholder blur effects

**Tools:**
- Lighthouse image audit
- NuxtImage analysis
- Network tab inspection

---

### Data Fetching Performance

**Test Cases:**
- [ ] `useAsyncData` used for SSR data
- [ ] No duplicate GraphQL queries
- [ ] Pagination prevents loading all items
- [ ] Debounce on search inputs
- [ ] No unnecessary re-fetches

**Mocks:**
- Network throttling (3G, 4G)
- Slow API responses
- Large datasets

---

## Accessibility Testing

### WCAG Compliance

**Target:** WCAG 2.1 Level AA

**Test Categories:**
1. Keyboard Navigation
2. Screen Reader Support
3. Color Contrast
4. Focus Management
5. ARIA Labels

---

### Keyboard Navigation

**File:** `tests/e2e/accessibility/keyboard-navigation.spec.ts`

**Test Cases:**

1. **Tab Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Focus indicators visible
   - [ ] Focus order logical
   - [ ] No keyboard traps
   - [ ] Skip to content link works

2. **Form Navigation**
   - [ ] Tab between form fields
   - [ ] Enter submits forms
   - [ ] Escape closes modals
   - [ ] Arrow keys in dropdowns

3. **Cart Panel**
   - [ ] Open cart with keyboard
   - [ ] Navigate cart items
   - [ ] Adjust quantities with keyboard
   - [ ] Close cart with Escape

4. **Product Page**
   - [ ] Navigate variant options
   - [ ] Open image lightbox with Enter
   - [ ] Navigate images with arrows
   - [ ] Close lightbox with Escape

**Tools:**
- Playwright keyboard simulation
- Manual testing with screen reader

---

### Screen Reader Support

**File:** `tests/e2e/accessibility/screen-reader.spec.ts`

**Test Cases:**

1. **Semantic HTML**
   - [ ] All pages have h1
   - [ ] Heading hierarchy logical (h1 → h2 → h3)
   - [ ] Landmark regions (header, nav, main, footer)
   - [ ] Lists use ul/ol tags

2. **ARIA Labels**
   - [ ] Buttons have accessible names
   - [ ] Icons have aria-label
   - [ ] Form inputs have labels
   - [ ] Error messages announced
   - [ ] Loading states announced

3. **Live Regions**
   - [ ] Cart updates announced (aria-live)
   - [ ] Form errors announced
   - [ ] Success messages announced
   - [ ] Price changes announced

4. **Images**
   - [ ] All images have alt text
   - [ ] Decorative images use alt=""
   - [ ] Complex images have descriptions

**Tools:**
- NVDA (Windows)
- VoiceOver (Mac/iOS)
- Axe DevTools
- Playwright accessibility snapshots

---

### Color Contrast

**Test Cases:**
- [ ] Text has 4.5:1 contrast ratio
- [ ] Large text has 3:1 contrast ratio
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators have 3:1 contrast

**Tools:**
- Lighthouse accessibility audit
- Axe DevTools
- Contrast checker browser extension

---

### Focus Management

**Test Cases:**

1. **Modal Focus**
   - [ ] Focus moves to modal on open
   - [ ] Focus trapped in modal
   - [ ] Focus returns to trigger on close
   - [ ] Escape closes modal

2. **Route Navigation**
   - [ ] Focus moves to h1 on route change
   - [ ] Skip links work
   - [ ] Focus not lost on navigation

3. **Dynamic Content**
   - [ ] Focus managed when content loads
   - [ ] New items added to tab order
   - [ ] Removed items don't trap focus

**Tools:**
- Manual keyboard testing
- Playwright focus assertions

---

## Implementation Priorities

### Phase 1: Critical Path Tests (Week 1-2)

**Priority: High**

**Goal:** Cover three main user flows end-to-end

**Tasks:**
1. Set up test infrastructure
   - [ ] Install Vitest
   - [ ] Install Playwright
   - [ ] Configure MSW
   - [ ] Create test utilities
   - [ ] Set up CI/CD pipeline

2. E2E Tests for Critical Paths
   - [ ] `homepage-to-cart.spec.ts` (Flow 1)
   - [ ] `login-to-account.spec.ts` (Flow 2)
   - [ ] `cart-to-confirmation.spec.ts` (Flow 3)

3. Address High-Priority Issues
   - [ ] Test auth guards (Issue #13)
   - [ ] Test token security (Issue #15)
   - [ ] Test error handling (Issue #10)

**Success Criteria:**
- All three critical paths have E2E coverage
- Tests run in CI/CD
- High-priority security issues documented

---

### Phase 2: Store & Composable Tests (Week 3)

**Priority: High**

**Goal:** Test core business logic

**Tasks:**
1. Store Unit Tests
   - [ ] `useAuthStore.spec.ts`
   - [ ] `useOrderStore.spec.ts`
   - [ ] `useCustomerStore.spec.ts`
   - [ ] `useProductStore.spec.ts`

2. Composable Unit Tests
   - [ ] `useCheckout.spec.ts`
   - [ ] `useOrderMutation.spec.ts`
   - [ ] `usePagination.spec.ts`
   - [ ] `useSimpleSearch.spec.ts`

3. Address Type Safety Issues
   - [ ] Test Issue #19 (type assertions)
   - [ ] Test Issue #23 (unsafe casts)
   - [ ] Test Issue #29 (GQL types)

**Success Criteria:**
- All stores have >80% coverage
- All composables tested
- Type safety validated

---

### Phase 3: Component Integration Tests (Week 4)

**Priority: Medium**

**Goal:** Test component interactions

**Tasks:**
1. Cart Components
   - [ ] `CartAddButton.spec.ts`
   - [ ] `CartPanel.integration.spec.ts`

2. Checkout Components
   - [ ] `AddressForm.spec.ts`
   - [ ] `ShippingForm.spec.ts`
   - [ ] `PaymentForm.spec.ts`
   - [ ] `checkout.integration.spec.ts`

3. Account Components
   - [ ] `LoginForm.integration.spec.ts`
   - [ ] `account.integration.spec.ts`

**Success Criteria:**
- All critical components tested
- Form validation covered
- Multi-form coordination tested

---

### Phase 4: SEO & Accessibility Tests (Week 5)

**Priority: Medium**

**Goal:** Ensure SEO and accessibility compliance

**Tasks:**
1. SEO E2E Tests
   - [ ] `product-seo.spec.ts`
   - [ ] `category-seo.spec.ts`
   - [ ] `general-seo.spec.ts`

2. Accessibility E2E Tests
   - [ ] `keyboard-navigation.spec.ts`
   - [ ] `screen-reader.spec.ts`

3. Address SEO Issues
   - [ ] Test Issue #1 (alt text)
   - [ ] Test Issue #4 (meta descriptions)
   - [ ] Test Issue #7 (brand schema)

**Success Criteria:**
- All pages have SEO tests
- WCAG Level AA compliance
- Schema.org validation

---

### Phase 5: Utilities & Edge Cases (Week 6)

**Priority: Low**

**Goal:** Complete test coverage

**Tasks:**
1. Utility Tests
   - [ ] `getCategoryTrail.spec.ts`
   - [ ] `getProductTrail.spec.ts`
   - [ ] `syncOrderShippingAddress.spec.ts`

2. Validator Tests
   - [ ] All form validator schemas

3. Edge Case Testing
   - [ ] Error recovery flows
   - [ ] Network failures
   - [ ] Concurrent operations
   - [ ] Browser compatibility

**Success Criteria:**
- >90% overall code coverage
- All edge cases documented
- All known issues tested

---

### Ongoing: Maintenance & Updates

**Tasks:**
- [ ] Update tests when features added
- [ ] Monitor flaky tests
- [ ] Update fixtures with schema changes
- [ ] Review test performance
- [ ] Update test documentation

---

## Appendix: Tools & Setup

### Testing Stack

**Test Runner:** Vitest
- Fast, Vite-native test runner
- Compatible with Nuxt/Vue
- ESM support out of the box

**Component Testing:** Vue Test Utils + Vitest
- Official Vue testing library
- Mount and interact with components
- SSR testing support

**E2E Testing:** Playwright
- Cross-browser testing
- Mobile device emulation
- Network mocking
- Screenshot/video capture

**Mocking:** MSW (Mock Service Worker)
- Intercepts network requests
- Works in Node and browser
- Realistic mocking at network level

**Fixtures:** TypeScript files
- Type-safe test data
- Shared across tests
- Versioned with schema

---

### Vitest Configuration

**File:** `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.spec.ts',
        '**/*.config.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src/base',
    },
  },
})
```

---

### Playwright Configuration

**File:** `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

### Test Utilities

**File:** `tests/setup/test-utils.ts`

```typescript
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'

export function setupTest() {
  // Set up Pinia
  const pinia = createPinia()
  setActivePinia(pinia)
  
  // Set up Router
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  })
  
  return { pinia, router }
}

export function mountComponent(component: any, options = {}) {
  const { pinia, router } = setupTest()
  
  return mount(component, {
    global: {
      plugins: [pinia, router],
    },
    ...options,
  })
}

export function createMockProduct(overrides = {}) {
  return {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test Description',
    variants: [],
    assets: [],
    ...overrides,
  }
}

export function createMockOrder(overrides = {}) {
  return {
    id: '1',
    code: 'ORDER-001',
    state: 'AddingItems',
    lines: [],
    total: 0,
    totalWithTax: 0,
    ...overrides,
  }
}
```

---

### MSW Setup

**File:** `tests/mocks/graphql/handlers.ts`

```typescript
import { graphql } from 'msw'
import { productFixtures } from '../../fixtures/products'
import { collectionFixtures } from '../../fixtures/collections'

export const handlers = [
  // Product queries
  graphql.query('GetProductBySlug', (req, res, ctx) => {
    const { slug } = req.variables
    const product = productFixtures[slug]
    return res(ctx.data({ product }))
  }),

  // Collection queries
  graphql.query('GetCollectionBySlug', (req, res, ctx) => {
    const { slug } = req.variables
    const collection = collectionFixtures[slug]
    return res(ctx.data({ collection }))
  }),

  // Order mutations
  graphql.mutation('AddItemToOrder', (req, res, ctx) => {
    const { productVariantId, quantity } = req.variables
    // Return mock order
    return res(ctx.data({
      addItemToOrder: {
        __typename: 'Order',
        id: '1',
        lines: [{ id: '1', productVariant: { id: productVariantId }, quantity }],
      },
    }))
  }),
]
```

**File:** `tests/setup/vitest-setup.ts`

```typescript
import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from '../mocks/graphql/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

### CI/CD Integration

**File:** `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run test
      - run: pnpm run test:coverage
      
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm exec playwright install --with-deps
      - run: pnpm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

### Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:component": "vitest run --config vitest.config.ts",
    "test:all": "pnpm run test && pnpm run test:e2e"
  }
}
```

---

## Summary

This Test Blueprint provides a comprehensive testing strategy for Nuxtless. Key takeaways:

1. **Prioritize Critical Paths:** Start with E2E tests for three main flows
2. **Test Business Logic:** Unit test stores and composables thoroughly
3. **Integration Over Isolation:** Focus on how components work together
4. **Address Known Issues:** Use tests to validate fixes for 34 documented issues
5. **Automate Everything:** Run tests in CI/CD on every commit
6. **Maintain Test Quality:** Keep tests updated, remove flaky tests, monitor coverage

**Coverage Goals:**
- Unit Tests: >80% for stores, composables, utilities
- Integration Tests: All critical component interactions
- E2E Tests: Three complete user flows + edge cases

**Estimated Timeline:** 6 weeks for complete implementation

**Ongoing Maintenance:** Review and update tests with every feature addition or bug fix

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Next Review:** After Phase 1 completion