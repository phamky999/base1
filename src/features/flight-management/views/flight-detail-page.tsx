import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { AddEditFlightForm } from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form';
import { useParams } from 'react-router-dom';

export const FlightDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageHelmet title="Chi tiết chuyến bay | Danh sách chuyến bay" />
      <AppPageHeader title="Chi tiết chuyến bay" />

      <AddEditFlightForm actionType="edit" id={id} />
    </>
  );
};
