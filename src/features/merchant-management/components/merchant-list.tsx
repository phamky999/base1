import { AppTable } from '@/components/app-table';
import { Button } from '@/components/ui/button';
import { MerchantCredentialsModal } from '@/features/merchant-management/components/merchant-credentials-modal';
import { UpdateMerchantModal } from '@/features/merchant-management/components/update-merchant-modal';
import { useGetMerchantListQuery } from '@/features/merchant-management/query';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { Tag, Tooltip, type TableProps } from 'antd';
import { KeyRoundIcon, UserPenIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export const MerchantList = () => {
  const [selectedMerchant, setSelectedMerchant] =
    useState<TMerchantListItem | null>(null);
  const [isUpdateMerchantModalOpen, setIsUpdateMerchantModalOpen] =
    useState(false);
  const [isApiInfoModalOpen, setIsApiInfoModalOpen] = useState(false);

  const { data, isFetching, isLoading } = useGetMerchantListQuery();

  const columns = useMemo(
    (): TableProps<TMerchantListItem>['columns'] => [
      {
        title: 'Mã kênh bán',
        width: 150,
        dataIndex: 'merchantCode',
        key: 'merchantCode',
        ellipsis: true,
      },
      {
        title: 'Tên kênh bán',
        width: 150,
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
      },

      {
        title: 'Email',
        width: 150,
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
      },
      {
        title: 'Số điện thoại',
        width: 150,
        dataIndex: 'phone',
        key: 'phone',
        ellipsis: true,
      },

      {
        title: 'Trạng thái',
        width: 150,
        dataIndex: 'isActive',
        key: 'isActive',
        render: (value: boolean) => (
          <Tag
            className="px-2 py-0.5"
            color={value ? 'success' : 'error'}
            variant="outlined"
          >
            {value ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        ),
      },

      {
        title: 'Tác vụ',
        key: 'table_action',
        fixed: 'right',
        width: 80,
        render: (record: TMerchantListItem) => (
          <>
            <Tooltip title="Cập nhật thông tin">
              <Button
                variant={'ghost'}
                onClick={() => {
                  setSelectedMerchant(record);
                  setIsUpdateMerchantModalOpen(true);
                }}
              >
                <UserPenIcon className="size-4" />
              </Button>
            </Tooltip>

            {!!record?.isActive && (
              <Tooltip title="Thông tin API">
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    setSelectedMerchant(record);
                    setIsApiInfoModalOpen(true);
                  }}
                >
                  <KeyRoundIcon className="size-3.5" />
                </Button>
              </Tooltip>
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <AppTable<TMerchantListItem>
        size="small"
        rowKey={record => record.id}
        dataSource={data?.data}
        totalCount={data?.data?.length}
        columns={columns}
        loading={isFetching}
        isShowSkeleton={isLoading}
        pagination={false}
      />
      {!!selectedMerchant && (
        <>
          <UpdateMerchantModal
            merchant={selectedMerchant}
            open={isUpdateMerchantModalOpen}
            onOpenChange={setIsUpdateMerchantModalOpen}
          />

          <MerchantCredentialsModal
            open={isApiInfoModalOpen}
            onOpenChange={setIsApiInfoModalOpen}
            merchant={selectedMerchant}
          />
        </>
      )}
    </>
  );
};
