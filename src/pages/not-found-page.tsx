import { AppGridShapeBackground } from '@/components/app-ui/app-grid-shape-background';
import { PageHelmet } from '@/components/app-ui/app-helmet';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHelmet title="404" />
      <div className="relative h-svh">
        <AppGridShapeBackground />
        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="text-[7rem] leading-tight font-bold">404</h1>
          <span className="text-lg font-medium">Không tìm thấy trang!</span>
          <p className="text-center text-muted-foreground">
            Có vẻ như trang bạn đang tìm kiếm <br />
            không tồn tại hoặc đã bị xóa.
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              variant={'outline'}
              onClick={() => navigate(-1)}
              className="h-10 w-40"
            >
              Quay lại trang trước
            </Button>
            <Button
              variant={'default'}
              className="h-10 w-40"
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
