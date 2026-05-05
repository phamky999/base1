import { PageHelmet } from '@/components/app-helmet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export const PortalPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageHelmet title="Trang chủ" />
      <div className="flex gap-4">
        <Button onClick={() => toast.success('Success!')}>Success</Button>
        <Button onClick={() => toast.error('Error!')} variant={'destructive'}>
          Error
        </Button>
        <Button
          onClick={() => toast.info('Info!')}
          variant={'outline'}
          loading={loading}
        >
          Info
        </Button>
        <Button onClick={() => toast.warning('Warning!')} variant={'link'}>
          Warning
        </Button>
        <Button onClick={() => setLoading(prev => !prev)}>set Loading</Button>
        <Button variant={'default'} loading={loading}>
          Fetching
        </Button>
      </div>
      <div>Welcome ...</div>
    </>
  );
};
