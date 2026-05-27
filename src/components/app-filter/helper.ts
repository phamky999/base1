import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { isNumeric } from '@/lib/helpers/number';

const checkValidDateString = (value: unknown): value is string => {
  const vnmDateTimeFormatRegexPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return typeof value === 'string' && vnmDateTimeFormatRegexPattern.test(value);
};
export const normalizeQueryParamValue = (value: unknown): unknown => {
  if (value === 'true') return true;

  if (value === 'false') return false;

  if (value === 'null') return null;

  if (value === 'undefined') return undefined;

  if (Array.isArray(value)) {
    return value.map(normalizeQueryParamValue);
  }

  if (value && typeof value === 'object' && !dayjs.isDayjs(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        normalizeQueryParamValue(val),
      ])
    );
  }

  if (typeof value !== 'string') {
    return value;
  }

  if (isNumeric(value)) {
    return Number(value);
  }

  if (checkValidDateString(value)) {
    return dayjs(value, DEFAULT_DATE_FORMAT);
  }

  return value;
};
