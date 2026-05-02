import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { AddEditFlightForm } from '@/features/flight-inventory-management/components/AddEditFlightForm/AddEditFlightForm';

export const CreateFlightPage = () => {
  return (
    <>
      <PageHelmet title="Tạo chuyến bay | Quản lý chuyến bay" />
      <AppPageHeader title="Tạo chuyến bay" />
      <AddEditFlightForm />
    </>
  );
};
