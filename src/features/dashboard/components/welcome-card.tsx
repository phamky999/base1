import { useAppSelector } from '@/app/redux/hooks';
import { currentUserSelector } from '@/features/auth/selector';
import dayjs from '@/lib/date/dayjs-config';
import { parseDisplayDate } from '@/lib/date/helpers';
import { CalendarIcon } from 'lucide-react';

export const WelcomeCard = () => {
  const currentUser = useAppSelector(currentUserSelector);

  return (
    <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          Xin chào, {currentUser?.username}
        </h1>
        <p className="text-foreground">
          Chào mừng bạn đến với hệ thống quản lý kho sản phẩm
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-muted p-3">
          <CalendarIcon className="size-6 text-primary" />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {parseDisplayDate(dayjs(), {
              type: 'weekday',
            })}
          </p>
          <p className="text-foreground capitalize">
            {parseDisplayDate(dayjs(), {
              type: 'fullDateText',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
