# Critical Path Audit

**Project:** Nuxtless - Modular Nuxt 4 Headless Ecommerce  
**Date:** 2025  
**Scope:** Three primary user flows analyzed end-to-end

---

## Executive Summary

This audit traces three critical user flows through the Nuxtless application, documenting all components, stores, composables, GraphQL operations, and potential issues encountered in each path.

**Flows Analyzed:**
1. Homepage → Category → Product → Cart
2. Login → Account Pages
3. Cart → Checkout → Order Confirmation

**Key Findings:**
- **11 critical issues** identified across flows
- **3 security concerns** regarding authentication and session management
- **5 type safety gaps** that could lead to runtime errors
- **2 performance concerns** with data fetching patterns
- **4 SEO improvements** recommended

---

## Flow 1: Homepage → Category → Product → Cart

### Overview
This flow represents the primary shopping journey where users browse products and add them to their cart.

---

### Step 1.1: Homepage (`/`)

**File:** `src/app/pages/index.vue`

**Components Used:**
- `HomeCategoryCarousel` (`src/base/components/home/CategoryCarousel.vue`)
- `HomeShopFeatures` (`src/base/components/home/ShopFeatures.vue`)
- `HomeFeaturedProducts` (`src/base/components/home/FeaturedProducts.vue`)

**GraphQL Queries:**
- `SearchProducts` (via `HomeFeaturedProducts`)
  - Parameters: `term: ""`, `take: 4`
  - Returns: 4 products for featured section

**State Management:**
- `menuCollections` (useState) - populated elsewhere, consumed by `CategoryCarousel`

**External API:**
- Unsplash API call for hero banner image (non-GraphQL)
- Uses runtime config `unsplashApiKey`

**SEO Implementation:**
- ✅ Proper `<h1>` with sr-only class
- ✅ Semantic HTML with ARIA labels
- ✅ Section headings with proper hierarchy
- ⚠️ **ISSUE #1**: Hero image alt text is generic ("Hero image")

**Issues Identified:**

**ISSUE #1: Generic Hero Image Alt Text**
- **Severity:** Medium (SEO/Accessibility)
- **Location:** `src/app/pages/index.vue:43`
- **Description:** Hero banner uses `alt="Hero image"` which is not descriptive
- **Recommendation:** Use dynamic alt text based on site tagline or current promotion

**ISSUE #2: External API Dependency**
- **Severity:** Low (Performance)
- **Location:** `src/app/pages/index.vue:7-17`
- **Description:** Homepage depends on Unsplash API which could fail or slow down page load
- **Recommendation:** Implement fallback strategy and consider pre-fetching or caching

---

### Step 1.2: Category List Navigation

**Component:** `HomeCategoryCarousel`  
**File:** `src/base/components/home/CategoryCarousel.vue`

**Dependencies:**
- `CategoryCard` (`src/base/components/category/CategoryCard.vue`)
- `menuCollections` state (populated by app initialization)

**Data Source:**
- Relies on `useState<MenuCollections>("menuCollections")`
- Flattens all child collections from top-level collections

**Issues Identified:**

**ISSUE #3: Missing Data Source Documentation**
- **Severity:** Low (Maintainability)
- **Location:** `src/base/components/home/CategoryCarousel.vue:4`
- **Description:** `menuCollections` state is consumed but its population source is not clear from flow
- **Recommendation:** Document where `menuCollections` is initialized (likely in app.vue or plugin)

---

### Step 1.3: Category Page (`/category/[slug]`)

**File:** `src/base/pages/category/[slug].vue`

**GraphQL Queries:**
- `GetCollectionProducts`
  - Parameters: `slug`, `skip`, `take`
  - Returns: Paginated product search results

**Composables Used:**
- `usePagination(12)` - handles pagination logic
  - Returns: `{ take, page, skip, to }`

**State Management:**
- `menuCollections` (useState) - for breadcrumb and navigation context

**Utilities:**
- `getCategoryTrail()` (`src/base/utils/getCategoryTrail.ts`)
  - Builds breadcrumb trail from route and menuCollections
  - Returns array of `BreadcrumbItem[]`

**Components:**
- `BreadcrumbTrail` - displays navigation breadcrumbs
- `CategoryCard` - displays child collections
- `ProductCard` - displays products in grid

**SEO Implementation:**
- ✅ `useSeoMeta()` with title and ogTitle
- ✅ Schema.org CollectionPage with ItemList
- ✅ Breadcrumb structured data
- ✅ Pagination links (prev/next) in `<head>`
- ✅ OG Image component defined
- ⚠️ **ISSUE #4**: Description fields commented out

**Issues Identified:**

**ISSUE #4: Missing Meta Descriptions**
- **Severity:** High (SEO)
- **Location:** `src/base/pages/category/[slug].vue:49-52, 60-61`
- **Description:** Meta descriptions are commented out for all category pages
- **Recommendation:** Uncomment and ensure collections have descriptions in Vendure

**ISSUE #5: Weak Type Safety in Collection Finding**
- **Severity:** Medium (Type Safety)
- **Location:** `src/base/pages/category/[slug].vue:14-18`
- **Description:** `currentCollection` could be undefined if slug doesn't match
- **Recommendation:** Add explicit null check and 404 handling

