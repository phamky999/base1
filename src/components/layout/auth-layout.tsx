import { AppGridShapeBackground } from '@/components/app-grid-shape-background';
import { Outlet } from 'react-router-dom';

export const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative grid h-screen w-screen items-center bg-brand-950">
      <div className="z-1 flex items-center justify-center p-4">
        <AppGridShapeBackground />
        <div className="w-full flex-col rounded-xl bg-white px-4 py-8 shadow-xl md:w-120 md:px-8">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
};
