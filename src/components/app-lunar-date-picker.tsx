import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { getLunarDate } from '@/lib/date/convertSolarToLunar';
import dayjs from '@/lib/date/dayjs-config';
import { cn } from '@/lib/utils';
import { DatePicker, type DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';

export const AppLunarDatePicker = (props: DatePickerProps) => {
  const { className, ...restProps } = props || {};

  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }

    const currentDate = dayjs(current).get('date');
    const currentMonth = dayjs(current).get('month') + 1;
    const currentYear = dayjs(current).get('year');

    const currentLunarDate = getLunarDate(
      currentDate,
      currentMonth,
      currentYear
    );

    const { day, month } = currentLunarDate;

    return (
      <div className="ant-picker-cell-inner flex h-9 w-9 flex-col justify-center gap-0.5">
        <div className="flex justify-center text-sm leading-3">
          {current.date()}
        </div>
        <div className="flex justify-center text-[9px] leading-[10px]">
          {day === 1 ? (
            <span className="highlight font-semibold text-red-500">
              {day}/{month}
            </span>
          ) : (
            <span>{day}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <DatePicker
      className={cn(className)}
      classNames={{
        popup: {
          root: '[&_.ant-picker-cell]:py-0 [&_.ant-picker-cell-selected_.highlight]:text-white!',
        },
      }}
      format={DEFAULT_DATE_FORMAT}
      cellRender={cellRender}
      {...restProps}
    />
  );
};