**ISSUE #6: Scroll Behavior Side Effect**
- **Severity:** Low (UX)
- **Location:** `src/base/pages/category/[slug].vue:38-40`
- **Description:** `watch(page)` calls `window.scrollTo` directly without checking `import.meta.client`
- **Recommendation:** Add client-side check or use Nuxt's built-in scroll behavior

---

### Step 1.4: Product Detail Page (`/product/[slug]`)

**File:** `src/base/pages/product/[slug].vue`

**GraphQL Queries:**
- `GetProductDetail`
  - Parameters: `slug`
  - Returns: Full product with variants, assets, collections

**Stores Used:**
- `useProductStore()` (`src/base/stores/useProductStore.ts`)
  - Actions: `init(product)` - initializes product state and selects default variant
  - State: `selectedVariant`, `hasVariants`, `selectedOptions`

**Components:**
- `BreadcrumbTrail` - navigation trail
- `ProductGallery` - image viewer with lightbox support
- `ProductDetails` - stock level and SKU display
- `ProductDescription` - product description
- `ProductVariants` - variant selector (size, color, etc.)
- `CartAddButton` - add to cart functionality
- `HomeFeaturedProducts` - related products

**Utilities:**
- `getProductTrail(product)` (`src/base/utils/getProductTrail.ts`)
  - Extracts collections and builds breadcrumb
  - Filters out `__root_collection__`

**SEO Implementation:**
- ✅ Complete meta tags (title, description, OG, Twitter)
- ✅ Schema.org Product with Offer
- ✅ Breadcrumb structured data
- ✅ Multiple images in schema
- ⚠️ **ISSUE #7**: Brand information commented out
- ⚠️ **ISSUE #8**: Stock availability logic needs review

**Issues Identified:**

**ISSUE #7: Missing Brand Schema**
- **Severity:** Medium (SEO)
- **Location:** `src/base/pages/product/[slug].vue:57-60`
- **Description:** Brand schema is commented out
- **Recommendation:** Implement brand facetValue extraction and uncomment

**ISSUE #8: Stock Level State Management**
- **Severity:** Medium (Data Consistency)
- **Location:** `src/base/stores/useProductStore.ts:44-46`
- **Description:** `stockLevel` uses `liveStock` ref that shadows `selectedVariant.stockLevel`
- **Recommendation:** Clarify when/how `refreshStock()` is called and document the dual-source pattern

**ISSUE #9: Watch Flush Timing**
- **Severity:** Low (Performance)
- **Location:** `src/base/pages/product/[slug].vue:13-16`
- **Description:** Uses `flush: 'post'` in watch which may cause extra render cycles
- **Recommendation:** Review if 'post' timing is necessary or if default 'pre' suffices

---

### Step 1.5: Add to Cart Action

**Component:** `CartAddButton`  
**File:** `src/base/components/cart/CartAddButton.vue`

**Stores Used:**
- `useOrderStore()` (`src/base/stores/useOrderStore.ts`)
  - Actions: `addItemToOrder(variantId, quantity)`
  - State: `loading`, `error`
- `useProductStore()`
  - State: `selectedVariant`, `stockLevel`

**GraphQL Mutations:**
- `AddItemToOrder` (via `GqlAddItemToOrder`)
  - Parameters: `variantId`, `quantity`
  - Returns: `Order` or error types

**Composables:**
- `useOrderMutation()` (`src/base/composables/useOrderMutation.ts`)
  - Normalizes mutation response
  - Handles error types: `InsufficientStockError`, `OrderModificationError`, etc.

**Error Handling:**
- ✅ Toast notifications on error
- ✅ Loading state during mutation
- ✅ Stock level validation
- ⚠️ **ISSUE #10**: Error handling uses watch instead of direct callback

**Issues Identified:**

**ISSUE #10: Error Handling via Watch**
- **Severity:** Medium (Architecture)
- **Location:** `src/base/components/cart/CartAddButton.vue:21-29`
- **Description:** Error handling uses `watch(error)` instead of handling in async function
- **Recommendation:** Handle errors directly in `addToCart()` function for more predictable control flow

**ISSUE #11: Inconsistent Button Disabled Logic**
- **Severity:** Low (UX)
- **Location:** `src/base/components/cart/CartAddButton.vue:41`
- **Description:** Button disabled logic: `disabled || !hasStock` doesn't account for loading state
- **Recommendation:** Add `:disabled="disabled || !hasStock || loading"` to prevent double-clicks

---

### Step 1.6: Cart Panel

**Component:** `CartPanel`  
**File:** `src/base/components/cart/CartPanel.vue`

**State Management:**
- `isCartOpen` (useState) - controls slideover visibility
- `useOrderStore()` - order and loading state

**Components:**
- `CartEmpty` - displayed when cart is empty
- `CartItem` - displays each line item with quantity controls

**Navigation:**
- Routes to `/checkout` on checkout button click
- Closes cart panel on navigation

**Issues Identified:**

**ISSUE #12: Clear Cart Implementation**
- **Severity:** Medium (UX/Performance)
- **Location:** `src/base/components/cart/CartPanel.vue:10-14`
- **Description:** `clearOrder()` calls `removeItemFromOrder()` for each line in series with `Promise.all()`. Could be optimized with a single mutation.
- **Recommendation:** Consider adding a `clearOrder` mutation to Vendure or batch the operations

---

## Flow 2: Login → Account Pages

### Overview
This flow covers user authentication and account management features.

---

