import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { BookingFlightInfo } from '@/features/flight-management/components/booking-flight-info';
import { FlightBookingList } from '@/features/flight-management/components/booking-list';
import { FlightBookingListFilter } from '@/features/flight-management/components/booking-list-filter';
import { FlightBookingStatistics } from '@/features/flight-management/components/booking-statistics';
import { useQueryHandle } from '@/hooks/use-query-handle';

export const FlightBookingListPage = () => {
  const { queryParams } = useQueryHandle();

  const flightId = (queryParams?.flightId as string) || '';

  console.log('flightId', flightId);

  return (
    <>
      <PageHelmet title="Danh sách booking | Kho vé máy bay" />
      <AppPageHeader title="Danh sách booking" />
      <div className="space-y-4">
        <FlightBookingListFilter />
        {!!flightId && <BookingFlightInfo />}
        <FlightBookingStatistics />
        <FlightBookingList />
      </div>
    </>
  );
};
