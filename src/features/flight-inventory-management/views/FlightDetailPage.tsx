import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { AddEditFlightForm } from '@/features/flight-inventory-management/components/AddEditFlightForm/AddEditFlightForm';
import { useParams } from 'react-router-dom';

export const FlightDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageHelmet title="Chi tiết chuyến bay | Quản lý chuyến bay" />
      <AppPageHeader title="Chi tiết chuyến bay" />

      <AddEditFlightForm id={id} />
    </>
  );
};
