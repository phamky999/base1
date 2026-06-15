import { Skeleton } from '@/components/ui/skeleton';
import { useGetMerchantDetailQuery } from '@/features/merchant-management/query';
import { cn } from '@/lib/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { Tag } from 'antd';

const InfoItem = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      {loading ? (
        <Skeleton className="h-6.5 w-24" />
      ) : (
        <div className="font-semibold">{value}</div>
      )}
    </div>
  );
};

export const MerchantInfoCard = ({
  merchantId,
  className,
}: {
  merchantId?: string;
  className?: string;
}) => {
  const queryArg = !merchantId ? skipToken : { id: String(merchantId) };

  const { data, isFetching } = useGetMerchantDetailQuery(queryArg);

  if (!merchantId) return null;

  const detail = data?.data;

  const stats = [
    {
      label: 'Mã kênh bán',
      value: detail?.merchantCode,
    },
    {
      label: 'Tên kênh bán',
      value: detail?.name,
    },
    {
      label: 'Email',
      value: detail?.email,
    },
    {
      label: 'Số điện thoại',
      value: detail?.phone,
    },
    {
      label: 'Trạng thái',
      value: (
        <Tag
          className="px-2 py-0.5"
          color={detail?.isActive ? 'success' : 'error'}
          variant="outlined"
        >
          {detail?.isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
  ];

  return (
    <div className={cn('card', className)}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Thông tin kênh bán</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {stats.map(item => (
          <InfoItem
            key={item.label}
            label={item.label}
            value={item.value}
            loading={isFetching}
          />
        ))}
      </div>
    </div>
  );
};
