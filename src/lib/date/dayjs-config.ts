/**
 * CONTAINING DAYJS CONFIGURATION
 * DO NOT ADD CUSTOM FUNCTIONS HERE
 */

import dayjs from 'dayjs';
import 'dayjs/locale/vi.js';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.locale('vi');

dayjs.updateLocale('vi', {
  weekStart: 1,
});

export default dayjs;
