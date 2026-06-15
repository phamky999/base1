import { ModuleStatsCard } from '@/features/dashboard/components/module-stats-card';
import { HotelIcon, MapIcon, PlaneIcon } from 'lucide-react';

const chartData = [
  { value: 30 },
  { value: 55 },
  { value: 45 },
  { value: 72 },
  { value: 68 },
  { value: 88 },
  { value: 80 },
  { value: 92 },
];

export const ModuleStatsSection = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ModuleStatsCard
        key="flight"
        title="Chuyến bay"
        value={1245}
        description="đang mở bán"
        growth={120}
        icon={PlaneIcon}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        chartColor="#3b82f6"
        data={chartData}
      />

      <ModuleStatsCard
        key="hotel"
        title="Khách sạn"
        value={820}
        description="đang mở bán"
        growth={85}
        icon={HotelIcon}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
        chartColor="#a855f7"
        data={chartData}
      />

      <ModuleStatsCard
        key="tours"
        title="Tours"
        value={145}
        description="đang mở bán"
        growth={12}
        icon={MapIcon}
        iconBg="bg-green-50"
        iconColor="text-green-600"
        chartColor="#22c55e"
        data={chartData}
      />
    </div>
  );
};
