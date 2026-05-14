import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import { setCurrentUser } from '@/features/auth/slice';
import type {
  TRefreshAuthTokenResponse,
  TUserInfo,
  TUserSignInPayload,
  TUserSignInSuccessResponse,
} from '@/features/auth/types';

const endpoint = '/Identity';

export const authQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [QUERY_TAGS.USER_DETAIL],
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

        providesTags: [QUERY_TAGS.USER_DETAIL],

        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            dispatch(setCurrentUser(data?.data ?? null));
          } catch (error) {
            console.error('Error: ' + error);
          }
        },
      }),

      UpdateCurrentUserProfile: builder.mutation<
        QueryResponse<TUserInfo>,
        Partial<TUserInfo>
      >({
        query: payload => ({
          url: `${endpoint}/Me`,
          method: 'PUT',
          body: payload,
        }),

        invalidatesTags: invalidatesTags([QUERY_TAGS.USER_DETAIL]),
      }),

      UpdateCurrentUserPassword: builder.mutation<
        QueryResponse<TUserInfo>,
        {
          currentPassword: string;
          newPassword: string;
        }
      >({
        query: payload => ({
          url: `${endpoint}/Me/ChangePassword`,
          method: 'POST',
          body: payload,
        }),

        invalidatesTags: invalidatesTags([QUERY_TAGS.USER_DETAIL]),
      }),

      refreshAuthToken: builder.mutation<
        QueryResponse<TRefreshAuthTokenResponse>,
        string
      >({
        query: refreshToken => ({
          url: `${endpoint}/Refresh`,
          method: 'POST',
          body: { refreshToken: refreshToken },
        }),
        extraOptions: {
          maxRetries: 0,
        },
      }),

      revokeAuthToken: builder.mutation({
        query: refreshToken => ({
          url: `${endpoint}/Refresh/Revoke`,
          method: 'POST',
          body: { refreshToken: refreshToken },
        }),
      }),
    }),
  });

export const {
  useSignInUserMutation,
  useGetCurrentUserQuery,
  useRevokeAuthTokenMutation,
  useRefreshAuthTokenMutation,
  useLazyGetCurrentUserQuery,
  useUpdateCurrentUserProfileMutation,
  useUpdateCurrentUserPasswordMutation,
} = authQueryApi;
