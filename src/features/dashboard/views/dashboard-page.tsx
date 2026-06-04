import { PageHelmet } from '@/components/app-helmet';
import { ModuleCard } from '@/features/dashboard/components/module-card';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { MapIcon, PlaneIcon } from 'lucide-react';

export const DashboardPage = () => {
  return (
    <>
      <PageHelmet title="Trang chủ" />

      <div className="space-y-6">
        <WelcomeCard />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ModuleCard
            title="Kho vé máy bay"
            description="Quản lý chuyến bay, lịch trình  và tình trạng đặt chỗ"
            icon={PlaneIcon}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            viewListPath={flightManagementPaths.flightList.fullPath}
            createPath={flightManagementPaths.createFlight.fullPath}
            viewBookingPath={flightManagementPaths.bookingList.fullPath}
            isReleased={true}
          />
          <ModuleCard
            title="Kho tour"
            description="Quản lý tour du lịch, lịch trình  và tình trạng đặt tour"
            icon={MapIcon}
            iconBg="bg-green-50"
            iconColor="text-green-600"
            viewListPath={'#'}
            createPath={'#'}
            viewBookingPath={'#'}
            isReleased={false}
          />
        </div>
      </div>

      <div className="min-h-dvh"></div>
    </>
  );
};
