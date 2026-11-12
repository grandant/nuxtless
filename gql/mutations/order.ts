import { graphql } from "#layers/nuxtless/gql/graphql";

export const AddItemToOrder = graphql(`
  mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
      ... on InsufficientStockError {
        quantityAvailable
        order {
          id
          code
          couponCodes
          state
          totalQuantity
          totalWithTax
          currencyCode
          lines {
            id
            unitPriceWithTax
            quantity
            linePriceWithTax
            productVariant {
              id
              name
            }
            featuredAsset {
              id
              preview
            }
          }
        }
      }
    }
  }
`);

export const RemoveItemFromOrder = graphql(`
  mutation RemoveItemFromOrder($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const AdjustOrderLine = graphql(`
  mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const ApplyCouponCode = graphql(`
  mutation ApplyCouponCode($couponCode: String!) {
    applyCouponCode(couponCode: $couponCode) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const RemoveCouponCode = graphql(`
  mutation RemoveCouponCode($couponCode: String!) {
    removeCouponCode(couponCode: $couponCode) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        totalQuantity
        totalWithTax
        currencyCode
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
      }
    }
  }
`);

export const SetCustomerForOrder = graphql(`
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const SetOrderShippingAddress = graphql(`
  mutation SetOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const SetShippingMethod = graphql(`
  mutation SetShippingMethod($id: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $id) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const TransitionToState = graphql(`
  mutation TransitionToState($state: String!) {
    transitionOrderToState(state: $state) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
        fromState
        toState
      }
    }
  }
`);

export const AddPaymentToOrder = graphql(`
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const SetOrderCustomFields = graphql(`
  mutation SetOrderCustomFields($input: UpdateOrderInput!) {
    setOrderCustomFields(input: $input) {
      __typename
      ... on Order {
        id
        code
        couponCodes
        state
        currencyCode
        totalQuantity
        subTotal
        shippingWithTax
        totalWithTax
        orderPlacedAt
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          city
          postalCode
          country
        }
        discounts {
          description
          amountWithTax
        }
        lines {
          id
          unitPriceWithTax
          quantity
          linePriceWithTax
          productVariant {
            id
            name
            sku
          }
          featuredAsset {
            id
            preview
          }
        }
        payments {
          method
        }
        shippingLines {
          shippingMethod {
            name
          }
        }
        taxSummary {
          description
          taxTotal
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);
