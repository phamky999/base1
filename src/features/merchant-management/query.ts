import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import type {
  TCreateMerchantParams,
  TGenerateMerchantCredentialResponse,
  TGetMerchantCredentialResponse,
  TGetMerchantDetailResponse,
  TGetMerchantListResponse,
  TMerchantListItem,
  TUpdateMerchantParams,
} from '@/features/merchant-management/types';

const merchantEndpoint = '/Providers/Merchants';

export const merchantManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      QUERY_TAGS.MERCHANT_LIST,
      QUERY_TAGS.MERCHANT_DETAIL,
      QUERY_TAGS.MERCHANT_CREDENTIALS,
    ],
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetMerchantList: builder.query<
        QueryResponse<TGetMerchantListResponse>,
        void
      >({
        query: () => ({
          url: `${merchantEndpoint}`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.MERCHANT_LIST],
      }),

      GetMerchantDetail: builder.query<
        QueryResponse<TGetMerchantDetailResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.MERCHANT_DETAIL],
      }),

      GetMerchantCredentials: builder.query<
        QueryResponse<TGetMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.MERCHANT_CREDENTIALS],
      }),

      GenerateMerchantCredential: builder.mutation<
        QueryResponse<TGenerateMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials/Generate`,
          method: 'POST',
        }),

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.MERCHANT_DETAIL,
          QUERY_TAGS.MERCHANT_LIST,
          QUERY_TAGS.MERCHANT_CREDENTIALS,
        ]),
      }),

      RegenerateMerchantCredential: builder.mutation<
        QueryResponse<TGenerateMerchantCredentialResponse>,
        { id: string }
      >({
        query: ({ id }) => ({
          url: `${merchantEndpoint}/${id}/Credentials/Regenerate`,
          method: 'POST',
        }),

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.MERCHANT_DETAIL,
          QUERY_TAGS.MERCHANT_LIST,
          QUERY_TAGS.MERCHANT_CREDENTIALS,
        ]),
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.MERCHANT_LIST]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.MERCHANT_DETAIL,
          QUERY_TAGS.MERCHANT_LIST,
        ]),
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
