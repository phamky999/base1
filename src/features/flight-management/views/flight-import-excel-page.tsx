// import { Button, Upload, message } from 'antd';
// import ExcelJS from 'exceljs';
// import dayjs from 'dayjs';
// import { generateFlightTemplateExcel } from '@/features/flight-management/helper/generate-flight-template-excel';
// import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';

// type TFlightImportRow = {
//   airlineCode: string;
//   bookingCode: string;
//   seatTotal: number;
//   holdTime: number;
//   closeBeforeDays: number;
//   adultPrice: number;
//   childPrice: number;
//   infantPrice: number;
//   itinerary: string;

//   departureSegment: {
//     departureDate: string;
//     departureTime: string;
//     arrivalDate: string;
//     arrivalTime: string;
//     flightNumber: string;
//     bookingClass: string;
//     aircraft: string;
//   };

//   returnSegment: {
//     departureDate: string;
//     departureTime: string;
//     arrivalDate: string;
//     arrivalTime: string;
//     flightNumber: string;
//     bookingClass: string;
//     aircraft: string;
//   };
// };

// const COLUMN = {
//   AIRLINE_CODE: 2,
//   BOOKING_CODE: 3,
//   SEAT_TOTAL: 4,
//   HOLD_TIME: 5,
//   CLOSE_BEFORE_DAYS: 6,
//   ADULT_PRICE: 7,
//   CHILD_PRICE: 8,
//   INFANT_PRICE: 9,
//   ITINERARY: 10,

//   DEPARTURE_DATE: 11,
//   DEPARTURE_TIME: 12,
//   ARRIVAL_DATE: 13,
//   ARRIVAL_TIME: 14,
//   FLIGHT_NUMBER: 15,
//   BOOKING_CLASS: 16,
//   AIRCRAFT: 17,

//   RETURN_DEPARTURE_DATE: 18,
//   RETURN_DEPARTURE_TIME: 19,
//   RETURN_ARRIVAL_DATE: 20,
//   RETURN_ARRIVAL_TIME: 21,
//   RETURN_FLIGHT_NUMBER: 22,
//   RETURN_BOOKING_CLASS: 23,
//   RETURN_AIRCRAFT: 24,
// };

// export const FlightImportExcelPage = () => {
//   const getCellString = (row: ExcelJS.Row, index: number) => {
//     const value = row.getCell(index).value;

//     if (value == null) return '';

//     // rich text
//     if (typeof value === 'object' && value && 'text' in value) {
//       return String(value.text).trim();
//     }

//     // date
//     if (value instanceof Date) {
//       return dayjs(value).format(DEFAULT_DATE_FORMAT);
//     }

//     return String(value).trim();
//   };

//   const getCellNumber = (row: ExcelJS.Row, index: number) => {
//     const value = row.getCell(index).value;

//     if (value == null || value === '') return 0;

//     return Number(value);
//   };

//   const parseFlightSheet = (worksheet: ExcelJS.Worksheet) => {
//     const result: TFlightImportRow[] = [];

//     worksheet.eachRow((row, rowNumber) => {
//       // skip header rows
//       if (rowNumber <= 2) return;

//       // skip empty rows
//       if (rowNumber <= 2) return;

//       if (row.actualCellCount === 0) return;

//       const item: TFlightImportRow = {
//         airlineCode: getCellString(row, COLUMN.AIRLINE_CODE),

//         bookingCode: getCellString(row, COLUMN.BOOKING_CODE),

//         seatTotal: getCellNumber(row, COLUMN.SEAT_TOTAL),

//         holdTime: getCellNumber(row, COLUMN.HOLD_TIME),

//         closeBeforeDays: getCellNumber(row, COLUMN.CLOSE_BEFORE_DAYS),

//         adultPrice: getCellNumber(row, COLUMN.ADULT_PRICE),

//         childPrice: getCellNumber(row, COLUMN.CHILD_PRICE),

//         infantPrice: getCellNumber(row, COLUMN.INFANT_PRICE),

//         itinerary: getCellString(row, COLUMN.ITINERARY),

//         departureSegment: {
//           departureDate: getCellString(row, COLUMN.DEPARTURE_DATE),

//           departureTime: getCellString(row, COLUMN.DEPARTURE_TIME),

//           arrivalDate: getCellString(row, COLUMN.ARRIVAL_DATE),

//           arrivalTime: getCellString(row, COLUMN.ARRIVAL_TIME),

//           flightNumber: getCellString(row, COLUMN.FLIGHT_NUMBER),

//           bookingClass: getCellString(row, COLUMN.BOOKING_CLASS),

//           aircraft: getCellString(row, COLUMN.AIRCRAFT),
//         },

