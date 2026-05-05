import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { AddEditFlightForm } from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form';

export const CreateFlightPage = () => {
  return (
    <>
      <PageHelmet title="Tạo chuyến bay | Danh sách chuyến bay" />
      <AppPageHeader title="Tạo chuyến bay" />
      <AddEditFlightForm />
    </>
  );
};
