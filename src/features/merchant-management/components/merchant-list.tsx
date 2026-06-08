import { AppTable } from '@/components/app-ui/app-table';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import { MerchantCredentialsModal } from '@/features/merchant-management/components/merchant-credentials-modal';
import { MerchantUpdateModal } from '@/features/merchant-management/components/merchant-update-modal';
import { useGetMerchantListQuery } from '@/features/merchant-management/query';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { Tag, type TableProps } from 'antd';
import { KeyRoundIcon, PenSquareIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

type MerchantListProps = {
  showInSelectMerchantDrawer?: boolean;
  showMerchantActiveOnly?: boolean;
  customOnSelectRecord?: (record: TMerchantListItem) => void;
};

export const MerchantList = ({
  showInSelectMerchantDrawer,
  showMerchantActiveOnly,
  customOnSelectRecord,
}: MerchantListProps) => {
  const [selectedMerchant, setSelectedMerchant] =
    useState<TMerchantListItem | null>(null);
  const [isUpdateMerchantModalOpen, setIsUpdateMerchantModalOpen] =
    useState(false);
  const [isApiInfoModalOpen, setIsApiInfoModalOpen] = useState(false);

  const { data, isFetching } = useGetMerchantListQuery({
    ...(showMerchantActiveOnly && { isActive: true, hasCredentials: true }),
  });

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
        align: showInSelectMerchantDrawer ? 'center' : 'left',
        width: 100,
        render: (record: TMerchantListItem) =>
          showInSelectMerchantDrawer ? (
            <Button
              variant={'outline'}
              onClick={() => customOnSelectRecord?.(record)}
            >
              Chọn
            </Button>
          ) : (
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
    [customOnSelectRecord, showInSelectMerchantDrawer]
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
      {!!selectedMerchant && !showInSelectMerchantDrawer && (
        <>
          <MerchantUpdateModal
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
