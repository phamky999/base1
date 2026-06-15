import { baseApi } from '@/app/redux/baseApi';
import type { QueryResponse } from '@/app/redux/types';
import {
  accountCreateInvalidateTags,
  accountDetailProvideTags,
  accountListProvideTags,
  accountUpdateInvalidateTags,
  emailConfigInvalidateTags,
  emailConfigProvideTags,
} from '@/features/system-management/query.helpers';
import { SYSTEM_MANAGEMENT_TAGS } from '@/features/system-management/query.tags';
import type {
  TAccountDetail,
  TCreateAccountParams,
  TGetAccountListParams,
  TGetAccountListResponse,
  TGetEmailConfigResponse,
  TUpdateAccountParams,
  TUpdateEmailConfigParams,
} from '@/features/system-management/types';

const accountEndpoint = '/Identity/Users';
const emailConfigEndpoint = '/Providers/EmailSettings';

export const systemManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(SYSTEM_MANAGEMENT_TAGS),
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetAccountList: builder.query<
        QueryResponse<TGetAccountListResponse>,
        TGetAccountListParams
      >({
        query: params => ({
          url: `${accountEndpoint}`,
          method: 'GET',
          params,
        }),

        providesTags: (result, error) => accountListProvideTags(result, error),
      }),

      GetAccountDetail: builder.query<QueryResponse<TAccountDetail>, string>({
        query: id => ({
          url: `${accountEndpoint}/${id}`,
          method: 'GET',
        }),

        providesTags: (_, error, id) => accountDetailProvideTags(error, id),
      }),

      CreateAccount: builder.mutation<
        QueryResponse<void>,
        TCreateAccountParams
      >({
        query: data => ({
          url: `${accountEndpoint}/CreateUser`,
          method: 'POST',
          body: data,
        }),

        invalidatesTags: (_, error) => accountCreateInvalidateTags(error),
      }),

      UpdateAccountPassword: builder.mutation<
        QueryResponse<void>,
        { id: string; data: { newPassword: string } }
      >({
        query: ({ id, data }) => ({
          url: `${accountEndpoint}/${id}/ChangePassword`,
          method: 'POST',
          body: data,
        }),
      }),

      UpdateAccount: builder.mutation<
        QueryResponse<void>,
        { id: string; data: TUpdateAccountParams }
      >({
        query: ({ id, data }) => ({
          url: `${accountEndpoint}/${id}`,
          method: 'PUT',
          body: data,
        }),

        invalidatesTags: (_, error, { id }) =>
          accountUpdateInvalidateTags(error, id),
      }),

      GetEmailConfig: builder.query<
        QueryResponse<TGetEmailConfigResponse>,
        void
      >({
        query: () => ({
          url: `${emailConfigEndpoint}`,
          method: 'GET',
        }),

        providesTags: (_, error) => emailConfigProvideTags(error),
      }),

      UpdateEmailConfig: builder.mutation<
        QueryResponse<void>,
        TUpdateEmailConfigParams
      >({
        query: data => ({
          url: `${emailConfigEndpoint}`,
          method: 'PUT',
          body: data,
        }),

        invalidatesTags: (_, error) => emailConfigInvalidateTags(error),
      }),
    }),
  });

export const {
  useGetAccountListQuery,
  useGetAccountDetailQuery,
  useCreateAccountMutation,
  useUpdateAccountPasswordMutation,
  useUpdateAccountMutation,
  useGetEmailConfigQuery,
  useUpdateEmailConfigMutation,
} = systemManagementQueryApi;
