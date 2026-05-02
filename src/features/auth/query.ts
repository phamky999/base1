import { baseApi } from '@/app/redux/baseApi';
import { QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import type {
  TUserInfo,
  TUserSignInPayload,
  TUserSignInSuccessResponse,
} from '@/features/auth/types';

const endpoint = '/UserAuth';

export const authQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [QUERY_TAGS.UserDetail],
  })
  .injectEndpoints({
    endpoints: builder => ({
      SignInUser: builder.mutation<
        QueryResponse<TUserSignInSuccessResponse>,
        TUserSignInPayload
      >({
        query: payload => ({
          url: `${endpoint}/Authenticate`,
          method: 'POST',
          body: payload,
        }),
      }),

      GetCurrentUser: builder.query<QueryResponse<TUserInfo>, void>({
        query: () => ({
          url: `${endpoint}/Me`,
          method: 'GET',
        }),
        providesTags: [QUERY_TAGS.UserDetail],
      }),

      refreshAuthToken: builder.mutation({
        query: refreshToken => ({
          url: `${endpoint}/Refresh`,
          method: 'POST',
          body: { refreshToken: refreshToken },
        }),
        extraOptions: {
          maxRetries: 0,
        },
      }),
    }),
  });

export const {
  useSignInUserMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} = authQueryApi;
