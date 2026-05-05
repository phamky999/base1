import { PageHelmet } from '@/components/app-helmet';
import { LoginForm } from '@/features/auth/components/login-form';
import { ConfigProvider, theme } from 'antd';

export const LoginPage = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <PageHelmet title="Đăng nhập" />
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800 md:text-2xl">
        Đăng nhập
      </h1>
      <LoginForm />
    </ConfigProvider>
  );
};
