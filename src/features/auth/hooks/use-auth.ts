import { useGetCurrentUserQuery } from '@/features/auth/query';
import { TOKEN } from '@/lib/constants';
import { getAuthToken } from '@/lib/utils';
import { skipToken } from '@reduxjs/toolkit/query';

export const useAuth = () => {
  const hasToken = !!getAuthToken(TOKEN.ACCESS_TOKEN);

  const queryArg = !hasToken ? skipToken : undefined;
  const { data, isLoading, isError } = useGetCurrentUserQuery(queryArg);

  return {
    hasToken,
    isAuthenticated: hasToken && !!data?.data && !isError,
    isLoading: hasToken && isLoading,
    currentUser: data?.data ?? null,
  };
};
