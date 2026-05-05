/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { isNumeric } from '@/lib/helpers/number';

const checkValidDateString = (value: any): value is string => {
  const vnmDateTimeFormatRegexPattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return typeof value === 'string' && vnmDateTimeFormatRegexPattern.test(value);
};

export const normalizeQueryParamValue = (value: any) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (typeof value === 'string' && isNumeric(value)) {
    return Number(value);
  } else if (typeof value === 'string' && checkValidDateString(value)) {
    return dayjs(value, DEFAULT_DATE_FORMAT);
  } else if (Array.isArray(value) && value.every(checkValidDateString)) {
    return value.map(v => dayjs(v, DEFAULT_DATE_FORMAT));
  } else {
    return value;
  }
};
