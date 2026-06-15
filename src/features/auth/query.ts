import { baseApi } from '@/app/redux/baseApi';
import type { QueryResponse } from '@/app/redux/types';
import { setCurrentUser } from '@/features/auth/slice';
import {
  userDetailInvalidateTags,
  userDetailProvideTags,
} from '@/features/auth/query.helpers';
import { AUTH_MANAGEMENT_TAGS } from '@/features/auth/query.tags';
import type {
  TRefreshAuthTokenResponse,
  TUserInfo,
  TUserSignInPayload,
  TUserSignInSuccessResponse,
} from '@/features/auth/types';

const endpoint = '/Identity';

export const authQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(AUTH_MANAGEMENT_TAGS),
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

        providesTags: (_, error) => userDetailProvideTags(error),

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

        invalidatesTags: (_, error) => userDetailInvalidateTags(error),
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

        invalidatesTags: (_, error) => userDetailInvalidateTags(error),
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
