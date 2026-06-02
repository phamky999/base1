import { PageHelmet } from '@/components/app-helmet';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';

// const moduleList = [
//   {
//     moduleIcon: PlaneIcon,
//     moduleName: 'vé máy bay',
//     description: 'Quản lý chuyến bay, lịch trình  và tình trạng đặt chỗ',
//     viewListPath: flightManagementPaths.flightList.fullPath,
//     createPath: flightManagementPaths.createFlight.fullPath,
//     viewBookingPath: flightManagementPaths.bookingList.fullPath,
//   },
//   {
//     moduleIcon: MapIcon,
//     moduleName: 'tour',
//     description: 'Quản lý tour du lịch, lịch trình  và tình trạng đặt tour',
//     viewListPath: '#',
//     createPath: '#',
//     viewBookingPath: '#',
//     isReleased: false,
//   },
//   {
//     moduleIcon: HotelIcon,
//     moduleName: 'khách sạn',
//     description: 'Quản lý khách sạn, phòng và tình trạng đặt phòng',
//     viewListPath: '#',
//     createPath: '#',
//     viewBookingPath: '#',
//     isReleased: false,
//   },
// ];

export const DashboardPage = () => {
  return (
    <>
      <PageHelmet title="Trang chủ" />

      <div className="space-y-4">
        <WelcomeCard />

        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {moduleList.map((item, index) => (
            <ModuleCard {...item} key={index} />
          ))}
        </div> */}
      </div>

      <div className="min-h-dvh"></div>
    </>
  );
};
