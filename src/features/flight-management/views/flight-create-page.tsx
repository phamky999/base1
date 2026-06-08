import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { FlightForm } from '@/features/flight-management/components/flight/flight-form/flight-form';
import { useQueryHandle } from '@/hooks/use-query-handle';

export const FlightCreatePage = () => {
  const { queryParams } = useQueryHandle();
  return (
    <>
      <PageHelmet title="Tạo chuyến bay | Danh sách chuyến bay" />
      <AppPageHeader title="Tạo chuyến bay" />
      <FlightForm actionType="create" id={queryParams['duplicateId']} />
    </>
  );
};
