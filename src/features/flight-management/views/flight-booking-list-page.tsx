import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';

export const FlightBookingListPage = () => {
  return (
    <>
      <PageHelmet title="Danh sách booking | Kho vé máy bay" />
      <AppPageHeader title="Danh sách booking" />
      <div>Danh sách booking content</div>
    </>
  );
};
