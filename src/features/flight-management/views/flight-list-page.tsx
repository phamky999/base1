import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { FlightList } from '@/features/flight-management/components/flight/flight-list';
import { FlightListFilter } from '@/features/flight-management/components/flight/flight-list-filter';
import { FlightStatistics } from '@/features/flight-management/components/flight/flight-statistics';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { PlusIcon } from 'lucide-react';
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
            <Button
              variant={'default'}
              onClick={() =>
                navigate(flightManagementPaths.createFlight.fullPath)
              }
            >
              <PlusIcon className="mr-2 size-4" />
              Thêm mới
            </Button>
          </div>
        }
      />
      <div className="space-y-6">
        <FlightListFilter />
        <FlightStatistics />
        <FlightList />
      </div>
    </>
  );
};
