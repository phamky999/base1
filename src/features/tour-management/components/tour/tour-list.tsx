import { AppDateTimeLabel } from '@/components/app-ui/app-date-time-label';
import { AppTable } from '@/components/app-ui/app-table';
import { useGetTourListQuery } from '@/features/tour-management/query';
import type { TTour } from '@/features/tour-management/types';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import type { TableProps } from 'antd';
import { useMemo } from 'react';

export const TourList = () => {
  const { data, isFetching } = useGetTourListQuery();

  const tourList: TTour[] = data?.data || [];

  const columns = useMemo(
    (): TableProps<TTour>['columns'] => [
      {
        title: 'Mã Tour',
        width: 150,
        dataIndex: 'id',
        key: 'id',
        render: (value: string) => <p className="font-semibold">{value}</p>,
      },
      {
        title: 'Tên Tour',
        width: 250,
        dataIndex: 'programName',
        key: 'programName',
      },
      {
        title: 'Ngày khởi hành',
        width: 150,
        dataIndex: 'departureDate',
        key: 'departureDate',
        render: (value?: string) =>
          value ? (
            <AppDateTimeLabel value={value} showTime={false} />
          ) : (
            <span className="text-gray-400">—</span>
          ),
      },
      {
        title: 'Số chỗ còn lại',
        width: 130,
        key: 'seatCount',
        render: (record: TTour) => (
          <span>{record.seatCount}</span>
        ),
      },
      {
        title: 'Số ngày',
        width: 100,
        dataIndex: 'numberOfDays',
        key: 'numberOfDays',
        align: 'center',
      },
      {
        title: 'Giá / Khách',
        width: 150,
        dataIndex: 'adultPrice',
        key: 'adultPrice',
        align: 'right',
        render: (value: number) => (
          <span className="font-semibold tabular-nums">
            {formatDisplayCurrency(value)}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <AppTable<TTour>
      size="small"
      rowKey="id"
      dataSource={tourList}
      totalCount={tourList.length}
      columns={columns}
      isShowSkeleton={isFetching}
    />
  );
};
