import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  EMPTY_DATE_TIME_PLACEHOLDER,
} from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { Dayjs } from 'dayjs';

type AppDateTimeLabelProps = {
  value?: string | Dayjs;
  showTime?: boolean;
};

export const AppDateTimeLabel = ({
  value,
  showTime = true,
}: AppDateTimeLabelProps) => {
  if (!value || !dayjs(value).isValid()) return EMPTY_DATE_TIME_PLACEHOLDER;
  return (
    <span>
      {showTime && (
        <>
          <span className="font-semibold">
            {dayjs(value).format(DEFAULT_TIME_FORMAT)}
          </span>{' '}
          {' - '}
        </>
      )}

      {dayjs(value).format(DEFAULT_DATE_FORMAT)}
    </span>
  );
};