//         returnSegment: {
//           departureDate: getCellString(row, COLUMN.RETURN_DEPARTURE_DATE),

//           departureTime: getCellString(row, COLUMN.RETURN_DEPARTURE_TIME),

//           arrivalDate: getCellString(row, COLUMN.RETURN_ARRIVAL_DATE),

//           arrivalTime: getCellString(row, COLUMN.RETURN_ARRIVAL_TIME),

//           flightNumber: getCellString(row, COLUMN.RETURN_FLIGHT_NUMBER),

//           bookingClass: getCellString(row, COLUMN.RETURN_BOOKING_CLASS),

//           aircraft: getCellString(row, COLUMN.RETURN_AIRCRAFT),
//         },
//       };

//       result.push(item);
//     });

//     return result;
//   };

//   const handleImport = async (file: File) => {
//     try {
//       const buffer = await file.arrayBuffer();

//       const workbook = new ExcelJS.Workbook();

//       await workbook.xlsx.load(buffer);

//       const worksheet = workbook.getWorksheet('Danh sách chuyến bay');

//       if (!worksheet) {
//         message.error('Không tìm thấy sheet Danh sách chuyến bay');

//         return false;
//       }

//       const rows = parseFlightSheet(worksheet);

//       console.log('IMPORT DATA:', rows);

//       message.success(`Import thành công ${rows.length} dòng`);
//     } catch (error) {
//       console.error(error);

//       message.error('Đọc file excel thất bại');
//     }

//     return false;
//   };

//   return (
//     <div className="p-4">
//       <Button onClick={() => generateFlightTemplateExcel()}>
//         Download Excel mẫu
//       </Button>
//       <Upload accept=".xlsx" beforeUpload={handleImport} showUploadList={false}>
//         <Button type="primary">Import Flight Excel</Button>
//       </Upload>
//     </div>
//   );
// };

import { Button } from '@/components/ui/button';
import { generateFlightTemplateExcel } from '@/features/flight-management/helper/generate-flight-template-excel';
import { message, Upload, type UploadProps } from 'antd';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

type TFlightImportRow = {
  airlineCode: string;
  bookingCode: string;
  seatTotal: number;
  holdTime: number;
  closeBeforeDays: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  itinerary: string;

  departureSegment: {
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    bookingClass: string;
    aircraft: string;
  };

  returnSegment: {
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    bookingClass: string;
    aircraft: string;
  };
};

const COLUMN = {
  AIRLINE_CODE: 'B',
  BOOKING_CODE: 'C',
  SEAT_TOTAL: 'D',
  HOLD_TIME: 'E',
  CLOSE_BEFORE_DAYS: 'F',
  ADULT_PRICE: 'G',
  CHILD_PRICE: 'H',
  INFANT_PRICE: 'I',
  ITINERARY: 'J',

  DEPARTURE_DATE: 'K',
  DEPARTURE_TIME: 'L',
  ARRIVAL_DATE: 'M',
  ARRIVAL_TIME: 'N',
  FLIGHT_NUMBER: 'O',
  BOOKING_CLASS: 'P',
  AIRCRAFT: 'Q',

  RETURN_DEPARTURE_DATE: 'R',
  RETURN_DEPARTURE_TIME: 'S',
  RETURN_ARRIVAL_DATE: 'T',
  RETURN_ARRIVAL_TIME: 'U',
  RETURN_FLIGHT_NUMBER: 'V',
  RETURN_BOOKING_CLASS: 'W',
  RETURN_AIRCRAFT: 'X',
};

const normalizeCellValue = (value: unknown, format?: string) => {
  if (value == null) return '';

  // excel date number
  if (typeof value === 'number' && format) {
    const date = XLSX.SSF.parse_date_code(value);

    if (date) {
      return dayjs(
        new Date(date.y, date.m - 1, date.d, date.H, date.M, date.S)
      ).format(format);
    }
  }

  return String(value).trim();
};

const getCell = (sheet: XLSX.WorkSheet, address: string) => {
  return sheet[address];
};

const getCellString = (
  sheet: XLSX.WorkSheet,
  address: string,
  format?: string
) => {
  const cell = getCell(sheet, address);

  if (!cell) return '';

  /**
   * cell.w = formatted text excel display
   * cell.v = raw value
   */

  // formatted display text
  if (cell.w) {
    return String(cell.w).trim();
  }

  return normalizeCellValue(cell.v, format);
};

const getCellNumber = (sheet: XLSX.WorkSheet, address: string) => {
  const cell = getCell(sheet, address);

  if (!cell) return 0;

  return Number(cell.v || 0);
};

