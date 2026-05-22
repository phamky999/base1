import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { CreateMerchantModal } from '@/features/merchant-management/components/create-merchant-modal';
import { MerchantList } from '@/features/merchant-management/components/merchant-list';
import { PlusIcon } from 'lucide-react';
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
              <PlusIcon className="mr-2 size-4" />
              Thêm mới
            </Button>
          </div>
        }
      />

      <MerchantList />

      <CreateMerchantModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  );
};
