import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { Button } from '@/components/ui/button';
import { TourList } from '@/features/tour-management/components/tour/tour-list';
import { tourManagementPaths } from '@/features/tour-management/routes';
import { useNavigate } from 'react-router-dom';

export const TourListPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHelmet title="Danh sách tour" />
      <AppPageHeader
        title="Danh sách tour"
        addon={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={'default'}
              onClick={() => navigate(tourManagementPaths.createTour.fullPath)}
            >
              Thêm mới
            </Button>
          </div>
        }
      />
      <TourList />
    </>
  );
};
