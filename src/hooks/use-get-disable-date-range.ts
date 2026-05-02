import dayjs from '@/lib/date/dayjs-config';
import { Form } from 'antd';
import { type RangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
import { useCallback } from 'react';

const { useFormInstance, useWatch } = Form;

/** Note: Hook trả về ant design DatePicker disabledDate, dùng trong form có 2 field formDate - toDate */
export const useGetDisableDateRange = (
  fromDateFormFieldName = 'fromDate',
  toDateFormFieldName = 'toDate'
) => {
  const form = useFormInstance();
  const watchedValues = useWatch([], form);

  const fromDate = watchedValues?.[fromDateFormFieldName];
  const toDate = watchedValues?.[toDateFormFieldName];

  const disabledFromDate: RangePickerProps['disabledDate'] = useCallback(
    (day: Dayjs) => {
      return Boolean(
        day &&
        (day.isAfter(dayjs(), 'day') ||
          (toDate && day.isAfter(dayjs(toDate), 'day')))
      );
    },
    [toDate]
  );

  const disabledToDate: RangePickerProps['disabledDate'] = useCallback(
    (day: Dayjs) => {
      return Boolean(
        day &&
        (day.isAfter(dayjs(), 'day') ||
          (fromDate && day.isBefore(dayjs(fromDate), 'day')))
      );
    },
    [fromDate]
  );

  return {
    disabledFromDate,
    disabledToDate,
  };
};
