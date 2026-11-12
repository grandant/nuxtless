import { graphql } from "#layers/nuxtless/gql/graphql";

export const GetActiveOrder = graphql(`
  query GetActiveOrder {
    activeOrder {
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
`);

export const GetActiveOrderDetail = graphql(`
  query GetActiveOrderDetail {
    activeOrder {
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
  }
`);

export const GetShippingMethods = graphql(`
  query GetShippingMethods {
    eligibleShippingMethods {
      id
      name
      price
      description
    }
  }
`);

export const GetPaymentMethods = graphql(`
  query GetPaymentMethods {
    eligiblePaymentMethods {
      id
      name
      code
      isEligible
    }
  }
`);

export const GetOrderByCode = graphql(`
  query GetOrderByCode($code: String!) {
    orderByCode(code: $code) {
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
  }
`);

export const GetOrderHistory = graphql(`
  query GetOrderHistory($options: OrderListOptions) {
    activeCustomer {
      orders(options: $options) {
        totalItems
        items {
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
          orderPlacedAt
        }
      }
    }
  }
`);
