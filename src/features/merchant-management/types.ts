export type TMerchantListItem = {
  id: string;
  providerCode: string;
  merchantCode: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
};

export type TGetMerchantListResponse = TMerchantListItem[];

export type TGetMerchantDetailResponse = TMerchantListItem & {
  createdAt: string;
  updatedAt: string;
};

export type TGetMerchantCredentialResponse = {
  merchantId: string;
  apiKey: string | null;
  apiSecret: string | null;
  hasCredentials: boolean;
};

export type TGenerateMerchantCredentialResponse = {
  merchantId: string;
  apiKey: string;
  apiSecret: string;
};

export type TCreateMerchantParams = {
  merchantCode: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
};

export type TUpdateMerchantParams = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
};

export type TGetMerchantParams = {
  isActive?: boolean;
  hasCredentials?: boolean;
};