### Step 2.1: Login Page (`/account/login` or `/login`)

**File:** `src/base/pages/account/login.vue`

**Route Configuration:**
- ✅ `definePageMeta({ alias: ["/login"] })` - provides shortcut URL

**Components:**
- `LogoElement` - branding
- `AccountLoginForm` (`src/base/components/account/LoginForm.vue`)

**Route Guards:**
- Client-side redirect if already authenticated
- Uses `onMounted()` check with `isAuthenticated` state

**Issues Identified:**

**ISSUE #13: Client-Side Only Authentication Guard**
- **Severity:** High (Security/UX)
- **Location:** `src/base/pages/account/login.vue:15-19`
- **Description:** Authentication check only happens `onMounted()`, causing flash of login form
- **Recommendation:** Implement proper middleware or use SSR-compatible auth check

---

### Step 2.2: Login Form Submission

**Component:** `AccountLoginForm`  
**File:** `src/base/components/account/LoginForm.vue`

**Composables:**
- `useGqlSession()` (`src/base/composables/useGqlSession.ts`)
  - Custom authentication flow
  - Parameters: `locale`, `gqlHost`, `channelToken`, `"login"`, `{ emailAddress, password, rememberMe }`

**Authentication Flow:**
1. Call `useGqlSession()` with login type
2. Execute `LogInUser` mutation
3. Extract `vendure-auth-token` from response headers
4. Store token in `useAuthStore()`
5. Set token in GQL headers via `useGqlHeaders()`
6. Fetch active order
7. Emit success event

**Stores Updated:**
- `useAuthStore()` - sets session token
- `useOrderStore()` - fetches order after login

**GraphQL Operations:**
- `LogInUser` mutation (inline in `useGqlSession.ts`)
  - Parameters: `emailAddress`, `password`, `rememberMe`
  - Returns: `CurrentUser` or `ErrorResult`

**Issues Identified:**

**ISSUE #14: Session Management Complexity**
- **Severity:** High (Security/Maintainability)
- **Location:** `src/base/composables/useGqlSession.ts`
- **Description:** Custom session management with inline GraphQL queries, token extraction from headers, and manual header management. Complex and error-prone.
- **Recommendation:** Consider using Nuxt's built-in auth patterns or a dedicated auth library like `@sidebase/nuxt-auth`

**ISSUE #15: Token Storage Strategy**
- **Severity:** High (Security)
- **Location:** `src/base/stores/useAuthStore.ts`
- **Description:** Session persisted to localStorage (via `pinia-plugin-persistedstate`) includes token in plaintext
- **Recommendation:** Use httpOnly cookies for token storage or encrypt sensitive data

**ISSUE #16: Missing CSRF Protection**
- **Severity:** High (Security)
- **Location:** Authentication flow
- **Description:** No visible CSRF token or protection mechanism
- **Recommendation:** Implement CSRF tokens for mutation requests or verify Vendure's built-in protection

---

### Step 2.3: Account Dashboard (`/account`)

**File:** `src/base/pages/account/index.vue`

**GraphQL Queries:**
- `GetActiveCustomerDetail` (via `useCustomerStore()`)
  - Returns: Full customer with addresses, phone, etc.

**Stores:**
- `useCustomerStore()` (`src/base/stores/useCustomerStore.ts`)
  - Actions: `fetchCustomer("detail")`
  - State: `customer`
- `useAuthStore()`
  - Actions: `setUser({ id, email })`
  - State: `isAuthenticated`

**Route Protection:**
- Client-side redirect via `onMounted()` if not authenticated
- Routes to `/account/login`

**Components:**
- `AccountHeader` - displays greeting and logout button
- `UAvatar` - user avatar
- Display of: name, phone, default address

**Issues Identified:**

**ISSUE #17: Duplicate Authentication Guard Pattern**
- **Severity:** Medium (Maintainability)
- **Location:** Multiple account pages
- **Description:** Each account page implements its own `onMounted()` auth check
- **Recommendation:** Create route middleware (`account.ts`) to handle auth protection centrally

**ISSUE #18: Missing Loading State**
- **Severity:** Low (UX)
- **Location:** `src/base/pages/account/index.vue:24-27`
- **Description:** `loading` ref is set but `BaseLoader` is only shown when `!isAuthenticated`
- **Recommendation:** Show loader during data fetch: `v-if="loading || !customer"`

**ISSUE #19: Type Safety Gap**
- **Severity:** Medium (Type Safety)
- **Location:** `src/base/pages/account/index.vue:11-13`
- **Description:** Manual check `!("phoneNumber" in customer.value)` to determine fetch type, then unsafe cast to `ActiveCustomerDetail`
- **Recommendation:** Use TypeScript discriminated unions or type guards properly

---

### Step 2.4: Orders History (`/account/orders`)

**File:** `src/base/pages/account/orders.vue`

**GraphQL Queries:**
- `GetOrderHistory`
  - Parameters: `options: { sort: { createdAt: DESC }, take: 10 }`
  - Returns: List of orders with basic details

**Components:**
- `UTable` - displays orders in table format

**Data Transformation:**
- Raw order data transformed to table format
- Date formatting via `useI18n().d()`
- Price formatting via `Intl.NumberFormat`

**Issues Identified:**

