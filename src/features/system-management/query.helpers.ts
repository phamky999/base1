import type { QueryResponse } from '@/app/redux/types';
import {
  SYSTEM_MANAGEMENT_TAGS,
  SYSTEM_MANAGEMENT_TAG_IDS,
} from './query.tags';
import type { TGetAccountListResponse } from '@/features/system-management/types';

export const accountListProvideTags = (
  result: QueryResponse<TGetAccountListResponse> | undefined,
  error: unknown
) => {
  if (error) return [];
  return result?.data?.users?.length
    ? [
        {
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id: SYSTEM_MANAGEMENT_TAG_IDS.LIST,
        },
        ...result.data.users.map(item => ({
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id: item.id,
        })),
      ]
    : [
        {
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id: SYSTEM_MANAGEMENT_TAG_IDS.LIST,
        },
      ];
};

export const accountDetailProvideTags = (error: unknown, id: string) =>
  error
    ? []
    : [
        {
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id,
        },
      ];

export const accountCreateInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id: SYSTEM_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const accountUpdateInvalidateTags = (error: unknown, id: string) =>
  error
    ? []
    : [
        { type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT, id },
        {
          type: SYSTEM_MANAGEMENT_TAGS.ACCOUNT,
          id: SYSTEM_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const emailConfigProvideTags = (error: unknown) =>
  error ? [] : [{ type: SYSTEM_MANAGEMENT_TAGS.EMAIL_CONFIG, id: 'SINGLE' }];

export const emailConfigInvalidateTags = (error: unknown) =>
  error ? [] : [{ type: SYSTEM_MANAGEMENT_TAGS.EMAIL_CONFIG, id: 'SINGLE' }];
