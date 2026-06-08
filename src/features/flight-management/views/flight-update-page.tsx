import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { FlightForm } from '@/features/flight-management/components/flight/flight-form/flight-form';
import { useParams } from 'react-router-dom';

export const FlightUpdatePage = () => {
  const { id } = useParams();
  return (
    <>
      <PageHelmet title="Cập nhật chuyến bay | Danh sách chuyến bay" />
      <AppPageHeader title="Cập nhật chuyến bay" />

      <FlightForm actionType="edit" id={id} />
    </>
  );
};
