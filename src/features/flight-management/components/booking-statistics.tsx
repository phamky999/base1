import { Statistic } from 'antd';
import { Card } from '@/components/ui/card';

export const BookingStatistics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <Statistic
          title="Total Bookings"
          value={12345}
          valueStyle={{ color: '#3f87ff' }}
        />
      </Card>
      <Card>
        <Statistic
          title="Revenue"
          value={12345}
          valueStyle={{ color: '#3f87ff' }}
        />
      </Card>
      <Card>
        <Statistic
          title="Canceled"
          value={12345}
          valueStyle={{ color: '#3f87ff' }}
        />
      </Card>
      <Card>
        <Statistic
          title="Refunded"
          value={12345}
          valueStyle={{ color: '#3f87ff' }}
        />
      </Card>
    </div>
  );
};
