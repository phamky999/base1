import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { AccountList } from '@/features/system-management/components/account-management/account-list';
import { AccountListFilter } from '@/features/system-management/components/account-management/account-list-filter';
import { PlusIcon } from 'lucide-react';

export const AccountListPage = () => {
  return (
    <>
      <PageHelmet title="Danh sách tài khoản" />
      <AppPageHeader
        title="Danh sách tài khoản"
        addon={
          <div className="flex items-center justify-end gap-2">
            <Button variant={'default'}>
              <PlusIcon className="mr-2 size-4" />
              Thêm mới
            </Button>
            <AccountListFilter />
          </div>
        }
      />
      <div className="space-y-6">
        <AccountList />
      </div>
    </>
  );
};
