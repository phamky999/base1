export const MERCHANT_MANAGEMENT_TAGS = {
  MERCHANT: 'Merchant',
  MERCHANT_CREDENTIALS: 'MerchantCredentials',
} as const;

export type MerchantManagementTagType =
  (typeof MERCHANT_MANAGEMENT_TAGS)[keyof typeof MERCHANT_MANAGEMENT_TAGS];

export const MERCHANT_MANAGEMENT_TAG_IDS = {
  LIST: 'LIST',
} as const;
