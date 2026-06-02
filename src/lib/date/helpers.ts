import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  EMPTY_DATE_TIME_PLACEHOLDER,
  WEEKDAY_MAP,
} from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { FormInstance } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { RuleObject } from 'antd/es/form';
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

export const formatDateWithDayOfWeek = (date: Dayjs) => {
  const day = date.day();
  const dayOfWeek = day === 0 ? 'CN' : `Thứ ${day + 1}`;
  return `${dayOfWeek}, ${date.format(DEFAULT_DATE_FORMAT)}`;
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

type FieldType = 'START_DATE' | 'END_DATE';

type Params = {
  comparisonFieldName: string | (string | number)[];
  currentFieldType: FieldType;
  customErrorMessage?: string;
  allowSame?: boolean;
};

export const startAndEndDateValidator =
  ({
    comparisonFieldName,
    currentFieldType,
    customErrorMessage,
    allowSame = false,
  }: Params) =>
  ({ getFieldValue }: FormInstance) => ({
    validator(_: RuleObject, value?: Dayjs) {
      const comparisonValue: Dayjs | undefined =
        getFieldValue(comparisonFieldName);

      if (!value || !comparisonValue) {
        return Promise.resolve();
      }

      const isStartDate = currentFieldType === 'START_DATE';

      const isValid = isStartDate
        ? allowSame
          ? value.isSameOrBefore(comparisonValue)
          : value.isBefore(comparisonValue)
        : allowSame
          ? value.isSameOrAfter(comparisonValue)
          : value.isAfter(comparisonValue);

      if (isValid) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error(
          customErrorMessage ??
            (isStartDate
              ? 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'
              : 'Ngày kết thúc phải lớn hơn ngày bắt đầu')
        )
      );
    },
  });

export const formatDisplayDateTime = (
  date: string | Dayjs,
  displayFormat?: string
) => {
  if (!date) return EMPTY_DATE_TIME_PLACEHOLDER;

  if (!dayjs(date).isValid()) return date as string;

  return dayjs(date).format(displayFormat || DEFAULT_DATE_TIME_FORMAT);
};

type TCustomDateFormatType = 'weekday' | 'fullDateText';

type TFormatDateType = TCustomDateFormatType | string;

type TFormatDateOptions = {
  /**
   * Format của dữ liệu đầu vào
   * Ví dụ:
   * - DD/MM/YYYY
   * - YYYY-MM-DD
   */
  inputFormat?: string;

  /**
   * Format output
   *
   * Hỗ trợ:
   * - custom type:
   *    + weekday
   *    + fullDateText
   *
   * - hoặc toàn bộ format của dayjs:
   *    + DD/MM/YYYY
   *    + HH:mm
   *    + HH:mm DD/MM/YYYY
   */
  type?: TFormatDateType;
};

export const parseDisplayDate = (
  date?: string | Date | number | null | Dayjs,
  options?: TFormatDateOptions
): string => {
  if (!date) return '';

  const { inputFormat, type = DEFAULT_DATE_FORMAT } = options || {};

  const parsedDate = inputFormat ? dayjs(date, inputFormat) : dayjs(date);

  if (!parsedDate.isValid()) return '';

  switch (type) {
    case 'weekday':
      return WEEKDAY_MAP[parsedDate.day()];

    case 'fullDateText':
      return `ngày ${parsedDate.format('DD')}, tháng ${parsedDate.format(
        'MM'
      )}, năm ${parsedDate.format('YYYY')}`;

    default:
      return parsedDate.format(type);
  }
};
