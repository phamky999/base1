import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { Button } from '@/components/ui/button';
import { AccountList } from '@/features/system-management/components/account-management/account-list';
import { AccountListFilter } from '@/features/system-management/components/account-management/account-list-filter';
import { CreateAccountModal } from '@/features/system-management/components/account-management/create-account-modal';
import { useConsumeSearchParams } from '@/hooks/use-consume-search-params';
import { useState } from 'react';

export const AccountListPage = () => {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  useConsumeSearchParams({
    key: 'action',
    value: 'create',
    onConsume: () => {
      setIsAddEditModalOpen(true);
    },
  });

  return (
    <>
      <PageHelmet title="Danh sách tài khoản" />
      <AppPageHeader
        title="Danh sách tài khoản"
        addon={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={'default'}
              onClick={() => setIsAddEditModalOpen(true)}
            >
              Thêm mới
            </Button>
            <AccountListFilter />
          </div>
        }
      />
      <div className="space-y-4">
        <AccountList />
      </div>

      <CreateAccountModal
        open={isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
      />
    </>
  );
};
