import { ArrowUpIcon, type LucideIcon } from 'lucide-react';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';

import { cn } from '@/lib/utils';

type StatsCardProps = {
  key: string;
  title: string;
  value: number;
  description: string;
  growth: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  chartColor: string;
  data: {
    value: number;
  }[];
};

export const ModuleStatsCard = ({
  key,
  title,
  value,
  description,
  growth,
  icon: Icon,
  iconBg,
  iconColor,
  chartColor,
  data,
}: StatsCardProps) => {
  return (
    <div className="card h-[140px]">
      <div className="flex gap-12">
        <div className="flex shrink-0 items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
              iconBg
            )}
          >
            <Icon className={cn('size-6', iconColor)} />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm text-muted-foreground">{title}</p>

            <h3 className="text-3xl font-bold">{value.toLocaleString()}</h3>

            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="h-[70px] min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${key})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
        <ArrowUpIcon className="size-4" /> {growth} so với tuần trước
      </div>
    </div>
  );
};
