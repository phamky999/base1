import { baseApi } from '@/app/redux/baseApi';
import type { QueryResponse } from '@/app/redux/types';
import {
  merchantCredentialChangeInvalidateTags,
  merchantCreateInvalidateTags,
  merchantCredentialsProvideTags,
  merchantDetailProvideTags,
  merchantListProvideTags,
  merchantUpdateInvalidateTags,
} from '@/features/merchant-management/query.helpers';
import { MERCHANT_MANAGEMENT_TAGS } from '@/features/merchant-management/query.tags';
import type {
  TCreateMerchantParams,
  TGenerateMerchantCredentialResponse,
  TGetMerchantCredentialResponse,
  TGetMerchantDetailResponse,
  TGetMerchantListResponse,
  TGetMerchantParams,
  TMerchantListItem,
  TUpdateMerchantParams,
} from '@/features/merchant-management/types';

const merchantEndpoint = '/Providers/Merchants';

export const merchantManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(MERCHANT_MANAGEMENT_TAGS),
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetMerchantList: builder.query<
        QueryResponse<TGetMerchantListResponse>,
        TGetMerchantParams
      >({
        query: (params: TGetMerchantParams) => ({
          url: `${merchantEndpoint}`,
          method: 'GET',
          params,
        }),

        providesTags: (result, error) =>
          merchantListProvideTags(result, error),
      }),

      GetMerchantDetail: builder.query<
        QueryResponse<TGetMerchantDetailResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}`,
          method: 'GET',
        }),

        providesTags: (_, error, { id }) =>
          merchantDetailProvideTags(error, id),
      }),

      GetMerchantCredentials: builder.query<
        QueryResponse<TGetMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials`,
          method: 'GET',
        }),

        providesTags: (_, error, { id }) =>
          merchantCredentialsProvideTags(error, id),
      }),

      GenerateMerchantCredential: builder.mutation<
        QueryResponse<TGenerateMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials/Generate`,
          method: 'POST',
        }),

        invalidatesTags: (_, error, { id }) =>
          merchantCredentialChangeInvalidateTags(error, id),
      }),

      RegenerateMerchantCredential: builder.mutation<
        QueryResponse<TGenerateMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials/Regenerate`,
          method: 'POST',
        }),

        invalidatesTags: (_, error, { id }) =>
          merchantCredentialChangeInvalidateTags(error, id),
      }),

      CreateMerchant: builder.mutation<
        QueryResponse<TMerchantListItem>,
        TCreateMerchantParams
      >({
        query: data => ({
          url: `${merchantEndpoint}/Add`,
          method: 'POST',
          body: data,
        }),

        invalidatesTags: (_, error) =>
          merchantCreateInvalidateTags(error),
      }),

      UpdateMerchant: builder.mutation<
        QueryResponse<TMerchantListItem>,
        TUpdateMerchantParams
      >({
        query: ({ id, ...rest }) => ({
          url: `${merchantEndpoint}/Update/${id}`,
          method: 'PUT',
          body: { ...rest },
        }),

        invalidatesTags: (_, error, { id }) =>
          merchantUpdateInvalidateTags(error, id),
      }),
    }),
  });

export const {
  useGetMerchantListQuery,
  useGetMerchantDetailQuery,
  useGetMerchantCredentialsQuery,
  useCreateMerchantMutation,
  useUpdateMerchantMutation,
  useGenerateMerchantCredentialMutation,
  useRegenerateMerchantCredentialMutation,
} = merchantManagementQueryApi;
