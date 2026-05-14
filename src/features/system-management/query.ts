import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import type {
  TGetAccountListParams,
  TGetAccountListResponse,
  TUpdateAccountParams,
} from '@/features/system-management/types';

const accountEndpoint = '/Identity/Users';

export const systemManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [QUERY_TAGS.USER_MANAGEMENT_LIST],
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

        providesTags: [QUERY_TAGS.USER_MANAGEMENT_LIST],
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.USER_MANAGEMENT_LIST]),
      }),
    }),
  });

export const {
  useGetAccountListQuery,
  useUpdateAccountPasswordMutation,
  useUpdateAccountMutation,
} = systemManagementQueryApi;
