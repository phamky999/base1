import { AppConfirmModal } from '@/components/app-ui/app-confirm-modal';
import { AppTable } from '@/components/app-ui/app-table';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import { TicketConditionForm } from '@/features/flight-management/components/ticket-condition/ticket-condition-form';
import {
  useDeleteFareRuleMutation,
  useGetFareRulesQuery,
} from '@/features/flight-management/query';
import type { TGetFareRulesResponse } from '@/features/flight-management/types';
import { type TableProps } from 'antd';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

export const TicketConditionList = () => {
  const [selectedTicketConditionId, setSelectedTicketConditionId] = useState<
    string | null
  >(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isConfirmDeleteDrawerOpen, setIsConfirmDeleteDrawerOpen] =
    useState(false);

  const { data, isFetching } = useGetFareRulesQuery();

  const [deleteFareRuleFn] = useDeleteFareRuleMutation();

  const fareRules = data?.data ?? [];

  const handleDeleteFareRule = useCallback(
    async (id: string) => {
      try {
        await deleteFareRuleFn(id).unwrap();
        toast.success('Xoá bộ điều kiện vé thành công');
      } catch (error) {
        console.error(error);
      }
    },
    [deleteFareRuleFn]
  );

  const handleViewDetail = (id: string) => {
    setSelectedTicketConditionId(id);
    setIsAddEditModalOpen(true);
  };

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
          <div onClick={e => e.stopPropagation()}>
            <AppTooltip content="Chỉnh sửa">
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => handleViewDetail(record.id)}
              >
                <PenSquareIcon />
              </Button>
            </AppTooltip>

            <AppTooltip content="Xoá">
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  setSelectedTicketConditionId(record.id);
                  setIsConfirmDeleteDrawerOpen(true);
                }}
              >
                <Trash2Icon />
              </Button>
            </AppTooltip>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="space-y-4">
        <AppTable
          rowKey={record => record.id}
          columns={columns}
          dataSource={fareRules}
          totalCount={fareRules.length}
          isShowSkeleton={isFetching}
          onRow={record => ({
            onClick: () => {
              handleViewDetail(record.id);
            },
            className: 'cursor-pointer',
          })}
        />
      </div>

      <TicketConditionForm
        selectedId={selectedTicketConditionId}
        open={isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
      />

      <AppConfirmModal
        open={isConfirmDeleteDrawerOpen}
        onOpenChange={setIsConfirmDeleteDrawerOpen}
        title="Xoá bộ điều kiện vé"
        description={`Bạn có chắc chắn muốn xoá bộ điều kiện vé này?`}
        onConfirm={() => handleDeleteFareRule(selectedTicketConditionId || '')}
        confirmButtonProps={{
          variant: 'destructive',
        }}
      />
    </>
  );
};
