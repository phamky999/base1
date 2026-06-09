import dayjs from '@/lib/date/dayjs-config';
import { SSF, type WorkSheet } from 'xlsx';

/**
 * XLSX cell
 * cell.w = formatted text excel display
 * cell.v = raw value
 */

const normalizeCellValue = (value: unknown, format?: string) => {
  //null | undefined
  if (value == null) return '';

  // excel date number
  if (typeof value === 'number' && format) {
    const date = SSF.parse_date_code(value);

    if (date) {
      return dayjs(
        new Date(date.y, date.m - 1, date.d, date.H, date.M, date.S)
      ).format(format);
    }
  }

  return String(value).trim();
};

const getCell = (sheet: WorkSheet, address: string) => {
  return sheet[address];
};

export const getCellString = (
  sheet: WorkSheet,
  address: string,
  format?: string
) => {
  const cell = getCell(sheet, address);

  if (!cell) return '';

  if (cell.w) {
    return String(cell.w).trim();
  }

  return normalizeCellValue(cell.v, format);
};

export const getCellNumber = (sheet: WorkSheet, address: string) => {
  const cell = getCell(sheet, address);

  if (!cell) return 0;

  return Number(cell.v || 0);
};

// FORMAT EXCEL TIME TO HH:MM
export const getCellTimeOnly = (sheet: WorkSheet, address: string): string => {
  const cell = getCell(sheet, address);
  if (!cell) return '';

  const raw = cell.w ?? cell.v;
  if (raw == null) return '';

  const str = String(raw).trim();
  const match = str.match(/^(\d{1,2}):(\d{1,2})/);
  if (!match) return '';
  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    return '';
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// FORMAT EXCEL DATE TO DD/MM/YYYY
export const getCellDateOnly = (sheet: WorkSheet, address: string): string => {
  const cell = getCell(sheet, address);
  if (!cell) return '';

  const raw = cell.w ?? cell.v;

  if (raw == null) return '';

  if (raw instanceof Date) {
    const day = String(raw.getDate()).padStart(2, '0');
    const month = String(raw.getMonth() + 1).padStart(2, '0');
    const year = raw.getFullYear();

    return `${day}/${month}/${year}`;
  }

  if (typeof raw === 'number') {
    const parsed = SSF.parse_date_code(raw);

    if (parsed) {
      const day = String(parsed.d).padStart(2, '0');
      const month = String(parsed.m).padStart(2, '0');
      const year = parsed.y;

      return `${day}/${month}/${year}`;
    }

    return '';
  }

  const str = String(raw).trim();

  // DD/MM/YYYY or D/M/YY
  let match = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);

  if (match) {
    let year = match[3];

    if (year.length === 2) {
      year = `20${year}`;
    }

    return `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
  }

  // YYYY/MM/DD or YY/MM/DD
  match = str.match(/^(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})$/);

  if (match) {
    let year = match[1];

    if (year.length === 2) {
      year = `20${year}`;
    }

    return `${match[3].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
  }

  return '';
};

export const parseExcelDateTimeToISO = ({
  dateStr,
  timeStr,
}: {
  dateStr: string;
  timeStr: string;
}): string => {
  if (!dateStr || !timeStr) return '';

  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return '';

  const [, day, month, year] = match;
  const timeMatch = timeStr.match(/^(\d{2}):(\d{2})$/);
  if (!timeMatch) return '';

  const [, hour, min] = timeMatch;
  return `${year}-${month}-${day}T${hour}:${min}:00`;
};