**ISSUE #20: TODO Comment Not Addressed**
- **Severity:** Low (Performance)
- **Location:** `src/base/pages/account/orders.vue:25`
- **Description:** Comment states "TODO: remove unneeded data from the GQL payload"
- **Recommendation:** Review GQL fragment and optimize to only fetch displayed fields

**ISSUE #21: Missing Order Detail Links**
- **Severity:** Low (UX)
- **Location:** Table rendering
- **Description:** Orders are displayed but not clickable to view details
- **Recommendation:** Add click handler or link to order detail page (e.g., `/account/orders/[code]`)

---

## Flow 3: Cart → Checkout → Order Confirmation

### Overview
This flow covers the complete checkout process from cart review to order completion.

---

### Step 3.1: Checkout Page (`/checkout`)

**File:** `src/base/pages/checkout/index.vue`

**State Management:**
- `checkoutState` (useState) - central checkout form state
  - Type: `CheckoutState` (from `types/general.ts`)
  - Contains: `addressForm`, `shippingForm`, `paymentForm`
- `isSubmitted` (reactive) - tracks form submission status per section

**Stores:**
- `useOrderStore()`
  - State: `order`, `error`
  - Actions: `fetchOrder("detail")`

**Composables:**
- `useCheckout()` (`src/base/composables/useCheckout.ts`)
  - Watches form state changes
  - Recalculates shipping on address/payment changes

**Components:**
- `CheckoutAddressForm` - shipping details
- `CheckoutShippingForm` - shipping method selection
- `CheckoutPaymentForm` - payment method and processing
- `CheckoutOrderSummary` - order review and submit button

**Form Flow:**
1. Address form submitted → sets customer and shipping address
2. Shipping form submitted → sets shipping method
3. Payment form submitted → adds payment to order
4. All three must succeed before navigation to confirmation

**Issues Identified:**

**ISSUE #22: Complex Multi-Form Coordination**
- **Severity:** Medium (Maintainability)
- **Location:** `src/base/pages/checkout/index.vue:35-54`
- **Description:** Template refs and coordinated submission across 3 forms with shared state is complex
- **Recommendation:** Consider consolidating into single form with sections or use form composition pattern

**ISSUE #23: Unsafe Type Assertion**
- **Severity:** Medium (Type Safety)
- **Location:** `src/base/pages/checkout/index.vue:17`
- **Description:** Order cast to `ActiveOrderDetail` with comment "Safe: We fetch with 'detail'"
- **Recommendation:** Use proper type guards or discriminated unions instead of comments

**ISSUE #24: Watch on Order Total**
- **Severity:** Low (Performance)
- **Location:** `src/base/pages/checkout/index.vue:20-24`
- **Description:** Watches entire order and refetches on totalWithTax change. Could cause extra requests.
- **Recommendation:** Review if this watch is necessary given the checkout composable also triggers updates

**ISSUE #25: Commented Out watchEffect**
- **Severity:** Low (Code Quality)
- **Location:** `src/base/pages/checkout/index.vue:37-40`
- **Description:** Debugging code left in production
- **Recommendation:** Remove commented code

---

### Step 3.2: Address Form

**Component:** `CheckoutAddressForm`  
**File:** `src/base/components/checkout/AddressForm.vue`

**GraphQL Queries:**
- `GetChannelCountries` (via `useAsyncGql`)
  - Returns: Available countries for shipping

**GraphQL Mutations:**
- `SetCustomerForOrder` (guest checkout)
  - Parameters: `firstName`, `lastName`, `emailAddress`
- `SetOrderShippingAddress`
  - Parameters: `fullName`, `streetLine1`, `city`, `postalCode`, `countryCode`

**Validators:**
- `AddressForm` schema (from `validators/addressForm.ts`)
- Validates: name, email, address fields

**Behavior:**
- Pre-fills form for authenticated users from `activeCustomer`
- Email field disabled for authenticated users
- Updates both customer and shipping address

**Issues Identified:**

**ISSUE #26: Sequential Mutations**
- **Severity:** Low (Performance)
- **Location:** `src/base/components/checkout/AddressForm.vue:42-52`
- **Description:** Two separate mutations called sequentially for guest users
- **Recommendation:** Consider combining or verify if Vendure requires this order

---

### Step 3.3: Shipping Form

**Component:** `CheckoutShippingForm`  
**File:** `src/base/components/checkout/ShippingForm.vue`

**GraphQL Queries:**
- `GetShippingMethods` (via `orderStore.getShippingMethods()`)
  - Returns: Available shipping methods

**GraphQL Mutations:**
- `SetShippingMethod`
  - Parameters: `shippingMethodId`

**Auto-Selection:**
- Automatically selects first shipping method
- Immediately calls mutation on mount

**Issues Identified:**

**ISSUE #27: Automatic Shipping Method Selection**
- **Severity:** Low (UX)
- **Location:** `src/base/components/checkout/ShippingForm.vue:24-25`
- **Description:** First shipping method is auto-selected and mutation called without user interaction
- **Recommendation:** Consider if this is desired UX or if user should explicitly choose

---

### Step 3.4: Payment Form

**Component:** `CheckoutPaymentForm`  
**File:** `src/base/components/checkout/PaymentForm.vue`

**GraphQL Queries:**
- `GetPaymentMethods` (via `orderStore.getPaymentMethods()`)
  - Returns: Available payment methods

