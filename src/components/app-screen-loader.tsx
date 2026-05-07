import { cn } from '@/lib/utils';

type ScreenLoaderProps = {
  isFullScreen?: boolean;
  className?: string;
};

export const AppScreenLoader = ({
  isFullScreen = true,
  className,
}: ScreenLoaderProps) => {
  return (
    <div
      className={cn(
        isFullScreen
          ? 'fixed top-0 left-0 z-999999 h-screen w-screen'
          : 'min-h-[80dvh] w-full',
        'flex items-center justify-center bg-transparent!',
        className
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-primary border-t-transparent',
          isFullScreen ? 'h-12 w-12 border-4' : 'h-8 w-8 border-3'
        )}
      />
    </div>
  );
};
