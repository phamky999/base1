import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { FlightBookingForm } from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-booking-form';

export const FlightBookingCreatePage = () => {
  return (
    <>
      <PageHelmet title="Tạo đơn hàng | Quản lý đơn hàng" />
      <AppPageHeader title="Tạo đơn hàng vé máy bay" />
      <FlightBookingForm />
    </>
  );
};
