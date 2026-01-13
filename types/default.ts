import type { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Money: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum AdjustmentType {
  DISTRIBUTED_ORDER_PROMOTION = 'DISTRIBUTED_ORDER_PROMOTION',
  OTHER = 'OTHER',
  PROMOTION = 'PROMOTION'
}

export enum AssetType {
  BINARY = 'BINARY',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type AuthenticationInput = {
  native?: InputMaybe<NativeAuthInput>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean']['input'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollectionFilterParameter = {
  _and?: InputMaybe<Array<CollectionFilterParameter>>;
  _or?: InputMaybe<Array<CollectionFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<IdOperators>;
  position?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
  topLevelOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollectionSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ConfigArgInput = {
  name: Scalars['String']['input'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String']['input'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String']['input'];
};

/**
 * Input used to create an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode: Scalars['String']['input'];
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerInput = {
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  AED = 'AED',
  /** Afghan afghani */
  AFN = 'AFN',
  /** Albanian lek */
  ALL = 'ALL',
  /** Armenian dram */
  AMD = 'AMD',
  /** Netherlands Antillean guilder */
  ANG = 'ANG',
  /** Angolan kwanza */
  AOA = 'AOA',
  /** Argentine peso */
  ARS = 'ARS',
  /** Australian dollar */
  AUD = 'AUD',
  /** Aruban florin */
  AWG = 'AWG',
  /** Azerbaijani manat */
  AZN = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  BAM = 'BAM',
  /** Barbados dollar */
  BBD = 'BBD',
  /** Bangladeshi taka */
  BDT = 'BDT',
  /** Bulgarian lev */
  BGN = 'BGN',
  /** Bahraini dinar */
  BHD = 'BHD',
  /** Burundian franc */
  BIF = 'BIF',
  /** Bermudian dollar */
  BMD = 'BMD',
  /** Brunei dollar */
  BND = 'BND',
  /** Boliviano */
  BOB = 'BOB',
  /** Brazilian real */
  BRL = 'BRL',
  /** Bahamian dollar */
  BSD = 'BSD',
  /** Bhutanese ngultrum */
  BTN = 'BTN',
  /** Botswana pula */
  BWP = 'BWP',
  /** Belarusian ruble */
  BYN = 'BYN',
  /** Belize dollar */
  BZD = 'BZD',
  /** Canadian dollar */
  CAD = 'CAD',
  /** Congolese franc */
  CDF = 'CDF',
  /** Swiss franc */
  CHF = 'CHF',
  /** Chilean peso */
  CLP = 'CLP',
  /** Renminbi (Chinese) yuan */
  CNY = 'CNY',
  /** Colombian peso */
  COP = 'COP',
  /** Costa Rican colon */
  CRC = 'CRC',
  /** Cuban convertible peso */
  CUC = 'CUC',
  /** Cuban peso */
  CUP = 'CUP',
  /** Cape Verde escudo */
  CVE = 'CVE',
  /** Czech koruna */
  CZK = 'CZK',
  /** Djiboutian franc */
  DJF = 'DJF',
  /** Danish krone */
  DKK = 'DKK',
  /** Dominican peso */
  DOP = 'DOP',
  /** Algerian dinar */
  DZD = 'DZD',
  /** Egyptian pound */
  EGP = 'EGP',
  /** Eritrean nakfa */
  ERN = 'ERN',
  /** Ethiopian birr */
  ETB = 'ETB',
  /** Euro */
  EUR = 'EUR',
  /** Fiji dollar */
  FJD = 'FJD',
  /** Falkland Islands pound */
  FKP = 'FKP',
  /** Pound sterling */
  GBP = 'GBP',
  /** Georgian lari */
  GEL = 'GEL',
  /** Ghanaian cedi */
  GHS = 'GHS',
  /** Gibraltar pound */
  GIP = 'GIP',
  /** Gambian dalasi */
  GMD = 'GMD',
  /** Guinean franc */
  GNF = 'GNF',
  /** Guatemalan quetzal */
  GTQ = 'GTQ',
  /** Guyanese dollar */
  GYD = 'GYD',
  /** Hong Kong dollar */
  HKD = 'HKD',
  /** Honduran lempira */
  HNL = 'HNL',
  /** Croatian kuna */
  HRK = 'HRK',
  /** Haitian gourde */
  HTG = 'HTG',
  /** Hungarian forint */
  HUF = 'HUF',
  /** Indonesian rupiah */
  IDR = 'IDR',
  /** Israeli new shekel */
  ILS = 'ILS',
  /** Indian rupee */
  INR = 'INR',
  /** Iraqi dinar */
  IQD = 'IQD',
  /** Iranian rial */
  IRR = 'IRR',
  /** Icelandic króna */
  ISK = 'ISK',
  /** Jamaican dollar */
  JMD = 'JMD',
  /** Jordanian dinar */
  JOD = 'JOD',
  /** Japanese yen */
  JPY = 'JPY',
  /** Kenyan shilling */
  KES = 'KES',
  /** Kyrgyzstani som */
  KGS = 'KGS',
  /** Cambodian riel */
  KHR = 'KHR',
  /** Comoro franc */
  KMF = 'KMF',
  /** North Korean won */
  KPW = 'KPW',
  /** South Korean won */
  KRW = 'KRW',
  /** Kuwaiti dinar */
  KWD = 'KWD',
  /** Cayman Islands dollar */
  KYD = 'KYD',
  /** Kazakhstani tenge */
  KZT = 'KZT',
  /** Lao kip */
  LAK = 'LAK',
  /** Lebanese pound */
  LBP = 'LBP',
  /** Sri Lankan rupee */
  LKR = 'LKR',
  /** Liberian dollar */
  LRD = 'LRD',
  /** Lesotho loti */
  LSL = 'LSL',
  /** Libyan dinar */
  LYD = 'LYD',
  /** Moroccan dirham */
  MAD = 'MAD',
  /** Moldovan leu */
  MDL = 'MDL',
  /** Malagasy ariary */
  MGA = 'MGA',
  /** Macedonian denar */
  MKD = 'MKD',
  /** Myanmar kyat */
  MMK = 'MMK',
  /** Mongolian tögrög */
  MNT = 'MNT',
  /** Macanese pataca */
  MOP = 'MOP',
  /** Mauritanian ouguiya */
  MRU = 'MRU',
  /** Mauritian rupee */
  MUR = 'MUR',
  /** Maldivian rufiyaa */
  MVR = 'MVR',
  /** Malawian kwacha */
  MWK = 'MWK',
  /** Mexican peso */
  MXN = 'MXN',
  /** Malaysian ringgit */
  MYR = 'MYR',
  /** Mozambican metical */
  MZN = 'MZN',
  /** Namibian dollar */
  NAD = 'NAD',
  /** Nigerian naira */
  NGN = 'NGN',
  /** Nicaraguan córdoba */
  NIO = 'NIO',
  /** Norwegian krone */
  NOK = 'NOK',
  /** Nepalese rupee */
  NPR = 'NPR',
  /** New Zealand dollar */
  NZD = 'NZD',
  /** Omani rial */
  OMR = 'OMR',
  /** Panamanian balboa */
  PAB = 'PAB',
  /** Peruvian sol */
  PEN = 'PEN',
  /** Papua New Guinean kina */
  PGK = 'PGK',
  /** Philippine peso */
  PHP = 'PHP',
  /** Pakistani rupee */
  PKR = 'PKR',
  /** Polish złoty */
  PLN = 'PLN',
  /** Paraguayan guaraní */
  PYG = 'PYG',
  /** Qatari riyal */
  QAR = 'QAR',
  /** Romanian leu */
  RON = 'RON',
  /** Serbian dinar */
  RSD = 'RSD',
  /** Russian ruble */
  RUB = 'RUB',
  /** Rwandan franc */
  RWF = 'RWF',
  /** Saudi riyal */
  SAR = 'SAR',
  /** Solomon Islands dollar */
  SBD = 'SBD',
  /** Seychelles rupee */
  SCR = 'SCR',
  /** Sudanese pound */
  SDG = 'SDG',
  /** Swedish krona/kronor */
  SEK = 'SEK',
  /** Singapore dollar */
  SGD = 'SGD',
  /** Saint Helena pound */
  SHP = 'SHP',
  /** Sierra Leonean leone */
  SLL = 'SLL',
  /** Somali shilling */
  SOS = 'SOS',
  /** Surinamese dollar */
  SRD = 'SRD',
  /** South Sudanese pound */
  SSP = 'SSP',
  /** São Tomé and Príncipe dobra */
  STN = 'STN',
  /** Salvadoran colón */
  SVC = 'SVC',
  /** Syrian pound */
  SYP = 'SYP',
  /** Swazi lilangeni */
  SZL = 'SZL',
  /** Thai baht */
  THB = 'THB',
  /** Tajikistani somoni */
  TJS = 'TJS',
  /** Turkmenistan manat */
  TMT = 'TMT',
  /** Tunisian dinar */
  TND = 'TND',
  /** Tongan paʻanga */
  TOP = 'TOP',
  /** Turkish lira */
  TRY = 'TRY',
  /** Trinidad and Tobago dollar */
  TTD = 'TTD',
  /** New Taiwan dollar */
  TWD = 'TWD',
  /** Tanzanian shilling */
  TZS = 'TZS',
  /** Ukrainian hryvnia */
  UAH = 'UAH',
  /** Ugandan shilling */
  UGX = 'UGX',
  /** United States dollar */
  USD = 'USD',
  /** Uruguayan peso */
  UYU = 'UYU',
  /** Uzbekistan som */
  UZS = 'UZS',
  /** Venezuelan bolívar soberano */
  VES = 'VES',
  /** Vietnamese đồng */
  VND = 'VND',
  /** Vanuatu vatu */
  VUV = 'VUV',
  /** Samoan tala */
  WST = 'WST',
  /** CFA franc BEAC */
  XAF = 'XAF',
  /** East Caribbean dollar */
  XCD = 'XCD',
  /** CFA franc BCEAO */
  XOF = 'XOF',
  /** CFP franc (franc Pacifique) */
  XPF = 'XPF',
  /** Yemeni rial */
  YER = 'YER',
  /** South African rand */
  ZAR = 'ZAR',
  /** Zambian kwacha */
  ZMW = 'ZMW',
  /** Zimbabwean dollar */
  ZWL = 'ZWL'
}

export type CustomerFilterParameter = {
  _and?: InputMaybe<Array<CustomerFilterParameter>>;
  _or?: InputMaybe<Array<CustomerFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  firstName?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  lastName?: InputMaybe<StringOperators>;
  phoneNumber?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime']['input'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateRange = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  DELETED = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NOT_DELETED = 'NOT_DELETED'
}

export enum ErrorCode {
  ALREADY_LOGGED_IN_ERROR = 'ALREADY_LOGGED_IN_ERROR',
  COUPON_CODE_EXPIRED_ERROR = 'COUPON_CODE_EXPIRED_ERROR',
  COUPON_CODE_INVALID_ERROR = 'COUPON_CODE_INVALID_ERROR',
  COUPON_CODE_LIMIT_ERROR = 'COUPON_CODE_LIMIT_ERROR',
  EMAIL_ADDRESS_CONFLICT_ERROR = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GUEST_CHECKOUT_ERROR = 'GUEST_CHECKOUT_ERROR',
  IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  INELIGIBLE_PAYMENT_METHOD_ERROR = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  INELIGIBLE_SHIPPING_METHOD_ERROR = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  INSUFFICIENT_STOCK_ERROR = 'INSUFFICIENT_STOCK_ERROR',
  INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
  MISSING_PASSWORD_ERROR = 'MISSING_PASSWORD_ERROR',
  NATIVE_AUTH_STRATEGY_ERROR = 'NATIVE_AUTH_STRATEGY_ERROR',
  NEGATIVE_QUANTITY_ERROR = 'NEGATIVE_QUANTITY_ERROR',
  NOT_VERIFIED_ERROR = 'NOT_VERIFIED_ERROR',
  NO_ACTIVE_ORDER_ERROR = 'NO_ACTIVE_ORDER_ERROR',
  ORDER_INTERCEPTOR_ERROR = 'ORDER_INTERCEPTOR_ERROR',
  ORDER_LIMIT_ERROR = 'ORDER_LIMIT_ERROR',
  ORDER_MODIFICATION_ERROR = 'ORDER_MODIFICATION_ERROR',
  ORDER_PAYMENT_STATE_ERROR = 'ORDER_PAYMENT_STATE_ERROR',
  ORDER_STATE_TRANSITION_ERROR = 'ORDER_STATE_TRANSITION_ERROR',
  PASSWORD_ALREADY_SET_ERROR = 'PASSWORD_ALREADY_SET_ERROR',
  PASSWORD_RESET_TOKEN_EXPIRED_ERROR = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PASSWORD_RESET_TOKEN_INVALID_ERROR = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PASSWORD_VALIDATION_ERROR = 'PASSWORD_VALIDATION_ERROR',
  PAYMENT_DECLINED_ERROR = 'PAYMENT_DECLINED_ERROR',
  PAYMENT_FAILED_ERROR = 'PAYMENT_FAILED_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VERIFICATION_TOKEN_EXPIRED_ERROR = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VERIFICATION_TOKEN_INVALID_ERROR = 'VERIFICATION_TOKEN_INVALID_ERROR'
}

export type FacetFilterParameter = {
  _and?: InputMaybe<Array<FacetFilterParameter>>;
  _or?: InputMaybe<Array<FacetFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']['input']>;
  or?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type FacetValueFilterParameter = {
  _and?: InputMaybe<Array<FacetValueFilterParameter>>;
  _or?: InputMaybe<Array<FacetValueFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  facetId?: InputMaybe<IdOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetValueListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetValueFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetValueSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FacetValueSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  facetId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum GlobalFlag {
  FALSE = 'FALSE',
  INHERIT = 'INHERIT',
  TRUE = 'TRUE'
}

export type HistoryEntryFilterParameter = {
  _and?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  _or?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryEntrySortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CUSTOMER_ADDED_TO_GROUP = 'CUSTOMER_ADDED_TO_GROUP',
  CUSTOMER_ADDRESS_CREATED = 'CUSTOMER_ADDRESS_CREATED',
  CUSTOMER_ADDRESS_DELETED = 'CUSTOMER_ADDRESS_DELETED',
  CUSTOMER_ADDRESS_UPDATED = 'CUSTOMER_ADDRESS_UPDATED',
  CUSTOMER_DETAIL_UPDATED = 'CUSTOMER_DETAIL_UPDATED',
  CUSTOMER_EMAIL_UPDATE_REQUESTED = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CUSTOMER_EMAIL_UPDATE_VERIFIED = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CUSTOMER_NOTE = 'CUSTOMER_NOTE',
  CUSTOMER_PASSWORD_RESET_REQUESTED = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CUSTOMER_PASSWORD_RESET_VERIFIED = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CUSTOMER_PASSWORD_UPDATED = 'CUSTOMER_PASSWORD_UPDATED',
  CUSTOMER_REGISTERED = 'CUSTOMER_REGISTERED',
  CUSTOMER_REMOVED_FROM_GROUP = 'CUSTOMER_REMOVED_FROM_GROUP',
  CUSTOMER_VERIFIED = 'CUSTOMER_VERIFIED',
  ORDER_CANCELLATION = 'ORDER_CANCELLATION',
  ORDER_COUPON_APPLIED = 'ORDER_COUPON_APPLIED',
  ORDER_COUPON_REMOVED = 'ORDER_COUPON_REMOVED',
  ORDER_CUSTOMER_UPDATED = 'ORDER_CUSTOMER_UPDATED',
  ORDER_FULFILLMENT = 'ORDER_FULFILLMENT',
  ORDER_FULFILLMENT_TRANSITION = 'ORDER_FULFILLMENT_TRANSITION',
  ORDER_MODIFIED = 'ORDER_MODIFIED',
  ORDER_NOTE = 'ORDER_NOTE',
  ORDER_PAYMENT_TRANSITION = 'ORDER_PAYMENT_TRANSITION',
  ORDER_REFUND_TRANSITION = 'ORDER_REFUND_TRANSITION',
  ORDER_STATE_TRANSITION = 'ORDER_STATE_TRANSITION'
}

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID']['input'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Belarusian */
  Be = 'be',
  /** Bulgarian */
  Bg = 'bg',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Tibetan */
  Bo = 'bo',
  /** Breton */
  Br = 'br',
  /** Bosnian */
  Bs = 'bs',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Corsican */
  Co = 'co',
  /** Czech */
  Cs = 'cs',
  /** Church Slavic */
  Cu = 'cu',
  /** Welsh */
  Cy = 'cy',
  /** Danish */
  Da = 'da',
  /** German */
  De = 'de',
  /** Austrian German */
  De_AT = 'de_AT',
  /** Swiss High German */
  De_CH = 'de_CH',
  /** Dzongkha */
  Dz = 'dz',
  /** Ewe */
  Ee = 'ee',
  /** Greek */
  El = 'el',
  /** English */
  En = 'en',
  /** Australian English */
  En_AU = 'en_AU',
  /** Canadian English */
  En_CA = 'en_CA',
  /** British English */
  En_GB = 'en_GB',
  /** American English */
  En_US = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  Es_ES = 'es_ES',
  /** Mexican Spanish */
  Es_MX = 'es_MX',
  /** Estonian */
  Et = 'et',
  /** Basque */
  Eu = 'eu',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  Fa_AF = 'fa_AF',
  /** Fulah */
  Ff = 'ff',
  /** Finnish */
  Fi = 'fi',
  /** Faroese */
  Fo = 'fo',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  Fr_CA = 'fr_CA',
  /** Swiss French */
  Fr_CH = 'fr_CH',
  /** Western Frisian */
  Fy = 'fy',
  /** Irish */
  Ga = 'ga',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Galician */
  Gl = 'gl',
  /** Gujarati */
  Gu = 'gu',
  /** Manx */
  Gv = 'gv',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Croatian */
  Hr = 'hr',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hungarian */
  Hu = 'hu',
  /** Armenian */
  Hy = 'hy',
  /** Interlingua */
  Ia = 'ia',
  /** Indonesian */
  Id = 'id',
  /** Igbo */
  Ig = 'ig',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Icelandic */
  Is = 'is',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Georgian */
  Ka = 'ka',
  /** Kikuyu */
  Ki = 'ki',
  /** Kazakh */
  Kk = 'kk',
  /** Kalaallisut */
  Kl = 'kl',
  /** Khmer */
  Km = 'km',
  /** Kannada */
  Kn = 'kn',
  /** Korean */
  Ko = 'ko',
  /** Kashmiri */
  Ks = 'ks',
  /** Kurdish */
  Ku = 'ku',
  /** Cornish */
  Kw = 'kw',
  /** Kyrgyz */
  Ky = 'ky',
  /** Latin */
  La = 'la',
  /** Luxembourgish */
  Lb = 'lb',
  /** Ganda */
  Lg = 'lg',
  /** Lingala */
  Ln = 'ln',
  /** Lao */
  Lo = 'lo',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Latvian */
  Lv = 'lv',
  /** Malagasy */
  Mg = 'mg',
  /** Maori */
  Mi = 'mi',
  /** Macedonian */
  Mk = 'mk',
  /** Malayalam */
  Ml = 'ml',
  /** Mongolian */
  Mn = 'mn',
  /** Marathi */
  Mr = 'mr',
  /** Malay */
  Ms = 'ms',
  /** Maltese */
  Mt = 'mt',
  /** Burmese */
  My = 'my',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** North Ndebele */
  Nd = 'nd',
  /** Nepali */
  Ne = 'ne',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  Nl_BE = 'nl_BE',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Oromo */
  Om = 'om',
  /** Odia */
  Or = 'or',
  /** Ossetic */
  Os = 'os',
  /** Punjabi */
  Pa = 'pa',
  /** Polish */
  Pl = 'pl',
  /** Pashto */
  Ps = 'ps',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  Pt_BR = 'pt_BR',
  /** European Portuguese */
  Pt_PT = 'pt_PT',
  /** Quechua */
  Qu = 'qu',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  Ro_MD = 'ro_MD',
  /** Russian */
  Ru = 'ru',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Sanskrit */
  Sa = 'sa',
  /** Sindhi */
  Sd = 'sd',
  /** Northern Sami */
  Se = 'se',
  /** Sango */
  Sg = 'sg',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Samoan */
  Sm = 'sm',
  /** Shona */
  Sn = 'sn',
  /** Somali */
  So = 'so',
  /** Albanian */
  Sq = 'sq',
  /** Serbian */
  Sr = 'sr',
  /** Southern Sotho */
  St = 'st',
  /** Sundanese */
  Su = 'su',
  /** Swedish */
  Sv = 'sv',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  Sw_CD = 'sw_CD',
  /** Tamil */
  Ta = 'ta',
  /** Telugu */
  Te = 'te',
  /** Tajik */
  Tg = 'tg',
  /** Thai */
  Th = 'th',
  /** Tigrinya */
  Ti = 'ti',
  /** Turkmen */
  Tk = 'tk',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Tatar */
  Tt = 'tt',
  /** Uyghur */
  Ug = 'ug',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  Zh_Hans = 'zh_Hans',
  /** Traditional Chinese */
  Zh_Hant = 'zh_Hant',
  /** Zulu */
  Zu = 'zu'
}

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR'
}

export type NativeAuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float']['input'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type NumberRange = {
  end: Scalars['Float']['input'];
  start: Scalars['Float']['input'];
};

export type OrderFilterParameter = {
  _and?: InputMaybe<Array<OrderFilterParameter>>;
  _or?: InputMaybe<Array<OrderFilterParameter>>;
  active?: InputMaybe<BooleanOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller'
}

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON']['input'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String']['input'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone'
}

