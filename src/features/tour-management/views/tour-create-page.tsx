import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { TourForm } from '@/features/tour-management/components/tour/tour-form';

export const TourCreatePage = () => {
  return (
    <>
      <PageHelmet title="Thêm mới tour" />
      <AppPageHeader title="Thêm mới tour" />
      <TourForm />
    </>
  );
};
