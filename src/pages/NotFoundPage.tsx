import { getPagePath } from '@/app/router/app-router-paths';
import NotFoundImage from '@/assets/svgs/404.svg';
import { AppGridShapeBackground } from '@/components/app-grid-shape-background';
import { PageHelmet } from '@/components/app-helmet';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHelmet title="404" />
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
        <AppGridShapeBackground />
        <div className="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
          <img src={NotFoundImage} alt="404" />

          <p className="mt-10 mb-6 text-base text-foreground sm:text-lg">
            Trang bạn tìm kiếm không tồn tại. <br /> Vui lòng quay lại trang
            trước hoặc trở lại trang chủ.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              type="default"
              onClick={() => navigate(-1)}
              className="h-10 w-40"
            >
              Quay lại trang trước
            </Button>
            <Button
              type="primary"
              className="h-10 w-40"
              onClick={() => navigate(getPagePath('portalPage'))}
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
