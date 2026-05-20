import { TOKEN } from '@/lib/constants';
import type { ObjectType } from '@/lib/types';
import { clearAuthToken, getAuthToken, setAuthToken } from '@/lib/utils';
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { toast } from 'sonner';

const baseApiURL = import.meta.env.VITE_APP_API_URL;
const refreshTokenAPIEndpoint = '/Identity/Refresh';
const RTKRefreshTokenEndpoint = 'refreshAuthToken';
const RTKSignInUserEndpoint = 'SignInUser';

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiURL,
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = getAuthToken(TOKEN.ACCESS_TOKEN);
    if (accessToken && endpoint !== RTKRefreshTokenEndpoint) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const handleLogout = (api: BaseQueryApi) => {
  clearAuthToken();
  api.dispatch(baseApi.util.resetApiState());
  api.dispatch({
    type: 'auth/logout',
  });

  window.location.href = '/auth/login';
};

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401 && api.endpoint !== RTKSignInUserEndpoint) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refresh_token = getAuthToken(TOKEN.REFRESH_TOKEN);

          if (!refresh_token) {
            handleLogout(api);
            return result;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const refreshResult: any = await baseQuery(
            {
              url: refreshTokenAPIEndpoint,
              method: 'POST',
              body: { refreshToken: refresh_token },
            },
            api,
            extraOptions
          );

          if (refreshResult.error) {
            handleLogout(api);
            return refreshResult;
          }

          const {
            accessToken,
            refreshToken,
            accessTokenExpiresIn,
            refreshTokenExpiresIn,
          } = refreshResult.data?.data || {};

          if (accessToken && refreshToken) {
            setAuthToken(TOKEN.ACCESS_TOKEN, accessToken, accessTokenExpiresIn);
            setAuthToken(
              TOKEN.REFRESH_TOKEN,
              refreshToken,
              refreshTokenExpiresIn
            );

            result = await baseQuery(args, api, extraOptions);
          } else {
            handleLogout(api);
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error('API Error: ', error);
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      const message =
        (result?.error?.data as ObjectType)?.message ||
        'Có lỗi xảy ra, vui lòn thử lại sau.';
      void toast.error(message, {
        id: message,
      });
      return result;
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