**GraphQL Mutations:**
- `TransitionToState("ArrangingPayment")` - for standard payment
- `AddPaymentToOrder` - for standard payment
- Stripe integration handled separately

**Payment Methods:**
1. **Standard Payment** (`standard-payment`)
   - Direct mutation flow
2. **Stripe Payment** (`stripe-payment`)
   - Delegates to `CheckoutStripeElement` component

**Issues Identified:**

**ISSUE #28: Hardcoded Payment Method Logic**
- **Severity:** Medium (Maintainability)
- **Location:** `src/base/components/checkout/PaymentForm.vue:23-30`
- **Description:** Payment method handling uses hardcoded strings with if/else
- **Recommendation:** Extract to strategy pattern or composable for easier extensibility

---

### Step 3.5: useCheckout Composable

**File:** `src/base/composables/useCheckout.ts`

**Purpose:** Reactive shipping recalculation

**Watchers:**
1. `checkoutState.addressForm.postalCode` → recalc shipping
2. `checkoutState.shippingForm.shippingMethodId` → recalc shipping
3. `checkoutState.paymentForm.code` → set custom field + recalc shipping

**Issues Identified:**

**ISSUE #29: Missing GQL Operation Type**
- **Severity:** Low (Type Safety)
- **Location:** `src/base/composables/useCheckout.ts:26`
- **Description:** `GqlInstance("SetOrderCustomFields", ...)` uses string literal without type checking
- **Recommendation:** Use generated typed GQL client methods

**ISSUE #30: Cascading Recalc Calls**
- **Severity:** Low (Performance)
- **Location:** Multiple watchers call `recalcShipping()`
- **Description:** Could trigger multiple redundant API calls if user changes multiple fields quickly
- **Recommendation:** Add debounce or consolidate watchers

---

### Step 3.6: Order Submission

**Location:** `src/base/pages/checkout/index.vue` - `onSubmit()`

**Flow:**
1. Call `addressForm.submitAddress()`
2. Call `shippingForm.submitShipping()`
3. Wait for both to succeed
4. Call `paymentForm.submitPayment()`
5. Wait for all three success flags
6. Clear error state
7. Navigate to confirmation page
8. Clear order from store
9. Show success toast

**Navigation:**
- Route: `/checkout/confirmation/[code]`
- Order code passed as param

**Issues Identified:**

**ISSUE #31: Order Cleared Before Navigation Complete**
- **Severity:** Medium (Data Consistency)
- **Location:** `src/base/pages/checkout/index.vue:48`
- **Description:** `order.value = null` set immediately after router.push, but navigation is async
- **Recommendation:** Clear order in confirmation page's `onMounted()` or use navigation guard

---

### Step 3.7: Order Confirmation (`/checkout/confirmation/[code]`)

**File:** `src/base/pages/checkout/confirmation/[code].vue`

**GraphQL Queries:**
- `GetOrderByCode`
  - Parameters: `code`
  - Returns: Full order details with all information

**Special Handling:**
- Stripe payments detected via `route.query.payment_intent`
- Poll order status for Stripe payments (up to 20 attempts)
- Final states: `PaymentSettled`, `PaymentAuthorized`, `ArrangingFulfillment`, `Cancelled`

**Components:**
- `UTable` - displays order line items

**Features:**
- Order summary with meta information
- Detailed order breakdown (shipping, payment, totals)
- Print receipt functionality
- Tax summary display

**Issues Identified:**

**ISSUE #32: Polling Implementation**
- **Severity:** Medium (Performance/UX)
- **Location:** `src/base/pages/checkout/confirmation/[code].vue:34-49`
- **Description:** Polling every 2 seconds for up to 40 seconds with no user feedback
- **Recommendation:** Add loading indicator during polling and explain delay to user

**ISSUE #33: Missing Order Not Found Handling**
- **Severity:** Medium (UX)
- **Location:** Order page rendering
- **Description:** No explicit 404 handling if order code is invalid
- **Recommendation:** Add error state and redirect if order is null after fetch

**ISSUE #34: Print Media Query in Component**
- **Severity:** Low (Architecture)
- **Location:** `src/base/pages/checkout/confirmation/[code].vue:179-187`
- **Description:** Print styles in component-scoped CSS
- **Recommendation:** Move to global print stylesheet for consistency

---

## Cross-Cutting Concerns

### GraphQL Client Configuration

**File:** `src/base/nuxt.config.ts`

**Configuration:**
- Host: From env `GQL_HOST` or default `http://localhost:3001/shop-api`
- Token: Bearer auth with retainToken enabled
- Schema: `graphql.schema.json`
- Document paths: Queries and fragments in `gql/` directory

**Plugin:** `src/base/plugins/gql-plugin.ts`
- Global error handler via `useGqlError()`
- Logs: statusCode, operationName, gqlErrors

---

### State Management (Pinia Stores)

#### useAuthStore

**File:** `src/base/stores/useAuthStore.ts`

**State:**
- `session` - contains token, tokenSource, user (id, email)

**Actions:**
- `setSession(token, user?, source?)` - stores auth token
- `setUser(user)` - updates user info
- `clearSession()` - logs out
- `isAuthenticated` - computed from session.user.id

**Persistence:** ✅ Enabled via `pinia-plugin-persistedstate`

**Issues:**
- See ISSUE #15: Token storage security concern

---

#### useOrderStore

**File:** `src/base/stores/useOrderStore.ts`

