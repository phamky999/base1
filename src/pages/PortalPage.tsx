import { PageHelmet } from '@/components/app-helmet';
import { AppLunarDatePicker } from '@/components/app-lunar-date-picker';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const PortalPage = () => {
  return (
    <>
      <PageHelmet title="Trang chủ" />
      <div className="">Welcome ...</div>
      <AppLunarDatePicker />
      <LoginForm />
    </>
  );
};
