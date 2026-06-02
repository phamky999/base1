import { AppTable } from '@/components/app-table';
import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { TicketConditionForm } from '@/features/flight-management/components/ticket-condition/ticket-condition-form';
import {
  useDeleteFareRuleMutation,
  useGetFareRulesQuery,
} from '@/features/flight-management/query';
import type { TGetFareRulesResponse } from '@/features/flight-management/types';
import { Modal, type TableProps } from 'antd';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

export const TicketConditionList = () => {
  const [selectedTicketConditionId, setSelectedTicketConditionId] = useState<
    string | null
  >(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const { data, isFetching } = useGetFareRulesQuery();

  const [deleteFareRuleFn, { isLoading: isDeleting }] =
    useDeleteFareRuleMutation();

  const fareRules = data?.data ?? [];

  const handleDeleteFareRule = useCallback(
    (id: string) => {
      Modal.confirm({
        icon: null,
        title: 'Xoá bộ điều kiện vé',
        content: 'Bạn có chắc chắn muốn xoá bộ điều kiện vé này?',
        okText: 'Xoá',
        cancelText: 'Huỷ',
        onOk: async () => {
          try {
            await deleteFareRuleFn(id).unwrap();
            toast.success('Xoá bộ điều kiện vé thành công');
          } catch (error) {
            console.error(error);
          }
        },
        okButtonProps: {
          loading: isDeleting,
          danger: true,
        },
        cancelButtonProps: {
          disabled: isDeleting,
        },
      });
    },
    [deleteFareRuleFn, isDeleting]
  );

  const columns = useMemo(
    (): TableProps<TGetFareRulesResponse[number]>['columns'] => [
      {
        title: 'Tên bộ điều kiện',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width: 250,
      },
      {
        title: 'Mã hãng bay',
        dataIndex: 'airlineCode',
        key: 'airlineCode',
        width: 160,
      },

      {
        title: 'Tác vụ',
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
          <>
            <AppTooltip content="Chỉnh sửa">
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  setSelectedTicketConditionId(record.id);
                  setIsAddEditModalOpen(true);
                }}
              >
                <PenSquareIcon />
              </Button>
            </AppTooltip>

            <AppTooltip content="Xoá">
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => handleDeleteFareRule(record.id)}
              >
                <Trash2Icon />
              </Button>
            </AppTooltip>
          </>
        ),
      },
    ],
    [handleDeleteFareRule]
  );

  return (
    <>
      <div className="space-y-6">
        <AppTable
          rowKey={record => record.id}
          columns={columns}
          dataSource={fareRules}
          totalCount={fareRules.length}
          isShowSkeleton={isFetching}
        />
      </div>

      <TicketConditionForm
        selectedId={selectedTicketConditionId}
        open={isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
      />
    </>
  );
};
