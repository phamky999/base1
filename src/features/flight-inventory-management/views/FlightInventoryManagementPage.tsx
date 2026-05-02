import { getPagePath } from '@/app/router/app-router-paths';
import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { FlightList } from '@/features/flight-inventory-management/components/FlightList';
import { FlightStatistics } from '@/features/flight-inventory-management/components/FlightStatistics';
import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FlightInventoryManagementPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHelmet title="Quản lý chuyến bay" />
      <AppPageHeader
        title="Quản lý chuyến bay"
        addon={
          <div className="flex justify-end gap-4">
            <Button
              type="primary"
              icon={<PlusIcon className="size-4" />}
              onClick={() => navigate(getPagePath('createFlightPage'))}
            >
              Thêm mới
            </Button>
          </div>
        }
      />
      <div className="space-y-6">
        <FlightStatistics />
        <FlightList />
      </div>
    </>
  );
};
