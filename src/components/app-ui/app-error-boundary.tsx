import { Button } from '@/components/ui/button';
import type { ObjectType } from '@/lib/types';
import clsx from 'clsx';
import { useNavigate, useRouteError } from 'react-router-dom';

export const AppErrorBoundary = () => {
  const error = useRouteError();
  const isDevMode = import.meta.env.MODE === 'development';

  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-10">
      <h3 className="h3 mb-1 text-3xl font-bold">Có lỗi xảy ra!</h3>
      <p className="mb-4 text-base">Vui lòng thử lại hoặc quay về trang chủ</p>
      {isDevMode && (
        <div
          className={clsx(
            'mb-4 max-w-5xl p-4',
            'bg-error-lighter text-error',
            'border-error border',
            'text-sm wrap-break-word',
            'max-h-50 overflow-x-hidden overflow-y-auto rounded-lg'
          )}
        >
          {(error as ObjectType)?.stack}
        </div>
      )}
      <div className="flex items-center justify-center gap-x-4">
        <Button variant={'outline'} onClick={() => navigate('/')}>
          Quay lại trang chủ
        </Button>
        <Button variant={'default'} onClick={() => window.location.reload()}>
          Tải lại trang
        </Button>
      </div>
    </div>
  );
};
