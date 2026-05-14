import { AppGridShapeBackground } from '@/components/app-grid-shape-background';
import { AppScreenLoader } from '@/components/app-screen-loader';
import { useTokenRefresh } from '@/features/auth/hooks/use-auth';
import { TOKEN } from '@/lib/constants';
import { getAuthToken } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  const { isRefreshing, isRefreshFailed } = useTokenRefresh();

  if (isRefreshing) return <AppScreenLoader />;

  const hasAccessToken = !!getAuthToken(TOKEN.ACCESS_TOKEN);

  if (!isRefreshFailed && hasAccessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative grid h-screen w-screen items-center bg-[#90E0EF]">
      <div className="z-1 flex items-center justify-center p-4">
        <AppGridShapeBackground />
        <div className="w-full flex-col rounded-xl bg-white px-4 py-8 shadow-xl md:w-120 md:px-8">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
};