export type ProductFilterParameter = {
  _and?: InputMaybe<Array<ProductFilterParameter>>;
  _or?: InputMaybe<Array<ProductFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductVariantFilterParameter = {
  _and?: InputMaybe<Array<ProductVariantFilterParameter>>;
  _or?: InputMaybe<Array<ProductVariantFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  price?: InputMaybe<NumberOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  sku?: InputMaybe<StringOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductVariantSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type RegisterCustomerInput = {
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  collectionSlug?: InputMaybe<Scalars['String']['input']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  groupByProduct?: InputMaybe<Scalars['Boolean']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String']['input'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Input used to update an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1?: InputMaybe<Scalars['String']['input']>;
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  customFields?: InputMaybe<Scalars['JSON']['input']>;
};

export type CollectionBaseFragmentFragment = { id: string, name: string, slug: string, description: string, featuredAsset?: { id: string, preview: string } | null };

export type CollectionMenuFragmentFragment = { id: string, name: string, slug: string, parentId: string, featuredAsset?: { id: string, preview: string } | null, children?: Array<{ id: string, name: string, slug: string, featuredAsset?: { id: string, preview: string } | null }> | null };

export type CustomerBaseFragment = { id: string, title?: string | null, firstName: string, lastName: string, emailAddress: string };

export type CustomerDetailFragment = { phoneNumber?: string | null, customFields?: any | null, id: string, title?: string | null, firstName: string, lastName: string, emailAddress: string, addresses?: Array<{ id: string, fullName?: string | null, streetLine1: string, city?: string | null, postalCode?: string | null, country: { code: string, name: string } }> | null, user?: { id: string, identifier: string } | null };

export type CurrentUserFragment = { id: string, identifier: string };

export type OrderBaseFragment = { id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> };

export type OrderDetailFragment = { id: string, code: string, couponCodes: Array<string>, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotalWithTax: any, shippingWithTax: any, totalWithTax: any, customer?: { id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, billingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, discounts: Array<{ description: string, amountWithTax: any }>, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string, sku: string }, featuredAsset?: { id: string, preview: string } | null }>, shippingLines: Array<{ priceWithTax: any, shippingMethod: { description: string } }> };

export type ProductVariantFragmentFragment = { id: string, name: string, sku: string, stockLevel: string, currencyCode: CurrencyCode, price: any, priceWithTax: any, options: Array<{ id: string, name: string, group: { id: string, name: string } }>, featuredAsset?: { id: string, preview: string } | null, assets: Array<{ id: string, preview: string }> };

export type ProductBaseFragmentFragment = { id: string, name: string, slug: string, description: string, featuredAsset?: { id: string, preview: string } | null, variants: Array<{ currencyCode: CurrencyCode, price: any }> };

export type ProductDetailFragmentFragment = { id: string, name: string, slug: string, description: string, assets: Array<{ id: string, preview: string }>, collections: Array<{ id: string, name: string, slug: string, parent?: { id: string, name: string, slug: string } | null }>, variants: Array<{ currencyCode: CurrencyCode, price: any, id: string, name: string, sku: string, stockLevel: string, priceWithTax: any, options: Array<{ id: string, name: string, group: { id: string, name: string } }>, featuredAsset?: { id: string, preview: string } | null, assets: Array<{ id: string, preview: string }> }>, featuredAsset?: { id: string, preview: string } | null };

export type ProductSearchFragmentFragment = { productName: string, slug: string, currencyCode: CurrencyCode, productAsset?: { id: string, preview: string } | null, priceWithTax: { min: any, max: any } | { value: any } };

export type GetMenuCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuCollectionsQuery = { collections: { items: Array<{ id: string, name: string, slug: string, parentId: string, featuredAsset?: { id: string, preview: string } | null, children?: Array<{ id: string, name: string, slug: string, featuredAsset?: { id: string, preview: string } | null }> | null }> } };

export type GetCollectionQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetCollectionQuery = { collection?: { id: string, name: string, slug: string, description: string, featuredAsset?: { id: string, preview: string } | null } | null };

export type GetCollectionProductsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCollectionProductsQuery = { search: { totalItems: number, items: Array<{ productName: string, slug: string, currencyCode: CurrencyCode, productAsset?: { id: string, preview: string } | null, priceWithTax: { min: any, max: any } | { value: any } }> } };

export type GetChannelCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelCountriesQuery = { activeChannel: { defaultShippingZone?: { id: string, name: string, members: Array<{ id: string, code: string, name: string } | { id: string, code: string, name: string }> } | null } };

export type GetActiveCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveCustomerQuery = { activeCustomer?: { id: string, title?: string | null, firstName: string, lastName: string, emailAddress: string } | null };

export type GetActiveCustomerDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveCustomerDetailQuery = { activeCustomer?: { phoneNumber?: string | null, customFields?: any | null, id: string, title?: string | null, firstName: string, lastName: string, emailAddress: string, addresses?: Array<{ id: string, fullName?: string | null, streetLine1: string, city?: string | null, postalCode?: string | null, country: { code: string, name: string } }> | null, user?: { id: string, identifier: string } | null } | null };

export type GetCustomerAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerAddressesQuery = { activeCustomer?: { id: string, addresses?: Array<{ id: string, fullName?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, postalCode?: string | null, phoneNumber?: string | null, country: { code: string, name: string } }> | null } | null };

export type LogInUserMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type LogInUserMutation = { login: { id: string, identifier: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } };

export type LogOutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutUserMutation = { logout: { success: boolean } };

export type RegisterCustomerAccountMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;


export type RegisterCustomerAccountMutation = { registerCustomerAccount: { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { success: boolean } };

export type VerifyCustomerAccountMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
}>;


export type VerifyCustomerAccountMutation = { verifyCustomerAccount: { id: string, identifier: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } };

export type RequestPasswordResetMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { requestPasswordReset?: { errorCode: ErrorCode, message: string } | { success: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { resetPassword: { id: string, identifier: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } | { errorCode: ErrorCode, message: string } };

export type GetActiveOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveOrderQuery = { activeOrder?: { id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | null };

export type GetActiveOrderDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveOrderDetailQuery = { activeOrder?: { id: string, code: string, couponCodes: Array<string>, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotalWithTax: any, shippingWithTax: any, totalWithTax: any, customer?: { id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, billingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, discounts: Array<{ description: string, amountWithTax: any }>, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string, sku: string }, featuredAsset?: { id: string, preview: string } | null }>, shippingLines: Array<{ priceWithTax: any, shippingMethod: { description: string } }> } | null };

export type GetShippingMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShippingMethodsQuery = { eligibleShippingMethods: Array<{ id: string, name: string, price: any, description: string }> };

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentMethodsQuery = { eligiblePaymentMethods: Array<{ id: string, name: string, code: string, isEligible: boolean }> };

export type GetOrderByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GetOrderByCodeQuery = { orderByCode?: { id: string, code: string, couponCodes: Array<string>, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotalWithTax: any, shippingWithTax: any, totalWithTax: any, customer?: { id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, billingAddress?: { fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, city?: string | null, postalCode?: string | null, country?: string | null } | null, discounts: Array<{ description: string, amountWithTax: any }>, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string, sku: string }, featuredAsset?: { id: string, preview: string } | null }>, shippingLines: Array<{ priceWithTax: any, shippingMethod: { description: string } }> } | null };

export type GetOrderHistoryQueryVariables = Exact<{
  options?: InputMaybe<OrderListOptions>;
}>;


export type GetOrderHistoryQuery = { activeCustomer?: { orders: { totalItems: number, items: Array<{ orderPlacedAt?: any | null, id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> }> } } | null };

export type AddItemToOrderMutationVariables = Exact<{
  variantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddItemToOrderMutation = { addItemToOrder: { __typename: 'InsufficientStockError', errorCode: ErrorCode, message: string, quantityAvailable: number, order: { id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } } | { __typename: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type RemoveItemFromOrderMutationVariables = Exact<{
  orderLineId: Scalars['ID']['input'];
}>;


export type RemoveItemFromOrderMutation = { removeOrderLine: { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AdjustOrderLineMutation = { adjustOrderLine: { __typename: 'InsufficientStockError', errorCode: ErrorCode, message: string } | { __typename: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type ApplyCouponCodeMutationVariables = Exact<{
  couponCode: Scalars['String']['input'];
}>;


export type ApplyCouponCodeMutation = { applyCouponCode: { __typename: 'CouponCodeExpiredError', errorCode: ErrorCode, message: string } | { __typename: 'CouponCodeInvalidError', errorCode: ErrorCode, message: string } | { __typename: 'CouponCodeLimitError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } };

export type RemoveCouponCodeMutationVariables = Exact<{
  couponCode: Scalars['String']['input'];
}>;


export type RemoveCouponCodeMutation = { removeCouponCode?: { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | null };

export type SetCustomerForOrderMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;


export type SetCustomerForOrderMutation = { setCustomerForOrder: { __typename: 'AlreadyLoggedInError', errorCode: ErrorCode, message: string } | { __typename: 'EmailAddressConflictError', errorCode: ErrorCode, message: string } | { __typename: 'GuestCheckoutError', errorCode: ErrorCode, message: string } | { __typename: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } };

export type SetOrderShippingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type SetOrderShippingAddressMutation = { setOrderShippingAddress: { __typename: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } };

export type SetShippingMethodMutationVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SetShippingMethodMutation = { setOrderShippingMethod: { __typename: 'IneligibleShippingMethodError', errorCode: ErrorCode, message: string } | { __typename: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type TransitionToStateMutationVariables = Exact<{
  state: Scalars['String']['input'];
}>;


export type TransitionToStateMutation = { transitionOrderToState?: { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderStateTransitionError', errorCode: ErrorCode, message: string, transitionError: string, fromState: string, toState: string } | null };

export type AddPaymentToOrderMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type AddPaymentToOrderMutation = { addPaymentToOrder: { __typename: 'IneligiblePaymentMethodError', errorCode: ErrorCode, message: string } | { __typename: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, couponCodes: Array<string>, state: string, totalQuantity: number, totalWithTax: any, currencyCode: CurrencyCode, lines: Array<{ id: string, unitPriceWithTax: any, quantity: number, linePriceWithTax: any, productVariant: { id: string, name: string }, featuredAsset?: { id: string, preview: string } | null }> } | { __typename: 'OrderPaymentStateError', errorCode: ErrorCode, message: string } | { __typename: 'OrderStateTransitionError', errorCode: ErrorCode, message: string } | { __typename: 'PaymentDeclinedError', errorCode: ErrorCode, message: string } | { __typename: 'PaymentFailedError', errorCode: ErrorCode, message: string } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { product?: { id: string, name: string, slug: string, description: string, featuredAsset?: { id: string, preview: string } | null, variants: Array<{ currencyCode: CurrencyCode, price: any }> } | null };

export type GetProductDetailQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProductDetailQuery = { product?: { id: string, name: string, slug: string, description: string, assets: Array<{ id: string, preview: string }>, collections: Array<{ id: string, name: string, slug: string, parent?: { id: string, name: string, slug: string } | null }>, variants: Array<{ currencyCode: CurrencyCode, price: any, id: string, name: string, sku: string, stockLevel: string, priceWithTax: any, options: Array<{ id: string, name: string, group: { id: string, name: string } }>, featuredAsset?: { id: string, preview: string } | null, assets: Array<{ id: string, preview: string }> }>, featuredAsset?: { id: string, preview: string } | null } | null };

export type GetProductVariantStockQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
  variantId: Scalars['String']['input'];
}>;


export type GetProductVariantStockQuery = { product?: { variantList: { items: Array<{ stockLevel: string }> } } | null };

export type GetProductsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsQuery = { products: { totalItems: number, items: Array<{ id: string, name: string, slug: string, description: string, featuredAsset?: { id: string, preview: string } | null, variants: Array<{ currencyCode: CurrencyCode, price: any }> }> } };

export type SearchProductsQueryVariables = Exact<{
  term: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  collectionSlug?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { search: { totalItems: number, items: Array<{ productName: string, slug: string, currencyCode: CurrencyCode, productAsset?: { id: string, preview: string } | null, priceWithTax: { min: any, max: any } | { value: any } }> } };

export const CollectionBaseFragmentFragmentDoc = gql`
    fragment CollectionBaseFragment on Collection {
  id
  name
  slug
  description
  featuredAsset {
    id
    preview
  }
}
    `;
export const CollectionMenuFragmentFragmentDoc = gql`
    fragment CollectionMenuFragment on Collection {
  id
  name
  slug
  parentId
  featuredAsset {
    id
    preview
  }
  children {
    id
    name
    slug
    featuredAsset {
      id
      preview
    }
  }
}
    `;
export const CustomerBaseFragmentDoc = gql`
    fragment CustomerBase on Customer {
  id
  title
  firstName
  lastName
  emailAddress
}
    `;
export const CustomerDetailFragmentDoc = gql`
    fragment CustomerDetail on Customer {
  ...CustomerBase
  phoneNumber
  addresses {
    id
    fullName
    streetLine1
    city
    postalCode
    country {
      code
      name
    }
  }
  user {
    id
    identifier
  }
  customFields
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on CurrentUser {
  id
  identifier
}
    `;
export const OrderBaseFragmentDoc = gql`
    fragment OrderBase on Order {
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
    `;
export const OrderDetailFragmentDoc = gql`
    fragment OrderDetail on Order {
  id
  code
  couponCodes
  state
  currencyCode
  totalQuantity
  subTotalWithTax
  shippingWithTax
  totalWithTax
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
  shippingLines {
    shippingMethod {
      description
    }
    priceWithTax
  }
}
    `;
export const ProductBaseFragmentFragmentDoc = gql`
    fragment ProductBaseFragment on Product {
  id
  name
  slug
  description
  featuredAsset {
    id
    preview
  }
  variants {
    currencyCode
    price
  }
}
    `;
export const ProductVariantFragmentFragmentDoc = gql`
    fragment ProductVariantFragment on ProductVariant {
  id
  name
  sku
  stockLevel
  currencyCode
  price
  priceWithTax
  options {
    id
    name
    group {
      id
      name
    }
  }
  featuredAsset {
    id
    preview
  }
  assets {
    id
    preview
  }
}
    `;
export const ProductDetailFragmentFragmentDoc = gql`
    fragment ProductDetailFragment on Product {
  ...ProductBaseFragment
  assets {
    id
    preview
  }
  collections {
    id
    name
    slug
    parent {
      id
      name
      slug
    }
  }
  variants {
    ...ProductVariantFragment
  }
}
    `;
export const ProductSearchFragmentFragmentDoc = gql`
    fragment ProductSearchFragment on SearchResult {
  productName
  slug
  productAsset {
    id
    preview
  }
  priceWithTax {
    ... on SinglePrice {
      value
    }
    ... on PriceRange {
      min
      max
    }
  }
  currencyCode
}
    `;
export const GetMenuCollectionsDocument = gql`
    query GetMenuCollections {
  collections(options: {topLevelOnly: true}) {
    items {
      ...CollectionMenuFragment
    }
  }
}
    ${CollectionMenuFragmentFragmentDoc}`;
export const GetCollectionDocument = gql`
    query GetCollection($slug: String!) {
  collection(slug: $slug) {
    ...CollectionBaseFragment
  }
}
    ${CollectionBaseFragmentFragmentDoc}`;
export const GetCollectionProductsDocument = gql`
    query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {
  search(
    input: {collectionSlug: $slug, groupByProduct: true, skip: $skip, take: $take}
  ) {
    totalItems
    items {
      ...ProductSearchFragment
    }
  }
}
    ${ProductSearchFragmentFragmentDoc}`;
export const GetChannelCountriesDocument = gql`
    query GetChannelCountries {
  activeChannel {
    defaultShippingZone {
      id
      name
      members {
        id
        code
        name
      }
    }
  }
}
    `;
export const GetActiveCustomerDocument = gql`
    query GetActiveCustomer {
  activeCustomer {
    ...CustomerBase
  }
}
    ${CustomerBaseFragmentDoc}`;
export const GetActiveCustomerDetailDocument = gql`
    query GetActiveCustomerDetail {
  activeCustomer {
    ...CustomerDetail
  }
}
    ${CustomerDetailFragmentDoc}
${CustomerBaseFragmentDoc}`;
export const GetCustomerAddressesDocument = gql`
    query GetCustomerAddresses {
  activeCustomer {
    id
    addresses {
      id
      fullName
      streetLine1
      streetLine2
      city
      postalCode
      country {
        code
        name
      }
      phoneNumber
    }
  }
}
    `;
export const LogInUserDocument = gql`
    mutation LogInUser($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {
  login(username: $emailAddress, password: $password, rememberMe: $rememberMe) {
    ... on CurrentUser {
      ...CurrentUser
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export const LogOutUserDocument = gql`
    mutation LogOutUser {
  logout {
    success
  }
}
    `;
export const RegisterCustomerAccountDocument = gql`
    mutation RegisterCustomerAccount($input: RegisterCustomerInput!) {
  registerCustomerAccount(input: $input) {
    ... on Success {
      success
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const VerifyCustomerAccountDocument = gql`
    mutation VerifyCustomerAccount($password: String, $token: String!) {
  verifyCustomerAccount(password: $password, token: $token) {
    ... on CurrentUser {
      ...CurrentUser
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($emailAddress: String!) {
  requestPasswordReset(emailAddress: $emailAddress) {
    ... on Success {
      success
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    ... on CurrentUser {
      ...CurrentUser
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export const GetActiveOrderDocument = gql`
    query GetActiveOrder {
  activeOrder {
    ...OrderBase
  }
}
    ${OrderBaseFragmentDoc}`;
export const GetActiveOrderDetailDocument = gql`
    query GetActiveOrderDetail {
  activeOrder {
    ...OrderDetail
  }
}
    ${OrderDetailFragmentDoc}`;
export const GetShippingMethodsDocument = gql`
    query GetShippingMethods {
  eligibleShippingMethods {
    id
    name
    price
    description
  }
}
    `;
export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods {
  eligiblePaymentMethods {
    id
    name
    code
    isEligible
  }
}
    `;
export const GetOrderByCodeDocument = gql`
    query GetOrderByCode($code: String!) {
  orderByCode(code: $code) {
    ...OrderDetail
  }
}
    ${OrderDetailFragmentDoc}`;
export const GetOrderHistoryDocument = gql`
    query GetOrderHistory($options: OrderListOptions) {
  activeCustomer {
    orders(options: $options) {
      totalItems
      items {
        ...OrderBase
        orderPlacedAt
      }
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const AddItemToOrderDocument = gql`
    mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
  addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
    ... on InsufficientStockError {
      quantityAvailable
      order {
        ...OrderBase
      }
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const RemoveItemFromOrderDocument = gql`
    mutation RemoveItemFromOrder($orderLineId: ID!) {
  removeOrderLine(orderLineId: $orderLineId) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const AdjustOrderLineDocument = gql`
    mutation AdjustOrderLine($orderLineId: ID!, $quantity: Int!) {
  adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const ApplyCouponCodeDocument = gql`
    mutation ApplyCouponCode($couponCode: String!) {
  applyCouponCode(couponCode: $couponCode) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const RemoveCouponCodeDocument = gql`
    mutation RemoveCouponCode($couponCode: String!) {
  removeCouponCode(couponCode: $couponCode) {
    __typename
    ...OrderBase
  }
}
    ${OrderBaseFragmentDoc}`;
export const SetCustomerForOrderDocument = gql`
    mutation SetCustomerForOrder($input: CreateCustomerInput!) {
  setCustomerForOrder(input: $input) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const SetOrderShippingAddressDocument = gql`
    mutation SetOrderShippingAddress($input: CreateAddressInput!) {
  setOrderShippingAddress(input: $input) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const SetShippingMethodDocument = gql`
    mutation SetShippingMethod($id: [ID!]!) {
  setOrderShippingMethod(shippingMethodId: $id) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const TransitionToStateDocument = gql`
    mutation TransitionToState($state: String!) {
  transitionOrderToState(state: $state) {
    __typename
    ...OrderBase
    ... on OrderStateTransitionError {
      errorCode
      message
      transitionError
      fromState
      toState
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const AddPaymentToOrderDocument = gql`
    mutation AddPaymentToOrder($input: PaymentInput!) {
  addPaymentToOrder(input: $input) {
    __typename
    ...OrderBase
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderBaseFragmentDoc}`;
export const GetProductDocument = gql`
    query GetProduct($id: ID!) {
  product(id: $id) {
    ...ProductBaseFragment
  }
}
    ${ProductBaseFragmentFragmentDoc}`;
export const GetProductDetailDocument = gql`
    query GetProductDetail($slug: String!) {
  product(slug: $slug) {
    ...ProductDetailFragment
  }
}
    ${ProductDetailFragmentFragmentDoc}
${ProductBaseFragmentFragmentDoc}
${ProductVariantFragmentFragmentDoc}`;
export const GetProductVariantStockDocument = gql`
    query GetProductVariantStock($productId: ID!, $variantId: String!) {
  product(id: $productId) {
    variantList(options: {filter: {id: {eq: $variantId}}}) {
      items {
        stockLevel
      }
    }
  }
}
    `;
export const GetProductsDocument = gql`
    query GetProducts($take: Int = 12, $skip: Int = 0) {
  products(options: {take: $take, skip: $skip}) {
    items {
      ...ProductBaseFragment
    }
    totalItems
  }
}
    ${ProductBaseFragmentFragmentDoc}`;
export const SearchProductsDocument = gql`
    query SearchProducts($term: String!, $skip: Int, $take: Int, $collectionSlug: String) {
  search(
    input: {term: $term, groupByProduct: true, skip: $skip, take: $take, collectionSlug: $collectionSlug}
  ) {
    totalItems
    items {
      ...ProductSearchFragment
    }
  }
}
    ${ProductSearchFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetMenuCollections(variables?: GetMenuCollectionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMenuCollectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMenuCollectionsQuery>(GetMenuCollectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetMenuCollections', 'query', variables);
    },
    GetCollection(variables: GetCollectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCollectionQuery>(GetCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCollection', 'query', variables);
    },
    GetCollectionProducts(variables: GetCollectionProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCollectionProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCollectionProductsQuery>(GetCollectionProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCollectionProducts', 'query', variables);
    },
    GetChannelCountries(variables?: GetChannelCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetChannelCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChannelCountriesQuery>(GetChannelCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetChannelCountries', 'query', variables);
    },
    GetActiveCustomer(variables?: GetActiveCustomerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetActiveCustomerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveCustomerQuery>(GetActiveCustomerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetActiveCustomer', 'query', variables);
    },
    GetActiveCustomerDetail(variables?: GetActiveCustomerDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetActiveCustomerDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveCustomerDetailQuery>(GetActiveCustomerDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetActiveCustomerDetail', 'query', variables);
    },
    GetCustomerAddresses(variables?: GetCustomerAddressesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCustomerAddressesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCustomerAddressesQuery>(GetCustomerAddressesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCustomerAddresses', 'query', variables);
    },
    LogInUser(variables: LogInUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogInUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogInUserMutation>(LogInUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LogInUser', 'mutation', variables);
    },
    LogOutUser(variables?: LogOutUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogOutUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogOutUserMutation>(LogOutUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LogOutUser', 'mutation', variables);
    },
    RegisterCustomerAccount(variables: RegisterCustomerAccountMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RegisterCustomerAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterCustomerAccountMutation>(RegisterCustomerAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterCustomerAccount', 'mutation', variables);
    },
    VerifyCustomerAccount(variables: VerifyCustomerAccountMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<VerifyCustomerAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyCustomerAccountMutation>(VerifyCustomerAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VerifyCustomerAccount', 'mutation', variables);
    },
    RequestPasswordReset(variables: RequestPasswordResetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RequestPasswordResetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestPasswordResetMutation>(RequestPasswordResetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RequestPasswordReset', 'mutation', variables);
    },
    ResetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResetPassword', 'mutation', variables);
    },
    GetActiveOrder(variables?: GetActiveOrderQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetActiveOrderQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveOrderQuery>(GetActiveOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetActiveOrder', 'query', variables);
    },
    GetActiveOrderDetail(variables?: GetActiveOrderDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetActiveOrderDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveOrderDetailQuery>(GetActiveOrderDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetActiveOrderDetail', 'query', variables);
    },
    GetShippingMethods(variables?: GetShippingMethodsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetShippingMethodsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetShippingMethodsQuery>(GetShippingMethodsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetShippingMethods', 'query', variables);
    },
    GetPaymentMethods(variables?: GetPaymentMethodsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPaymentMethodsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPaymentMethodsQuery>(GetPaymentMethodsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPaymentMethods', 'query', variables);
    },
    GetOrderByCode(variables: GetOrderByCodeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOrderByCodeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrderByCodeQuery>(GetOrderByCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrderByCode', 'query', variables);
    },
    GetOrderHistory(variables?: GetOrderHistoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOrderHistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrderHistoryQuery>(GetOrderHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrderHistory', 'query', variables);
    },
    AddItemToOrder(variables: AddItemToOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddItemToOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddItemToOrderMutation>(AddItemToOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddItemToOrder', 'mutation', variables);
    },
    RemoveItemFromOrder(variables: RemoveItemFromOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RemoveItemFromOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveItemFromOrderMutation>(RemoveItemFromOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveItemFromOrder', 'mutation', variables);
    },
    AdjustOrderLine(variables: AdjustOrderLineMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AdjustOrderLineMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AdjustOrderLineMutation>(AdjustOrderLineDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AdjustOrderLine', 'mutation', variables);
    },
    ApplyCouponCode(variables: ApplyCouponCodeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApplyCouponCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplyCouponCodeMutation>(ApplyCouponCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ApplyCouponCode', 'mutation', variables);
    },
    RemoveCouponCode(variables: RemoveCouponCodeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RemoveCouponCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveCouponCodeMutation>(RemoveCouponCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveCouponCode', 'mutation', variables);
    },
    SetCustomerForOrder(variables: SetCustomerForOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetCustomerForOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetCustomerForOrderMutation>(SetCustomerForOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetCustomerForOrder', 'mutation', variables);
    },
    SetOrderShippingAddress(variables: SetOrderShippingAddressMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetOrderShippingAddressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetOrderShippingAddressMutation>(SetOrderShippingAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetOrderShippingAddress', 'mutation', variables);
    },
    SetShippingMethod(variables: SetShippingMethodMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetShippingMethodMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetShippingMethodMutation>(SetShippingMethodDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetShippingMethod', 'mutation', variables);
    },
    TransitionToState(variables: TransitionToStateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TransitionToStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransitionToStateMutation>(TransitionToStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TransitionToState', 'mutation', variables);
    },
    AddPaymentToOrder(variables: AddPaymentToOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddPaymentToOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddPaymentToOrderMutation>(AddPaymentToOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddPaymentToOrder', 'mutation', variables);
    },
    GetProduct(variables: GetProductQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductQuery>(GetProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProduct', 'query', variables);
    },
    GetProductDetail(variables: GetProductDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductDetailQuery>(GetProductDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProductDetail', 'query', variables);
    },
    GetProductVariantStock(variables: GetProductVariantStockQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductVariantStockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductVariantStockQuery>(GetProductVariantStockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProductVariantStock', 'query', variables);
    },
    GetProducts(variables?: GetProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>(GetProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProducts', 'query', variables);
    },
    SearchProducts(variables: SearchProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SearchProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchProductsQuery>(SearchProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SearchProducts', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;