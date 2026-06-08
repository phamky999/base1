import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import { FlightList } from '@/features/flight-management/components/flight/flight-list';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { useNavigate } from 'react-router-dom';

export const FlightListPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHelmet title="Danh sách chuyến bay" />
      <AppPageHeader
        title="Danh sách chuyến bay"
        addon={
          <div className="flex justify-end gap-4">
            <AppTooltip content="Tạo mới chuyến bay từ file excel">
              <Button
                variant={'outline'}
                onClick={() =>
                  navigate(flightManagementPaths.importExcel.fullPath)
                }
              >
                Nhập Excel
              </Button>
            </AppTooltip>

            <Button
              variant={'default'}
              onClick={() =>
                navigate(flightManagementPaths.createFlight.fullPath)
              }
            >
              Thêm mới
            </Button>
          </div>
        }
      />

      <FlightList />
    </>
  );
};
