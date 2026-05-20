import { AppTable } from '@/components/app-table';
import { Button } from '@/components/ui/button';
import { USER_ROLES_LABEL } from '@/features/auth/constants';
import type { TUserRole } from '@/features/auth/types';
import { UpdateAccountModal } from '@/features/system-management/components/account-management/update-account-modal';
import { UpdateAccountPasswordModal } from '@/features/system-management/components/account-management/update-account-password-modal';
import { useGetAccountListQuery } from '@/features/system-management/query';
import type {
  TAccountListItem,
  TGetAccountListParams,
} from '@/features/system-management/types';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { type TableProps } from 'antd';
import { UserLockIcon, UserPenIcon } from 'lucide-react';
import { useState } from 'react';

export const AccountList = () => {
  const { getApiQueryParamsFromUrlQuery } =
    useQueryHandle<TGetAccountListParams>();

  const params = getApiQueryParamsFromUrlQuery({
    keys: ['username', 'email', 'phone', 'displayName'],
    noPagination: true,
  });

  const [selectedAccount, setSelectedAccount] =
    useState<TAccountListItem | null>(null);
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
    useState(false);
  const [isUpdateAccountModalOpen, setIsUpdateAccountModalOpen] =
    useState(false);

  const { data, isFetching } = useGetAccountListQuery(params);

  const items = data?.data?.users || [];

  const columns: TableProps<TAccountListItem>['columns'] = [
    {
      title: 'Tài khoản',
      width: 180,
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Tên hiển thị',
      width: 150,
      key: 'displayName',
      dataIndex: 'displayName',
    },
    {
      title: 'Email',
      width: 200,
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'SĐT',
      width: 150,
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Vai trò',
      width: 150,
      key: 'role',
      dataIndex: 'role',
      render: (role: TUserRole) => USER_ROLES_LABEL[role] || role,
    },
    {
      title: 'Trạng thái',
      width: 150,
      key: 'isActive',
      dataIndex: 'isActive',
      render: (value: boolean) => (value ? 'Hoạt động' : 'Không hoạt động'),
    },

    {
      title: 'Tác vụ',
      key: 'table_action',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (record: TAccountListItem) => (
        <>
          <Button
            title="Cập nhật tài khoản"
            variant={'ghost'}
            onClick={() => {
              setSelectedAccount(record);
              setIsUpdateAccountModalOpen(true);
            }}
          >
            <UserPenIcon className="size-4" />
          </Button>

          <Button
            title="Đặt lại mật khẩu"
            variant={'ghost'}
            onClick={() => {
              setSelectedAccount(record);
              setIsUpdatePasswordModalOpen(true);
            }}
          >
            <UserLockIcon className="size-4" />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <AppTable<TAccountListItem>
        size="small"
        rowKey="id"
        dataSource={items}
        totalCount={items?.length}
        columns={columns}
        loading={isFetching}
        pagination={false}
      />
      {!!selectedAccount && (
        <>
          <UpdateAccountPasswordModal
            account={selectedAccount}
            open={isUpdatePasswordModalOpen}
            onOpenChange={setIsUpdatePasswordModalOpen}
          />

          <UpdateAccountModal
            open={isUpdateAccountModalOpen}
            onOpenChange={setIsUpdateAccountModalOpen}
            account={selectedAccount}
          />
        </>
      )}
    </>
  );
};