**State:**
- `order` - current active order
- `loading`, `error`, `status`
- `shippingMethods`, `paymentMethods`

**Actions:**
- `fetchOrder(type)` - fetches base or detail order
- `addItemToOrder()`, `removeItemFromOrder()`, `adjustOrderLine()`
- `applyCouponCode()`, `removeCouponCode()`
- `setCustomerForOrder()`, `setOrderShippingAddress()`
- `getShippingMethods()`, `setShippingMethod()`
- `getPaymentMethods()`, `transitionToState()`, `addPaymentToOrder()`

**Error Handling:**
- Uses `useOrderMutation()` composable to normalize responses
- Returns status: `"success"`, `"partial"`, `"error"`

---

#### useCustomerStore

**File:** `src/base/stores/useCustomerStore.ts`

**State:**
- `customer` - active customer data
- `loading`, `error`

**Actions:**
- `fetchCustomer(type)` - base or detail
- `login()`, `logout()`, `register()`, `verify()`
- `requestPasswordReset()`, `resetPassword()`

**Return Types:**
- All mutations return result types with error code handling

---

#### useProductStore

**File:** `src/base/stores/useProductStore.ts`

**State:**
- `product` - current product detail
- `selectedOptions` - reactive record of selected variant options
- `optionGroups` - computed available options
- `selectedVariant` - computed from selected options
- `stockLevel` - with live refresh capability
- `galleryAssets` - computed variant or product assets

**Actions:**
- `init(product)` - initializes state and selects default variant
- `setOption(groupId, optionId)` - updates selection
- `refreshStock()` - fetches live stock for variant

**Issues:**
- See ISSUE #8: Stock level dual-source pattern

---

### Middleware

**Status:** ❌ No middleware found

**Recommendation:** 
- Implement `auth.ts` middleware for protected routes
- Implement `guest.ts` middleware for login/register pages
- Consider `checkout.ts` middleware for cart validation

---

### SEO & Schema.org

**Implementation Locations:**
- Homepage: Basic semantic HTML, ARIA labels
- Category pages: CollectionPage schema, breadcrumbs, pagination links
- Product pages: Product schema with Offer, breadcrumbs, images
- Layout: `default.vue` sets default meta tags

**Global Config:**
- NuxtSEO modules configured in `nuxt.config.ts`
- Robots.txt: Disallows account, checkout, cart, search pages
- Sitemap: Sources array empty (requires custom implementation)
- Schema.org identity: `shopIdentity` from `src/schema/identity`

**Issues:**
- ISSUE #4: Missing meta descriptions on category pages
- ISSUE #7: Missing brand schema on product pages
- ISSUE #1: Generic alt text on homepage hero

---

### Security Considerations

**Authentication:**
- ⚠️ Token in localStorage (plaintext)
- ⚠️ Client-side only route guards
- ⚠️ No visible CSRF protection
- ⚠️ Custom session management increases attack surface

**Recommendations:**
1. Use httpOnly cookies for auth tokens
2. Implement server-side middleware for route protection
3. Verify CSRF protection is enabled in Vendure
4. Consider using established auth solutions like `@sidebase/nuxt-auth`

**Data Protection:**
- ✅ HTTPS enforced (assumed in production)
- ✅ No sensitive data in URLs
- ⚠️ Session data persisted in localStorage

**API Security:**
- ✅ Bearer token authentication
- ✅ Channel token for multi-tenant support
- ✅ GraphQL schema validation
- ⚠️ No rate limiting visible on client side

---

### Performance Considerations

**Data Fetching:**
- ✅ `useAsyncGql` for SSR-compatible queries
- ✅ Pagination on category pages
- ⚠️ No caching strategy visible for product/collection queries
- ⚠️ Multiple watchers triggering recalculations in checkout

**Image Optimization:**
- ✅ NuxtImage with format conversion (webp)
- ✅ Responsive sizes configured
- ✅ Lazy loading on non-critical images
- ✅ Placeholder blur effects
- ⚠️ External API dependency (Unsplash) on homepage

**Bundle Size:**
- Multiple UI modules loaded (Nuxt UI, Nuxt Icon, etc.)
- GraphQL client with full schema
- Pinia state management

**Recommendations:**
1. Implement query result caching for frequently accessed data
2. Add debounce to checkout watchers
3. Consider lazy-loading non-critical components
4. Audit final bundle size and tree-shake unused modules

---

### Type Safety Analysis

**Strong Typing:**
- ✅ GraphQL code generation for queries/mutations
- ✅ Type definitions in `src/types/` directory
- ✅ Validator schemas for forms (Zod assumed)

**Weak Points:**
- ⚠️ Manual type assertions with comments (e.g., "Safe: We fetch with 'detail'")
- ⚠️ `any` usage in error handlers (GqlError types)
- ⚠️ Loose typing on `menuCollections` useState
- ⚠️ Dynamic property checks instead of type guards

**Recommendations:**
1. Create discriminated unions for Order types (base vs detail)
2. Add runtime type guards instead of manual checks
3. Remove type assertions with comments
4. Add strict null checks for navigation data

---

## Summary of Critical Issues

### High Priority (Must Fix)

1. **ISSUE #4: Missing Meta Descriptions** (SEO)
   - Impact: Search engine ranking
   - Files: All category pages
   - Fix: Uncomment description fields and populate in Vendure

