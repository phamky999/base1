import {
  useRefreshAuthTokenMutation,
  useRevokeAuthTokenMutation,
  useGetCurrentUserQuery,
} from '@/features/auth/query';
import { TOKEN } from '@/lib/constants';
import { clearAuthToken, getAuthToken, setAuthToken } from '@/lib/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useRef, useState } from 'react';

export const useTokenRefresh = () => {
  const currentRefreshToken = getAuthToken(TOKEN.REFRESH_TOKEN);
  const hasAccessToken = !!getAuthToken(TOKEN.ACCESS_TOKEN);

  const shouldRefresh = !hasAccessToken && !!currentRefreshToken;

  const [isRefreshing, setIsRefreshing] = useState(shouldRefresh);
  const [isRefreshFailed, setIsRefreshFailed] = useState(false);

  const [refreshAuthTokenFn] = useRefreshAuthTokenMutation();
  const [revokeAuthTokenFn] = useRevokeAuthTokenMutation();

  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!shouldRefresh || hasAttempted.current) return;

    hasAttempted.current = true;

    const doRefresh = async () => {
      try {
        const response = await refreshAuthTokenFn(currentRefreshToken).unwrap();

        const {
          accessToken,
          accessTokenExpiresIn,
          refreshToken,
          refreshTokenExpiresIn,
        } = response?.data ?? {};

        if (!accessToken) throw new Error('No access token in response');

        setAuthToken(TOKEN.ACCESS_TOKEN, accessToken, accessTokenExpiresIn);
        setAuthToken(TOKEN.REFRESH_TOKEN, refreshToken, refreshTokenExpiresIn);
        setIsRefreshing(false);
      } catch {
        revokeAuthTokenFn(currentRefreshToken);
        clearAuthToken();

        setIsRefreshing(false);
        setIsRefreshFailed(true);
      }
    };

    void doRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isRefreshing, isRefreshFailed };
};

export const useAuth = () => {
  const { isRefreshing } = useTokenRefresh();
  const hasToken = !!getAuthToken(TOKEN.ACCESS_TOKEN);

  const queryArg = !hasToken || isRefreshing ? skipToken : undefined;
  const { data, isLoading, isError } = useGetCurrentUserQuery(queryArg);

  return {
    hasToken,
    isAuthenticated: hasToken && !!data?.data && !isError,
    isLoading: isRefreshing || (hasToken && isLoading),
    currentUser: data?.data ?? null,
  };
};
