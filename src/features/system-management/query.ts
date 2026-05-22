import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import type {
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
    addTagTypes: [
      QUERY_TAGS.ACCOUNT_LIST,
      QUERY_TAGS.ACCOUNT_DETAIL,
      QUERY_TAGS.EMAIL_CONFIG,
    ],
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

        providesTags: [QUERY_TAGS.ACCOUNT_LIST],
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.ACCOUNT_LIST]),
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.ACCOUNT_LIST]),
      }),

      GetEmailConfig: builder.query<
        QueryResponse<TGetEmailConfigResponse>,
        void
      >({
        query: () => ({
          url: `${emailConfigEndpoint}`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.EMAIL_CONFIG],
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.EMAIL_CONFIG]),
      }),
    }),
  });

export const {
  useGetAccountListQuery,
  useCreateAccountMutation,
  useUpdateAccountPasswordMutation,
  useUpdateAccountMutation,
  useGetEmailConfigQuery,
  useUpdateEmailConfigMutation,
} = systemManagementQueryApi;