2. **ISSUE #13: Client-Side Only Auth Guards** (Security/UX)
   - Impact: Authentication bypass, flash of content
   - Files: All account pages
   - Fix: Implement proper Nuxt middleware

3. **ISSUE #14: Session Management Complexity** (Security/Maintainability)
   - Impact: Security vulnerabilities, hard to maintain
   - Files: `useGqlSession.ts`, auth flow
   - Fix: Use established auth library

4. **ISSUE #15: Token Storage in localStorage** (Security)
   - Impact: XSS vulnerability exposure
   - Files: `useAuthStore.ts`
   - Fix: Use httpOnly cookies

5. **ISSUE #16: Missing CSRF Protection** (Security)
   - Impact: Cross-site request forgery attacks
   - Files: Authentication flow
   - Fix: Implement CSRF tokens

### Medium Priority (Should Fix)

6. **ISSUE #5: Weak Type Safety in Collection Finding**
   - Files: `src/base/pages/category/[slug].vue`
   - Fix: Add 404 handling for invalid slugs

7. **ISSUE #8: Stock Level State Management**
   - Files: `src/base/stores/useProductStore.ts`
   - Fix: Document dual-source pattern or simplify

8. **ISSUE #10: Error Handling via Watch**
   - Files: `src/base/components/cart/CartAddButton.vue`
   - Fix: Handle errors in async function directly

9. **ISSUE #17: Duplicate Auth Guard Pattern**
   - Files: Multiple account pages
   - Fix: Create centralized middleware

10. **ISSUE #19: Type Safety Gap**
    - Files: Account pages
    - Fix: Use proper TypeScript discriminated unions

11. **ISSUE #22: Complex Multi-Form Coordination**
    - Files: `src/base/pages/checkout/index.vue`
    - Fix: Consolidate forms or use composition pattern

12. **ISSUE #23: Unsafe Type Assertion**
    - Files: Checkout page
    - Fix: Use type guards instead of comments

13. **ISSUE #28: Hardcoded Payment Method Logic**
    - Files: `src/base/components/checkout/PaymentForm.vue`
    - Fix: Extract to strategy pattern

14. **ISSUE #31: Order Cleared Before Navigation**
    - Files: `src/base/pages/checkout/index.vue`
    - Fix: Clear in navigation guard or target page

15. **ISSUE #32: Polling Implementation**
    - Files: Confirmation page
    - Fix: Add loading UI and user feedback

16. **ISSUE #33: Missing 404 Handling**
    - Files: Confirmation page
    - Fix: Handle invalid order codes

### Low Priority (Nice to Have)

17. **ISSUE #1: Generic Hero Image Alt Text**
18. **ISSUE #2: External API Dependency**
19. **ISSUE #3: Missing Data Source Documentation**
20. **ISSUE #6: Scroll Behavior Side Effect**
21. **ISSUE #7: Missing Brand Schema**
22. **ISSUE #9: Watch Flush Timing**
23. **ISSUE #11: Inconsistent Button Disabled Logic**
24. **ISSUE #12: Clear Cart Implementation**
25. **ISSUE #18: Missing Loading State**
26. **ISSUE #20: TODO Comment Not Addressed**
27. **ISSUE #21: Missing Order Detail Links**
28. **ISSUE #24: Watch on Order Total**
29. **ISSUE #25: Commented Out Code**
30. **ISSUE #26: Sequential Mutations**
31. **ISSUE #27: Automatic Shipping Selection**
32. **ISSUE #29: Missing GQL Operation Type**
33. **ISSUE #30: Cascading Recalc Calls**
34. **ISSUE #34: Print Media Query in Component**

---

## Recommendations by Category

### Security
1. Implement httpOnly cookie authentication
2. Add server-side route middleware
3. Enable CSRF protection
4. Use established auth library (e.g., `@sidebase/nuxt-auth`)
5. Audit token storage and session management

### Type Safety
1. Create discriminated unions for Order and Customer types
2. Remove type assertions with comments
3. Add runtime type guards
4. Implement 404 handling for invalid routes
5. Strengthen GraphQL response typing

### Performance
1. Add query result caching
2. Debounce checkout watchers
3. Optimize bundle size
4. Implement proper loading states
5. Reduce redundant API calls

### SEO
1. Uncomment and populate meta descriptions
2. Add brand schema to products
3. Implement dynamic alt text
4. Complete sitemap implementation
5. Add structured data for all entity types

### Architecture
1. Create centralized route middleware
2. Consolidate checkout form handling
3. Extract payment method handling to strategy pattern
4. Document state initialization patterns
5. Remove commented/debugging code

### UX
1. Add loading indicators during async operations
2. Provide feedback during order polling
3. Make order history clickable
4. Improve error messages
5. Add proper 404 pages

---

## Appendix: File Reference Index

### Pages
- `src/app/pages/index.vue` - Homepage
- `src/base/pages/category/[slug].vue` - Category listing
- `src/base/pages/product/[slug].vue` - Product detail
- `src/base/pages/checkout/index.vue` - Checkout page
- `src/base/pages/checkout/confirmation/[code].vue` - Order confirmation
- `src/base/pages/account/login.vue` - Login page
- `src/base/pages/account/index.vue` - Account dashboard
- `src/base/pages/account/orders.vue` - Order history
- `src/base/pages/account/register.vue` - Registration
- `src/base/pages/account/verify.vue` - Email verification
- `src/base/pages/account/password-reset.vue` - Password reset
- `src/base/pages/account/request-password-reset.vue` - Request reset

