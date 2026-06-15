import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { Button } from '@/components/ui/button';
import { MerchantCreateModal } from '@/features/merchant-management/components/merchant-create-modal';
import { MerchantList } from '@/features/merchant-management/components/merchant-list';
import { useConsumeSearchParams } from '@/hooks/use-consume-search-params';
import { useState } from 'react';

export const MerchantListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useConsumeSearchParams({
    key: 'action',
    value: 'create',
    onConsume: () => {
      setIsCreateModalOpen(true);
    },
  });

  return (
    <>
      <PageHelmet title="Danh sách kênh bán" />

      <AppPageHeader
        title="Danh sách kênh bán"
        addon={
          <div className="flex justify-end gap-4">
            <Button
              variant={'default'}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Thêm mới
            </Button>
          </div>
        }
      />

      <MerchantList />

      <MerchantCreateModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  );
};
