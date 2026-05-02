import { useQueryHandle } from '@/hooks/use-query-handle';
import { PAGINATION_QUERY_KEY } from '@/lib/constants';
import { Table, type TableProps } from 'antd';
import { useMemo } from 'react';

type AppTableProps<T> = TableProps<T> & {
  totalCount?: number;
};
export const AppTable = <T,>(props: AppTableProps<T>) => {
  const { totalCount, ...restProps } = props || {};
  const { handleChangePageSize, handleChangePageIndex, pagination } =
    useQueryHandle();

  const tableScrollWidth = useMemo(() => {
    const hasWidthDefined = props?.columns?.some(col => col?.width != null);
    if (!hasWidthDefined) return 'max-content';
    return props?.columns?.reduce(
      (acc, cur) => acc + ((cur?.width as number) ?? 150),
      0
    );
  }, [props.columns]);

  return (
    <Table<T>
      className="custom-ant-table"
      scroll={{ x: tableScrollWidth }}
      pagination={{
        total: totalCount ?? 0,
        current: pagination[PAGINATION_QUERY_KEY.PAGE_INDEX],
        pageSize: pagination[PAGINATION_QUERY_KEY.PAGE_SIZE],
        showSizeChanger: true,
        hideOnSinglePage: false,
        onChange: (p, ps) => {
          handleChangePageIndex(p);
          handleChangePageSize(ps);
        },
        ...restProps.pagination,
      }}
      {...restProps}
    />
  );
};
