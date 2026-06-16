import { AppTable } from '@/components/app-ui/app-table';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import { UpdateCategoryModal } from '@/features/tour-management/components/category/update-category-modal';
import {
  deleteCategory,
  useGetTourCategoryListQuery,
} from '@/features/tour-management/query';
import type { TCategoryListItem } from '@/features/tour-management/types';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { type TableProps } from 'antd';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const CategoryList = () => {
  const { getApiQueryParamsFromUrlQuery } = useQueryHandle<{
    code: string;
    name: string;
  }>();

  const params = getApiQueryParamsFromUrlQuery({
    keys: ['code', 'name'],
  });

  const { data, isFetching } = useGetTourCategoryListQuery(params);

  const items = data?.data?.categories || [];
  const totalCount = data?.data?.totalCount || 0;

  const [selectedCategory, setSelectedCategory] =
    useState<TCategoryListItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = (record: TCategoryListItem) => {
    deleteCategory(record.id);
    toast.success(`Đã xóa tuyến tour "${record.name}"`);
  };

  const columns: TableProps<TCategoryListItem>['columns'] = [
    {
      title: 'Mã tuyến',
      width: 180,
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Tên tuyến',
      width: 350,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Tác vụ',
      key: 'table_action',
      fixed: 'right',
      width: 120,
      render: (record: TCategoryListItem) => (
        <div onClick={e => e.stopPropagation()} className="flex gap-1">
          <AppTooltip content="Chỉnh sửa">
            <Button
              variant={'ghost'}
              size="icon-sm"
              onClick={() => {
                setSelectedCategory(record);
                setIsUpdateModalOpen(true);
              }}
            >
              <PenSquareIcon className="size-4" />
            </Button>
          </AppTooltip>

          <AppTooltip content="Xóa">
            <Button
              size="icon-sm"
              variant={'ghost'}
              onClick={() => handleDelete(record)}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </AppTooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <AppTable<TCategoryListItem>
        size="small"
        rowKey="id"
        dataSource={items}
        totalCount={totalCount}
        columns={columns}
        isShowSkeleton={isFetching}
        onRow={record => ({
          onClick: () => {
            setSelectedCategory(record);
            setIsUpdateModalOpen(true);
          },
          className: 'cursor-pointer',
        })}
      />

      {!!selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
        />
      )}
    </>
  );
};
