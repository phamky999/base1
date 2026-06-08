import { PageHelmet } from '@/components/app-ui/app-helmet';
import { LoginForm } from '@/features/auth/components/login-form';
import { ConfigProvider, theme } from 'antd';
import LogoIconImg from '@/assets/images/logo.png';

export const LoginPage = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <PageHelmet title="Đăng nhập" />
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={LogoIconImg} alt="Logo" width={48} height={48} />
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-800 md:text-2xl">
          Đăng nhập
        </h1>
      </div>
      <LoginForm />
    </ConfigProvider>
  );
};
