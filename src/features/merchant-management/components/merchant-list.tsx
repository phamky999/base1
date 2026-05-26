import { AppTable } from '@/components/app-table';
import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { MerchantCredentialsModal } from '@/features/merchant-management/components/merchant-credentials-modal';
import { UpdateMerchantModal } from '@/features/merchant-management/components/update-merchant-modal';
import { useGetMerchantListQuery } from '@/features/merchant-management/query';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { Tag, type TableProps } from 'antd';
import { KeyRoundIcon, PenSquareIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export const MerchantList = () => {
  const [selectedMerchant, setSelectedMerchant] =
    useState<TMerchantListItem | null>(null);
  const [isUpdateMerchantModalOpen, setIsUpdateMerchantModalOpen] =
    useState(false);
  const [isApiInfoModalOpen, setIsApiInfoModalOpen] = useState(false);

  const { data, isFetching } = useGetMerchantListQuery();

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
        width: 100,
        render: (record: TMerchantListItem) => (
          <>
            <AppTooltip content="Cập nhật thông tin">
              <Button
                variant={'ghost'}
                onClick={() => {
                  setSelectedMerchant(record);
                  setIsUpdateMerchantModalOpen(true);
                }}
              >
                <PenSquareIcon className="size-4" />
              </Button>
            </AppTooltip>

            {!!record?.isActive && (
              <AppTooltip content="Thông tin API">
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    setSelectedMerchant(record);
                    setIsApiInfoModalOpen(true);
                  }}
                >
                  <KeyRoundIcon className="size-3.5" />
                </Button>
              </AppTooltip>
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
        isShowSkeleton={isFetching}
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
