import type { TCustomFetchArgs } from '@/app/redux/types';
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
const signinAPIEndpoint = '/Identity/Authenticate';

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiURL,
  prepareHeaders: (headers, options) => {
    const { arg } = options || {};
    const accessToken = getAuthToken(TOKEN.ACCESS_TOKEN);
    if (accessToken && (arg as FetchArgs)?.url !== refreshTokenAPIEndpoint) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const handleLogout = (api: BaseQueryApi) => {
  clearAuthToken();

  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  } else {
    api.dispatch({ type: 'auth/logout' });
  }
};

const baseQueryWithInterceptor: BaseQueryFn<
  string | TCustomFetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const customConfig =
    typeof args === 'string' ? undefined : args?.extraOptions;

  const shouldHandleError = !customConfig?.skipGlobalErrorHandler;

  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
  }

  const apiEndpoint = (args as FetchArgs)?.url;
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (
      result.error.status === 401 &&
      apiEndpoint !== signinAPIEndpoint &&
      apiEndpoint !== refreshTokenAPIEndpoint
    ) {
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
      if (shouldHandleError) {
        const message =
          (result?.error?.data as ObjectType)?.message ||
          'Có lỗi xảy ra, vui lòng thử lại sau.';
        void toast.error(message, {
          id: message,
        });
      }
      return result;
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
