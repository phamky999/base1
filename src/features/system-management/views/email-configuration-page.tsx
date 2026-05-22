import { EmailConfig } from '@/features/system-management/components/email-config/email-config';
import { Helmet } from 'react-helmet-async';

export const EmailConfigurationPage = () => {
  return (
    <>
      <Helmet>
        <title>Cấu hình Email </title>
      </Helmet>
      <div className="flex h-full flex-col md:p-6">
        <div className="flex-1">
          <EmailConfig />
        </div>
      </div>
    </>
  );
};
