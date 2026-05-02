/* eslint-disable @typescript-eslint/no-explicit-any */

import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { ObjectType } from '@/lib/types';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { ConfigType, Dayjs } from 'dayjs';

export const convertMillisecondsToDays = (milliseconds: number) =>
  milliseconds / (1000 * 60 * 60 * 24);

export const formatDisplayDate = (
  date: ConfigType,
  config?: {
    format?: string;
    timeZone?: string | null;
  }
) => {
  if (!date) return '-';

  const { format, timeZone } = config || {};

  return dayjs(date)
    .tz(timeZone || undefined)
    .format(format ?? 'MMM DD, YYYY');
};

export const formatDisplayTime = (
  dateTime: ConfigType,
  config?: {
    format?: string;
    timeZone?: string | null;
  }
) => {
  if (!dateTime) return '-';

  const { format, timeZone } = config || {};

  return dayjs(dateTime)
    .tz(timeZone || undefined)
    .format(format ?? 'h:mm A');
};

export const formatDisplayTimeAgo = (date: ConfigType, withSuffix?: boolean) =>
  date ? dayjs(date).fromNow(withSuffix) : '-';

export const getTimeDuration = (timeInMinute: number) => {
  const hours = Math.floor(timeInMinute / 60);
  const minutes = timeInMinute % 60;

  return `${hours}h${minutes}m`;
};

export const disabledPastDate: RangePickerProps['disabledDate'] = (
  day: Dayjs
) => day.isBefore(dayjs(), 'day');

export const disabledFutureDate: RangePickerProps['disabledDate'] = (
  day: Dayjs
) => day.isAfter(dayjs(), 'day');

/** Convert date in string DD/MM/YYYY to Dayjs object if found in parsed query params */
export const convertDateStringToObjectDate = (obj: ObjectType): ObjectType => {
  const isValidDateString = (value: any): value is string => {
    const vnmDateTimeFormatRegexPattern = /^\d{2}\/\d{2}\/\d{4}$/;
    return (
      typeof value === 'string' && vnmDateTimeFormatRegexPattern.test(value)
    );
  };

  const convertValue = (value: any): any => {
    if (isValidDateString(value)) {
      return dayjs(value, DEFAULT_DATE_FORMAT);
    }
    if (Array.isArray(value)) {
      return value.map(v =>
        isValidDateString(v) ? dayjs(v, DEFAULT_DATE_FORMAT) : v
      );
    }
    return value;
  };
  return Object.entries(obj).reduce<ObjectType>((result, [key, value]) => {
    result[key] = convertValue(value);
    return result;
  }, {});
};

export const formatDateWithDayOfWeek = (date: Dayjs) => {
  const day = date.day();
  const dayOfWeek = day === 0 ? 'CN' : `Thứ ${day + 1}`;
  return `${dayOfWeek}, ${date.format(DEFAULT_DATE_FORMAT)}`;
};

export const renderTableDate = (date: string | null) => {
  return date ? dayjs(date).format(DEFAULT_DATE_FORMAT) : '---';
};

export const formatDateRange = (dateRange?: [string?, string?]) => {
  if (!dateRange) return {};
  const [from, to] = dateRange;
  return {
    ...(from && {
      from: dayjs(from, DEFAULT_DATE_FORMAT).format(DEFAULT_DATE_FORMAT),
    }),
    ...(to && {
      to: dayjs(to, DEFAULT_DATE_FORMAT).format(DEFAULT_DATE_FORMAT),
    }),
  };
};
