import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { MerchantCreateModal } from '@/features/merchant-management/components/merchant-create-modal';
import { MerchantList } from '@/features/merchant-management/components/merchant-list';
import { useState } from 'react';

export const MerchantListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
