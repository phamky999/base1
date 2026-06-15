import type { QueryResponse } from '@/app/redux/types';
import {
  MERCHANT_MANAGEMENT_TAGS,
  MERCHANT_MANAGEMENT_TAG_IDS,
} from './query.tags';
import type { TGetMerchantListResponse } from '@/features/merchant-management/types';

export const merchantListProvideTags = (
  result: QueryResponse<TGetMerchantListResponse> | undefined,
  error: unknown
) => {
  if (error) return [];
  return result?.data?.length
    ? [
        {
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: MERCHANT_MANAGEMENT_TAG_IDS.LIST,
        },
        ...result.data.map(item => ({
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: item.id,
        })),
      ]
    : [
        {
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: MERCHANT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];
};

export const merchantDetailProvideTags = (error: unknown, id: string) =>
  error
    ? []
    : [{ type: MERCHANT_MANAGEMENT_TAGS.MERCHANT, id }];

export const merchantCredentialsProvideTags = (
  error: unknown,
  id: string
) =>
  error
    ? []
    : [{ type: MERCHANT_MANAGEMENT_TAGS.MERCHANT_CREDENTIALS, id }];

export const merchantCreateInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: MERCHANT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const merchantUpdateInvalidateTags = (
  error: unknown,
  id: string
) =>
  error
    ? []
    : [
        { type: MERCHANT_MANAGEMENT_TAGS.MERCHANT, id },
        {
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: MERCHANT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const merchantCredentialChangeInvalidateTags = (
  error: unknown,
  id: string
) =>
  error
    ? []
    : [
        { type: MERCHANT_MANAGEMENT_TAGS.MERCHANT, id },
        {
          type: MERCHANT_MANAGEMENT_TAGS.MERCHANT,
          id: MERCHANT_MANAGEMENT_TAG_IDS.LIST,
        },
        { type: MERCHANT_MANAGEMENT_TAGS.MERCHANT_CREDENTIALS, id },
      ];