const beforeUploadFlightExcel: UploadProps['beforeUpload'] = async file => {
  try {
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: 'array',

      /**
       * important:
       * preserve raw excel values
       */
      raw: false,

      /**
       * preserve formatted text
       */
      cellText: true,

      /**
       * preserve date format
       */
      cellDates: true,
    });

    const sheet = workbook.Sheets['Danh sách chuyến bay'];

    if (!sheet) {
      message.error('Không tìm thấy sheet Danh sách chuyến bay');

      return false;
    }

    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');

    const rows: TFlightImportRow[] = [];

    /**
     * skip header rows
     * start row = 3
     */
    for (let rowIndex = 3; rowIndex <= range.e.r + 1; rowIndex++) {
      const airlineCode = getCellString(
        sheet,
        `${COLUMN.AIRLINE_CODE}${rowIndex}`
      );

      // skip empty row
      if (!airlineCode) continue;

      const item: TFlightImportRow = {
        airlineCode,

        bookingCode: getCellString(sheet, `${COLUMN.BOOKING_CODE}${rowIndex}`),

        seatTotal: getCellNumber(sheet, `${COLUMN.SEAT_TOTAL}${rowIndex}`),

        holdTime: getCellNumber(sheet, `${COLUMN.HOLD_TIME}${rowIndex}`),

        closeBeforeDays: getCellNumber(
          sheet,
          `${COLUMN.CLOSE_BEFORE_DAYS}${rowIndex}`
        ),

        adultPrice: getCellNumber(sheet, `${COLUMN.ADULT_PRICE}${rowIndex}`),

        childPrice: getCellNumber(sheet, `${COLUMN.CHILD_PRICE}${rowIndex}`),

        infantPrice: getCellNumber(sheet, `${COLUMN.INFANT_PRICE}${rowIndex}`),

        itinerary: getCellString(sheet, `${COLUMN.ITINERARY}${rowIndex}`),

        departureSegment: {
          departureDate: getCellString(
            sheet,
            `${COLUMN.DEPARTURE_DATE}${rowIndex}`,
            'DD/MM/YYYY'
          ),

          departureTime: getCellString(
            sheet,
            `${COLUMN.DEPARTURE_TIME}${rowIndex}`
          ),

          arrivalDate: getCellString(
            sheet,
            `${COLUMN.ARRIVAL_DATE}${rowIndex}`,
            'DD/MM/YYYY'
          ),

          arrivalTime: getCellString(
            sheet,
            `${COLUMN.ARRIVAL_TIME}${rowIndex}`
          ),

          flightNumber: getCellString(
            sheet,
            `${COLUMN.FLIGHT_NUMBER}${rowIndex}`
          ),

          bookingClass: getCellString(
            sheet,
            `${COLUMN.BOOKING_CLASS}${rowIndex}`
          ),

          aircraft: getCellString(sheet, `${COLUMN.AIRCRAFT}${rowIndex}`),
        },

        returnSegment: {
          departureDate: getCellString(
            sheet,
            `${COLUMN.RETURN_DEPARTURE_DATE}${rowIndex}`,
            'DD/MM/YYYY'
          ),

          departureTime: getCellString(
            sheet,
            `${COLUMN.RETURN_DEPARTURE_TIME}${rowIndex}`
          ),

          arrivalDate: getCellString(
            sheet,
            `${COLUMN.RETURN_ARRIVAL_DATE}${rowIndex}`,
            'DD/MM/YYYY'
          ),

          arrivalTime: getCellString(
            sheet,
            `${COLUMN.RETURN_ARRIVAL_TIME}${rowIndex}`
          ),

          flightNumber: getCellString(
            sheet,
            `${COLUMN.RETURN_FLIGHT_NUMBER}${rowIndex}`
          ),

          bookingClass: getCellString(
            sheet,
            `${COLUMN.RETURN_BOOKING_CLASS}${rowIndex}`
          ),

          aircraft: getCellString(
            sheet,
            `${COLUMN.RETURN_AIRCRAFT}${rowIndex}`
          ),
        },
      };

      rows.push(item);
    }

    console.log('IMPORT_ROWS', rows);

    message.success(`Import thành công ${rows.length} dòng`);
  } catch (error) {
    console.error(error);

    message.error('Import excel thất bại');
  }

  return false;
};

export const FlightImportExcelPage = () => {
  return (
    <div className="p-4">
      <Button onClick={() => generateFlightTemplateExcel()}>
        Download Excel mẫu
      </Button>
      <Upload
        accept=".xlsx"
        beforeUpload={beforeUploadFlightExcel}
        showUploadList={false}
      >
        <Button>Import Flight Excel</Button>
      </Upload>
    </div>
  );
};
