import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { getLunarDate } from '@/lib/date/convertSolarToLunar';
import dayjs from '@/lib/date/dayjs-config';
import { DatePicker, type DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';

export const AppLunarDatePicker = (props: DatePickerProps) => {
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
      <div className="ant-picker-cell-inner flex h-9 w-9 flex-col justify-center gap-0.5 p-0.75">
        <div className="flex justify-start pl-0.5 text-sm leading-3">
          {current.date()}
        </div>
        <div className="flex justify-end pr-0.5 text-[10px] leading-3">
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
      className="[&_.ant-picker-cell-selected_.highlight]:text-white!"
      format={DEFAULT_DATE_FORMAT}
      getPopupContainer={(trigger: HTMLElement) => trigger}
      cellRender={cellRender}
      {...props}
    />
  );
};
