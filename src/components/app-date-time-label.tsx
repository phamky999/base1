import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  EMPTY_DATE_TIME_PLACEHOLDER,
} from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { Dayjs } from 'dayjs';
import type { ReactElement } from 'react';

type AppDateTimeLabelProps = {
  value?: string | Dayjs;
  showTime?: boolean;
  layout?: 'vertical' | 'horizontal';
  feedback?: ReactElement | string;
};

export const AppDateTimeLabel = ({
  value,
  showTime = true,
  layout = 'horizontal',
  feedback,
}: AppDateTimeLabelProps) => {
  if (!value || !dayjs(value).isValid())
    return feedback || EMPTY_DATE_TIME_PLACEHOLDER;

  if (showTime && layout === 'vertical') {
    return (
      <div className="flex flex-col">
        <span className="font-semibold">
          {dayjs(value).format(DEFAULT_TIME_FORMAT)}
        </span>
        {dayjs(value).format(DEFAULT_DATE_FORMAT)}
      </div>
    );
  }

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
