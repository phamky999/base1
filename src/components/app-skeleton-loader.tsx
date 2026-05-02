import { fillArrayWithNumber } from '@/lib/helpers/array';
import { Skeleton } from 'antd';

type AnimatedSkeletonLoaderProps = {
  rows?: number;
};

export const AnimatedSkeletonLoader = ({
  rows = 5,
}: AnimatedSkeletonLoaderProps) => {
  return (
    <div className="mt-4 flex flex-col gap-y-4 rounded-2xl bg-white p-4 pb-4">
      {fillArrayWithNumber(rows).map(item => (
        <Skeleton active key={item} />
      ))}
    </div>
  );
};
