import { Skeleton } from '@/components/ui/skeleton';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { PAGINATION_QUERY_KEY } from '@/lib/constants';
import { fillArrayWithNumber } from '@/lib/helpers/object';
import { cn } from '@/lib/utils';
import { Table, type TableProps } from 'antd';
import { useMemo } from 'react';

type AppTableProps<T> = TableProps<T> & {
  totalCount?: number;
  isShowSkeleton?: boolean;
};

export const AppTable = <T,>(props: AppTableProps<T>) => {
  const {
    totalCount,
    isShowSkeleton,
    pagination: paginationProps,
    className: classNameProps,
    ...restProps
  } = props || {};
  const {
    handleChangePageSize,
    handleChangePageIndex,
    pagination: queryPagination,
  } = useQueryHandle();

  const tableScrollWidth = useMemo(() => {
    const hasWidthDefined = props?.columns?.some(col => col?.width != null);
    if (!hasWidthDefined) return 'max-content';
    return props?.columns?.reduce(
      (acc, cur) => acc + ((cur?.width as number) ?? 150),
      0
    );
  }, [props.columns]);

  if (isShowSkeleton) {
    const loadingCols = restProps?.columns?.map(col => {
      return {
        ...col,
        title: <Skeleton className="h-4" />,
        render: () => <Skeleton className="h-4" />,
      };
    });

    return (
      <Table<T>
        columns={loadingCols}
        className="custom-ant-table"
        scroll={{ x: tableScrollWidth }}
        pagination={false}
        rowKey="id"
        dataSource={fillArrayWithNumber(5).map(
          (_, index) => ({ id: index }) as T
        )}
      />
    );
  }

  return (
    <Table<T>
      className={cn('custom-ant-table', classNameProps)}
      scroll={{ x: tableScrollWidth }}
      pagination={
        paginationProps === false
          ? false
          : {
              total: totalCount ?? 0,
              current: queryPagination[PAGINATION_QUERY_KEY.PAGE_INDEX],
              pageSize: queryPagination[PAGINATION_QUERY_KEY.PAGE_SIZE],
              showSizeChanger: true,
              hideOnSinglePage: false,
              onChange: (p, ps) => {
                handleChangePageIndex(p);
                handleChangePageSize(ps);
              },
              ...paginationProps,
            }
      }
      {...restProps}
    />
  );
};