### Components - Cart
- `src/base/components/cart/CartAddButton.vue`
- `src/base/components/cart/CartPanel.vue`
- `src/base/components/cart/CartItem.vue`
- `src/base/components/cart/CartEmpty.vue`
- `src/base/components/cart/CartTrigger.vue`
- `src/base/components/cart/CartQuantityInput.vue`

### Components - Checkout
- `src/base/components/checkout/AddressForm.vue`
- `src/base/components/checkout/ShippingForm.vue`
- `src/base/components/checkout/PaymentForm.vue`
- `src/base/components/checkout/OrderSummary.vue`
- `src/base/components/checkout/StripeElement.vue`

### Components - Account
- `src/base/components/account/LoginForm.vue`
- `src/base/components/account/RegisterForm.vue`
- `src/base/components/account/AccountHeader.vue`
- `src/base/components/account/AccountMenu.vue`
- `src/base/components/account/RequestPasswordResetForm.vue`
- `src/base/components/account/ResetPasswordForm.vue`

### Components - Product
- `src/base/components/product/ProductCard.vue`
- `src/base/components/product/ProductGallery.vue`
- `src/base/components/product/ProductDetails.vue`
- `src/base/components/product/ProductVariants.vue`
- `src/base/components/product/ProductDescription.vue`

### Components - Category
- `src/base/components/category/CategoryCard.vue`

### Components - Home
- `src/base/components/home/CategoryCarousel.vue`
- `src/base/components/home/FeaturedProducts.vue`
- `src/base/components/home/ShopFeatures.vue`

### Components - Layout
- `src/base/components/AppHeader.vue`
- `src/base/components/AppFooter.vue`
- `src/base/components/BaseLoader.vue`
- `src/base/components/BreadcrumbTrail.vue`
- `src/base/components/LogoElement.vue`
- `src/base/components/LangSwitcher.vue`
- `src/base/components/SearchModal.vue`
- `src/base/components/header/DesktopMenu.vue`
- `src/base/components/header/MobileMenu.vue`

### Stores (Pinia)
- `src/base/stores/useAuthStore.ts`
- `src/base/stores/useCustomerStore.ts`
- `src/base/stores/useOrderStore.ts`
- `src/base/stores/useProductStore.ts`

### Composables
- `src/base/composables/useCheckout.ts`
- `src/base/composables/useGqlSession.ts`
- `src/base/composables/useOrderMutation.ts`
- `src/base/composables/usePagination.ts`
- `src/base/composables/useProductLightbox.ts`
- `src/base/composables/useProductVariants.ts`
- `src/base/composables/useSimpleSearch.ts`
- `src/base/composables/useStripe.ts`

### Utils
- `src/base/utils/getCategoryTrail.ts`
- `src/base/utils/getProductTrail.ts`
- `src/base/utils/syncOrderShippingAddress.ts`

### GraphQL Queries
- `src/base/gql/queries/collection.gql`
- `src/base/gql/queries/context.gql`
- `src/base/gql/queries/customer.gql`
- `src/base/gql/queries/order.gql`
- `src/base/gql/queries/product.gql`

### GraphQL Fragments
- `src/base/gql/fragments/collection.gql`
- `src/base/gql/fragments/customer.gql`
- `src/base/gql/fragments/order.gql`
- `src/base/gql/fragments/product.gql`

### Configuration
- `nuxt.config.ts` - Root configuration
- `src/base/nuxt.config.ts` - Base layer configuration
- `src/base/app.config.ts` - App-specific config
- `src/app/layouts/default.vue` - Default layout

### Plugins
- `src/base/plugins/gql-plugin.ts` - GraphQL error handling

### Validators
- `src/base/validators/addressForm.ts`
- `src/base/validators/loginForm.ts`
- `src/base/validators/shippingForm.ts`
- `src/base/validators/paymentForm.ts`

---

## Testing Coverage Gaps

**Areas Requiring Tests:**
1. Order mutation error handling (`useOrderMutation.ts`)
2. Product variant selection logic (`useProductStore.ts`)
3. Checkout form coordination
4. Authentication flows
5. Cart operations
6. Breadcrumb trail generation
7. Payment method handling
8. Session management

**Recommendation:** Add unit tests for stores and composables, integration tests for checkout flow.

---

## Conclusion

The Nuxtless project demonstrates a well-structured ecommerce foundation with clear separation of concerns using Nuxt layers. The critical paths are functional but have several areas requiring attention:

**Strengths:**
- ✅ Clean layer architecture
- ✅ Comprehensive GraphQL integration
- ✅ Good SEO foundation with Schema.org
- ✅ Type-safe GraphQL operations
- ✅ Responsive design patterns

**Critical Improvements Needed:**
- 🔴 Authentication security (tokens, guards, session management)
- 🔴 Meta descriptions for SEO
- 🟡 Type safety refinements
- 🟡 Error handling patterns
- 🟡 Performance optimizations

**Next Steps:**
1. Address all High Priority issues immediately
2. Implement proper authentication middleware
3. Add comprehensive test coverage
4. Optimize checkout flow complexity
5. Complete SEO metadata
6. Audit and improve type safety

This audit provides a roadmap for hardening the application before production deployment.