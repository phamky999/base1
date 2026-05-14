import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { FlightBookingList } from '@/features/flight-management/components/flight-booking/booking-list';
import { FlightBookingListFilter } from '@/features/flight-management/components/flight-booking/booking-list-filter';

export const FlightBookingListPage = () => {
  return (
    <>
      <PageHelmet title="Danh sách đơn hàng | Kho vé máy bay" />
      <AppPageHeader title="Danh sách đơn hàng" />
      <div className="space-y-6">
        <FlightBookingListFilter />
        {/* {!!flightId && <BookingFlightInfo />} */}
        {/* <FlightBookingStatistics /> */}
        <FlightBookingList />
      </div>
    </>
  );
};
