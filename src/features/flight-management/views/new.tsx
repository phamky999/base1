/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import {
  FARE_RULE_TYPE,
  FARE_RULE_TYPE_LABEL,
  FLIGHT_ITINERARY_TYPE,
} from '@/features/flight-management/constants';
import { generateFlightTemplateExcel } from '@/features/flight-management/helper/generate-flight-template-excel';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TCreateFlightPayload,
  TFareRuleType,
} from '@/features/flight-management/types';
import { FLIGHT_DATE_TIME_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { Regex, RegexValidationMessage } from '@/lib/validations';
import { Card, Progress, Steps, Table, Tag, Tooltip, Upload } from 'antd';
import ExcelJS from 'exceljs';
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  CheckIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  HelpCircleIcon,
  SparklesIcon,
  UploadCloudIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Helper to convert rule labels/keys to TFareRuleType
const getFareRuleType = (val: string): TFareRuleType | null => {
  const cleanVal = String(val).trim();
  if (cleanVal in FARE_RULE_TYPE) {
    return cleanVal as TFareRuleType;
  }
  for (const [key, label] of Object.entries(FARE_RULE_TYPE_LABEL)) {
    if (
      label.toLowerCase() === cleanVal.toLowerCase() ||
      key.toLowerCase() === cleanVal.toLowerCase()
    ) {
      return key as TFareRuleType;
    }
  }
  return null;
};

// Robust helper to parse serial/object/string times from Excel
const parseExcelTime = (timeCell: any): string => {
  if (!timeCell) return '';

  // If already a plain string, try to extract time directly
  if (typeof timeCell !== 'object' || timeCell === null) {
    const str = String(timeCell).trim();
    const match = str.match(/^(\d{1,2}):(\d{1,2})/);
    if (match) {
      return `${match[1].padStart(2, '0')}:${match[2].padStart(2, '0')}`;
    }
    return '';
  }

  const text = timeCell.text ? String(timeCell.text).trim() : '';
  const value = 'value' in timeCell ? timeCell.value : timeCell;

  // Prioritize raw text representation to avoid Excel auto-interpretation issues
  if (text) {
    const match = text.match(/^(\d{1,2}):(\d{1,2})/);
    if (match) {
      return `${match[1].padStart(2, '0')}:${match[2].padStart(2, '0')}`;
    }
  }

  if (value instanceof Date) {
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  if (typeof value === 'number') {
    const totalMinutes = Math.round(value * 24 * 60);
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  if (value && typeof value === 'object' && 'result' in value) {
    return parseExcelTime(value.result);
  }
  if (value !== null && value !== undefined) {
    const str = String(value).trim();
    const match = str.match(/^(\d{1,2}):(\d{1,2})/);
    if (match) {
      return `${match[1].padStart(2, '0')}:${match[2].padStart(2, '0')}`;
    }
  }
  return '';
};

// Robust helper to parse serial/object/string dates from Excel
const parseExcelDateOnly = (dateCell: any): string => {
  if (!dateCell) return '';

  // If already a plain string/number (pre-parsed), handle without 'in' operator
  if (typeof dateCell !== 'object' || dateCell === null) {
    const str = String(dateCell).trim();
    let match = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (match) {
      let year = match[3];
      if (year.length === 2) year = '20' + year;
      return `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
    match = str.match(/^(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})$/);
    if (match) {
      let year = match[1];
      if (year.length === 2) year = '20' + year;
      return `${match[3].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
    return str; // return as-is if it already looks like a date string
  }

  const text = dateCell.text ? String(dateCell.text).trim() : '';
  const value = 'value' in dateCell ? dateCell.value : dateCell;

  // Prioritize raw text representation to avoid Excel auto-interpretation/locale swaps
  if (text) {
    // Match DD/MM/YYYY or D/M/YY (supports both 2 and 4 digit years and single-digit day/month)
    let match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (match) {
      let year = match[3];
      if (year.length === 2) {
        year = '20' + year;
      }
      return `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
    // Match YYYY/MM/DD or YY/MM/DD (supports both 2 and 4 digit years and single-digit day/month)
    match = text.match(/^(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})$/);
    if (match) {
      let year = match[1];
      if (year.length === 2) {
        year = '20' + year;
      }
      return `${match[3].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
  }

  if (value instanceof Date) {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  }
  if (typeof value === 'number') {
    const epoch = Date.UTC(1899, 11, 30);
    const dateMs = epoch + value * 24 * 60 * 60 * 1000;
    const d = new Date(dateMs);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  if (dateCell && typeof dateCell === 'object' && 'result' in dateCell) {
    return parseExcelDateOnly(dateCell.result);
  }
  if (value !== null && value !== undefined) {
    const str = String(value).trim();
    // Match DD/MM/YYYY or D/M/YY (supports both 2 and 4 digit years and single-digit day/month)
    let match = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (match) {
      let year = match[3];
      if (year.length === 2) {
        year = '20' + year;
      }
      return `${match[1].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
    // Match YYYY/MM/DD or YY/MM/DD (supports both 2 and 4 digit years and single-digit day/month)
    match = str.match(/^(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})$/);
    if (match) {
      let year = match[1];
      if (year.length === 2) {
        year = '20' + year;
      }
      return `${match[3].padStart(2, '0')}/${match[2].padStart(2, '0')}/${year}`;
    }
  }
  return '';
};

// Combine date and time cells into standard ISO string format
const parseExcelDateTimeToISO = (dateCell: any, timeCell: any): string => {
  const dateStr = parseExcelDateOnly(dateCell);
  const timeStr = parseExcelTime(timeCell);
  if (!dateStr || !timeStr) return '';

  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return '';

  const [, day, month, year] = match;
  const timeMatch = timeStr.match(/^(\d{2}):(\d{2})$/);
  if (!timeMatch) return '';

  const [, hour, min] = timeMatch;
  return `${year}-${month}-${day}T${hour}:${min}:00`;
};

// Retrieve literal or formula cell values from ExcelJS
const getCellValue = (cell: ExcelJS.Cell): any => {
  const value = cell.value;
  if (value === null || value === undefined) return '';

  if (typeof value === 'object') {
    if ('result' in value) {
      return value.result;
    }
    if ('richText' in value) {
      return value.richText.map((item: any) => item.text || '').join('');
    }
    if (value instanceof Date) {
      return value;
    }
    return '';
  }
  return value;
};

// Main view page component
export const FlightImportExcelPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<'UPLOAD' | 'PREVIEW' | 'RESULT'>('UPLOAD');
  const [validatedFlights, setValidatedFlights] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'ALL' | 'VALID' | 'INVALID'>(
    'ALL'
  );

  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    fail: number;
    details: Array<{ bookingCode: string; success: boolean; error?: string }>;
  }>({ success: 0, fail: 0, details: [] });

  // 1. Validator function
  const validateFlight = (flight: any, rules: any[]): string[] => {
    const errors: string[] = [];

    if (!flight.airlineCode) errors.push('Mã hãng hàng không là bắt buộc.');
    else if (!Regex.AIRLINE_CODE.test(String(flight.airlineCode).trim())) {
      errors.push(
        `Mã hãng hàng không không hợp lệ: "${flight.airlineCode}". ${RegexValidationMessage.AIRLINE_CODE}`
      );
    }

    if (!flight.bookingCode) errors.push('Mã đặt chỗ là bắt buộc.');

    const seatTotal = Number(flight.seatTotal);
    if (
      flight.seatTotal === '' ||
      flight.seatTotal === null ||
      flight.seatTotal === undefined ||
      isNaN(seatTotal)
    ) {
      errors.push('Tổng số ghế phải là một số.');
    } else if (seatTotal <= 0) {
      errors.push('Tổng số ghế phải lớn hơn 0.');
    }

    const timeLimit = Number(flight.timeLimit);
    if (
      flight.timeLimit === '' ||
      flight.timeLimit === null ||
      flight.timeLimit === undefined ||
      isNaN(timeLimit)
    ) {
      errors.push('Thời gian giữ chỗ phải là một số.');
    } else if (timeLimit < 0) {
      errors.push('Thời gian giữ chỗ không được nhỏ hơn 0.');
    }

    const closingDays = Number(flight.closingDaysBeforeDeparture);
    if (
      flight.closingDaysBeforeDeparture === '' ||
      flight.closingDaysBeforeDeparture === null ||
      flight.closingDaysBeforeDeparture === undefined ||
      isNaN(closingDays)
    ) {
      errors.push('Đóng bán trước (ngày) phải là một số.');
    } else if (closingDays < 0) {
      errors.push('Số ngày đóng bán trước không được nhỏ hơn 0.');
    }

    const pAdult = Number(flight.priceAdult);
    const pChild = Number(flight.priceChild);
    const pInfant = Number(flight.priceInfant);

    if (
      flight.priceAdult === '' ||
      flight.priceAdult === null ||
      flight.priceAdult === undefined ||
      isNaN(pAdult) ||
      pAdult < 0
    ) {
      errors.push('Giá người lớn không hợp lệ (phải là số >= 0).');
    }
    if (
      flight.priceChild === '' ||
      flight.priceChild === null ||
      flight.priceChild === undefined ||
      isNaN(pChild) ||
      pChild < 0
    ) {
      errors.push('Giá trẻ em không hợp lệ (phải là số >= 0).');
    }
    if (
      flight.priceInfant === '' ||
      flight.priceInfant === null ||
      flight.priceInfant === undefined ||
      isNaN(pInfant) ||
      pInfant < 0
    ) {
      errors.push('Giá em bé không hợp lệ (phải là số >= 0).');
    }

    const itinerary = String(flight.itinerary || '')
      .trim()
      .toUpperCase();
    if (!itinerary) {
      errors.push('Hành trình là bắt buộc.');
    } else {
      if (itinerary.length < 6 || itinerary.length % 3 !== 0) {
        errors.push(
          'Hành trình không hợp lệ (độ dài phải là bội số của 3 và >= 6 ký tự, ví dụ HANSGN hoặc HANSGNHAN).'
        );
      } else {
        const airportCodes: string[] = [];
        for (let i = 0; i < itinerary.length; i += 3) {
          const code = itinerary.substring(i, i + 3);
          airportCodes.push(code);
          if (!Regex.AIRPORT_CODE.test(code)) {
            errors.push(`Mã sân bay "${code}" trong hành trình không hợp lệ.`);
          }
        }

        const isRoundTrip =
          airportCodes.length >= 3 &&
          airportCodes[0] === airportCodes[airportCodes.length - 1];
        const expectedItineraryType = isRoundTrip
          ? FLIGHT_ITINERARY_TYPE.ROUND_TRIP
          : FLIGHT_ITINERARY_TYPE.ONE_WAY;

        const depStartStr = parseExcelDateTimeToISO(
          flight.depDate,
          flight.depTime
        );
        const depEndStr = parseExcelDateTimeToISO(
          flight.depArrDate,
          flight.depArrTime
        );

        if (!flight.depDate || !flight.depTime || !depStartStr) {
          errors.push('Thời gian khởi hành chiều đi không hợp lệ.');
        }
        if (!flight.depArrDate || !flight.depArrTime || !depEndStr) {
          errors.push('Thời gian hạ cánh chiều đi không hợp lệ.');
        }
        if (!flight.depFlightNum) {
          errors.push('Số hiệu chuyến bay chiều đi là bắt buộc.');
        } else if (
          !Regex.FLIGHT_NUMBER.test(String(flight.depFlightNum).trim())
        ) {
          errors.push(
            `Số hiệu chuyến bay chiều đi không hợp lệ. ${RegexValidationMessage.FLIGHT_NUMBER}`
          );
        }
        if (!flight.depSeatClass) errors.push('Hạng ghế chiều đi là bắt buộc.');
        if (!flight.depPlane) errors.push('Loại máy bay chiều đi là bắt buộc.');

        if (depStartStr && depEndStr) {
          const diff = dayjs(depEndStr).diff(dayjs(depStartStr), 'minute');
          if (diff <= 0) {
            errors.push(
              'Thời gian hạ cánh chiều đi phải lớn hơn thời gian khởi hành.'
            );
          }
        }

        // Validate Return segment if round trip
        if (expectedItineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP) {
          const hasAnyReturnInfo =
            flight.retDate ||
            flight.retTime ||
            flight.retArrDate ||
            flight.retArrTime ||
            flight.retFlightNum ||
            flight.retSeatClass ||
            flight.retPlane;

          if (!hasAnyReturnInfo) {
            errors.push(
              'Chuyến bay được xác định là khứ hồi (itinerary có điểm đầu khớp điểm cuối) nhưng thiếu hoàn toàn thông tin chiều về.'
            );
          } else {
            const retStartStr = parseExcelDateTimeToISO(
              flight.retDate,
              flight.retTime
            );
            const retEndStr = parseExcelDateTimeToISO(
              flight.retArrDate,
              flight.retArrTime
            );

            if (!flight.retDate || !flight.retTime || !retStartStr) {
              errors.push('Thời gian khởi hành chiều về không hợp lệ.');
            }
            if (!flight.retArrDate || !flight.retArrTime || !retEndStr) {
              errors.push('Thời gian hạ cánh chiều về không hợp lệ.');
            }
            if (!flight.retFlightNum) {
              errors.push('Số hiệu chuyến bay chiều về là bắt buộc.');
            } else if (
              !Regex.FLIGHT_NUMBER.test(String(flight.retFlightNum).trim())
            ) {
              errors.push(
                `Số hiệu chuyến bay chiều về không hợp lệ. ${RegexValidationMessage.FLIGHT_NUMBER}`
              );
            }
            if (!flight.retSeatClass)
              errors.push('Hạng ghế chiều về là bắt buộc.');
            if (!flight.retPlane)
              errors.push('Loại máy bay chiều về là bắt buộc.');

            if (retStartStr && retEndStr) {
              const diff = dayjs(retEndStr).diff(dayjs(retStartStr), 'minute');
              if (diff <= 0) {
                errors.push(
                  'Thời gian hạ cánh chiều về phải lớn hơn thời gian khởi hành.'
                );
              }
            }

            if (depEndStr && retStartStr) {
              const diffBet = dayjs(retStartStr).diff(
                dayjs(depEndStr),
                'minute'
              );
              if (diffBet <= 0) {
                errors.push(
                  'Thời gian khởi hành chiều về phải sau thời gian hạ cánh chiều đi.'
                );
              }
            }
          }
        }
      }
    }

    if (rules && rules.length > 0) {
      rules.forEach((rule, idx) => {
        const type = getFareRuleType(rule.type);
        if (!type) {
          errors.push(
            `Điều kiện dòng ${idx + 1}: Loại điều kiện "${rule.type}" không hợp lệ.`
          );
        }
        if (!rule.text) {
          errors.push(
            `Điều kiện dòng ${idx + 1}: Nội dung điều kiện là bắt buộc.`
          );
        }
      });
    }

    return errors;
  };

  // 2. Mapper function
  const mapToCreateFlightPayload = (
    flight: any,
    rules: any[]
  ): TCreateFlightPayload => {
    const itinerary = String(flight.itinerary || '')
      .trim()
      .toUpperCase();
    const airportCodes: string[] = [];
    for (let i = 0; i < itinerary.length; i += 3) {
      airportCodes.push(itinerary.substring(i, i + 3));
    }

    const isRoundTrip =
      airportCodes.length >= 3 &&
      airportCodes[0] === airportCodes[airportCodes.length - 1];
    const itineraryType = isRoundTrip
      ? FLIGHT_ITINERARY_TYPE.ROUND_TRIP
      : FLIGHT_ITINERARY_TYPE.ONE_WAY;

    const depStart = parseExcelDateTimeToISO(flight.depDate, flight.depTime);
    const depEnd = parseExcelDateTimeToISO(
      flight.depArrDate,
      flight.depArrTime
    );
    const depDuration =
      depEnd && depStart ? dayjs(depEnd).diff(dayjs(depStart), 'minute') : 0;

    const departureSegments = [
      {
        airlineCode: String(flight.airlineCode).trim().toUpperCase(),
        startPoint: airportCodes[0],
        endPoint: airportCodes[1] || airportCodes[0],
        startDate: dayjs(depStart).format(FLIGHT_DATE_TIME_FORMAT),
        endDate: dayjs(depEnd).format(FLIGHT_DATE_TIME_FORMAT),
        flightNumber: String(flight.depFlightNum).trim().toUpperCase(),
        seatClass: String(flight.depSeatClass).trim().toUpperCase(),
        plane: String(flight.depPlane).trim(),
        duration: depDuration,
      },
    ];

    let returnSegments: any[] | undefined = undefined;
    if (itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP) {
      const retStart = parseExcelDateTimeToISO(flight.retDate, flight.retTime);
      const retEnd = parseExcelDateTimeToISO(
        flight.retArrDate,
        flight.retArrTime
      );
      const retDuration =
        retEnd && retStart ? dayjs(retEnd).diff(dayjs(retStart), 'minute') : 0;

      returnSegments = [
        {
          airlineCode: String(flight.airlineCode).trim().toUpperCase(),
          startPoint: airportCodes[1],
          endPoint: airportCodes[2] || airportCodes[0],
          startDate: dayjs(retStart).format(FLIGHT_DATE_TIME_FORMAT),
          endDate: dayjs(retEnd).format(FLIGHT_DATE_TIME_FORMAT),
          flightNumber: String(flight.retFlightNum).trim().toUpperCase(),
          seatClass: String(flight.retSeatClass).trim().toUpperCase(),
          plane: String(flight.retPlane).trim(),
          duration: retDuration,
        },
      ];
    }

    const mappedRules = (rules || []).map(r => ({
      type: getFareRuleType(r.type) || r.type,
      text: r.text,
    }));

    return {
      airlineCode: String(flight.airlineCode).trim().toUpperCase(),
      bookingCode: String(flight.bookingCode).trim().toUpperCase(),
      seatTotal: Number(flight.seatTotal),
      timeLimit: Number(flight.timeLimit),
      closingDaysBeforeDeparture: Number(flight.closingDaysBeforeDeparture),
      priceAdult: Number(flight.priceAdult),
      priceChild: Number(flight.priceChild),
      priceInfant: Number(flight.priceInfant),
      itineraryType,
      departureSegments,
      ...(returnSegments && { returnSegments }),
      fareRules: mappedRules,
    };
  };

  // Handle uploading and parsing Excel
  const handleExcelUpload = async (file: File) => {
    const loader = toast.loading('Đang đọc và kiểm tra dữ liệu Excel...', {
      duration: 10000,
    });
    try {
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const flightSheet = workbook.getWorksheet('Danh sách chuyến bay');
      const fareRuleSheet = workbook.getWorksheet('Danh sách bộ điều kiện');

      if (!flightSheet) {
        toast.error(
          'File Excel không đúng cấu trúc (thiếu sheet "Danh sách chuyến bay")'
        );
        toast.dismiss(loader);
        return false;
      }

      // Group fare rules
      const fareRulesGrouped: Record<
        string,
        Array<{ type: string; text: string }>
      > = {};
      if (fareRuleSheet) {
        fareRuleSheet.eachRow((row, rowNumber) => {
          if (rowNumber <= 1) return;
          const flightCode = getCellValue(row.getCell(1));
          const type = getCellValue(row.getCell(2));
          const text = getCellValue(row.getCell(3));

          if (flightCode) {
            const key = String(flightCode).trim();
            if (!fareRulesGrouped[key]) {
              fareRulesGrouped[key] = [];
            }
            fareRulesGrouped[key].push({
              type: type ? String(type).trim() : '',
              text: text ? String(text).trim() : '',
            });
          }
        });
      }

      // Parse flights
      const parsedFlights: any[] = [];
      flightSheet.eachRow((row, rowNumber) => {
        if (rowNumber <= 2) return; // Skip headers

        const stt = getCellValue(row.getCell(1));
        if (!stt) return; // Skip empty lines

        console.log(row.getCell(11), row.getCell(13), `row ${rowNumber}`);

        const flightRow = {
          stt: String(stt).trim(),
          airlineCode: getCellValue(row.getCell(2)),
          bookingCode: getCellValue(row.getCell(3)),
          seatTotal: getCellValue(row.getCell(4)),
          timeLimit: getCellValue(row.getCell(5)),
          closingDaysBeforeDeparture: getCellValue(row.getCell(6)),
          priceAdult: getCellValue(row.getCell(7)),
          priceChild: getCellValue(row.getCell(8)),
          priceInfant: getCellValue(row.getCell(9)),
          itinerary: getCellValue(row.getCell(10)),

          depDate: parseExcelDateOnly(row.getCell(11)),
          depTime: parseExcelTime(row.getCell(12)),
          depArrDate: parseExcelDateOnly(row.getCell(13)),
          depArrTime: parseExcelTime(row.getCell(14)),
          depFlightNum: getCellValue(row.getCell(15)),
          depSeatClass: getCellValue(row.getCell(16)),
          depPlane: getCellValue(row.getCell(17)),

          retDate: parseExcelDateOnly(row.getCell(18)),
          retTime: parseExcelTime(row.getCell(19)),
          retArrDate: parseExcelDateOnly(row.getCell(20)),
          retArrTime: parseExcelTime(row.getCell(21)),
          retFlightNum: getCellValue(row.getCell(22)),
          retSeatClass: getCellValue(row.getCell(23)),
          retPlane: getCellValue(row.getCell(24)),
        };

        const rules = fareRulesGrouped[flightRow.stt] || [];
        const errors = validateFlight(flightRow, rules);
        const isValid = errors.length === 0;
        const payload = isValid
          ? mapToCreateFlightPayload(flightRow, rules)
          : null;

        parsedFlights.push({
          id: `${flightRow.stt}-${rowNumber}-${Date.now()}`,
          rowRaw: flightRow,
          rules,
          errors,
          isValid,
          payload,
        });
      });

      console.log(parsedFlights, 'parsedFlights');

      if (parsedFlights.length === 0) {
        toast.error('Không tìm thấy dòng dữ liệu chuyến bay nào trong file.');
        toast.dismiss(loader);
        return false;
      }

      setValidatedFlights(parsedFlights);
      setStep('PREVIEW');
      toast.success(`Đã xử lý xong ${parsedFlights.length} dòng dữ liệu.`);
    } catch (err: any) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi đọc tệp Excel: ' + (err.message || ''));
    } finally {
      toast.dismiss(loader);
    }
    return false;
  };

  // Run the batch import mutations
  const handleImportSubmit = async () => {
    const validRecords = validatedFlights.filter(x => x.isValid);
    if (validRecords.length === 0) {
      toast.error('Không có dòng dữ liệu hợp lệ nào để import.');
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    const successCount = 0;
    const failCount = 0;
    const details: any[] = [];

    // for (let i = 0; i < validRecords.length; i++) {
    //   const record = validRecords[i];
    //   setImportProgress(Math.round((i / validRecords.length) * 100));
    //   try {
    //     const payload = record.payload;
    //     await createFlight(payload).unwrap();
    //     successCount++;
    //     details.push({ bookingCode: payload.bookingCode, success: true });
    //   } catch (err: any) {
    //     failCount++;
    //     const errMsg = err?.data?.message || err?.message || 'Lỗi hệ thống';
    //     details.push({
    //       bookingCode: record.rowRaw.bookingCode || `STT ${record.rowRaw.stt}`,
    //       success: false,
    //       error: errMsg,
    //     });
    //   }
    // }

    setImportProgress(100);
    setIsImporting(false);
    setImportResults({
      success: successCount,
      fail: failCount,
      details,
    });
    setStep('RESULT');
  };

  // UI calculations
  const totalCount = validatedFlights.length;
  const validCount = validatedFlights.filter(x => x.isValid).length;
  const invalidCount = totalCount - validCount;

  const filteredFlights = validatedFlights.filter(item => {
    if (filterType === 'VALID') return item.isValid;
    if (filterType === 'INVALID') return !item.isValid;
    return true;
  });

  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'isValid',
      key: 'isValid',
      width: 130,
      render: (isValid: boolean, record: any) => {
        if (isValid) {
          return (
            <Tag
              color="success"
              className="flex w-max items-center gap-1 rounded-md border-0 px-2.5 py-1 text-xs font-semibold"
            >
              <CheckIcon className="size-3.5" /> Hợp lệ
            </Tag>
          );
        }
        return (
          <Tooltip
            title={
              <div className="max-h-60 space-y-1.5 overflow-y-auto p-1">
                <p className="mb-1 border-b border-red-500/30 pb-1 text-xs font-bold text-red-200">
                  Danh sách lỗi ({record.errors.length}):
                </p>
                {record.errors.map((err: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-1 text-[11px] leading-relaxed"
                  >
                    <span>•</span> <span>{err}</span>
                  </div>
                ))}
              </div>
            }
            color="#FEF2F2"
            overlayInnerStyle={{
              color: '#991B1B',
              border: '1px solid #FCA5A5',
            }}
          >
            <Tag
              color="error"
              className="flex w-max animate-pulse cursor-help items-center gap-1 rounded-md border-0 px-2.5 py-1 text-xs font-semibold"
            >
              <AlertTriangleIcon className="size-3.5" /> {record.errors.length}{' '}
              lỗi
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'STT (Mã)',
      dataIndex: ['rowRaw', 'stt'],
      key: 'stt',
      width: 100,
      render: (text: string) => (
        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-600">
          {text}
        </span>
      ),
    },
    {
      title: 'Hãng & Đặt chỗ',
      key: 'airline_booking',
      width: 160,
      render: (record: any) => (
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-slate-800">
            {record.rowRaw.bookingCode || 'N/A'}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
            <span className="rounded bg-slate-100 px-1.5 py-0.25 font-bold text-indigo-600">
              {record.rowRaw.airlineCode || 'N/A'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Hành trình',
      key: 'itinerary',
      width: 150,
      render: (record: any) => {
        const it = String(record.rowRaw.itinerary || '').toUpperCase();
        const isRT =
          it.length >= 6 && it.substring(0, 3) === it.substring(it.length - 3);
        return (
          <div className="space-y-1">
            <div className="font-mono text-xs font-bold tracking-wider text-slate-800">
              {it || 'N/A'}
            </div>
            {it.length >= 6 ? (
              <Tag
                color={isRT ? 'geekblue' : 'orange'}
                className="rounded border-0 px-1.5 py-0 text-[10px] font-medium"
              >
                {isRT ? 'Khứ hồi' : 'Một chiều'}
              </Tag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: 'Chiều đi',
      key: 'departure',
      width: 260,
      render: (record: any) => {
        const row = record.rowRaw;
        if (!row.depDate && !row.depFlightNum)
          return (
            <span className="text-xs text-slate-400 italic">
              Không có thông tin
            </span>
          );
        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="flex items-center gap-1 text-slate-700">
              <span className="font-bold text-slate-800">
                {row.depFlightNum || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.25 font-mono text-[10px] font-bold text-slate-600">
                {row.depSeatClass || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-medium text-slate-500">
                {row.depPlane || 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-[11px] text-slate-500">
              <span>
                Khởi hành:{' '}
                <strong className="text-slate-600">
                  {row.depDate} {row.depTime}
                </strong>
              </span>
              <span>
                Hạ cánh:{' '}
                <strong className="text-slate-600">
                  {row.depArrDate} {row.depArrTime}
                </strong>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Chiều về',
      key: 'return',
      width: 260,
      render: (record: any) => {
        const row = record.rowRaw;
        const it = String(row.itinerary || '').toUpperCase();
        const isRT =
          it.length >= 6 && it.substring(0, 3) === it.substring(it.length - 3);

        if (!isRT) {
          return (
            <span className="text-xs font-semibold text-slate-300">-</span>
          );
        }

        if (!row.retDate && !row.retFlightNum) {
          return (
            <span className="flex w-max items-center gap-1 rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500 italic">
              <AlertTriangleIcon className="size-3.5" /> Thiếu chiều về
            </span>
          );
        }

        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="flex items-center gap-1 text-slate-700">
              <span className="font-bold text-slate-800">
                {row.retFlightNum || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.25 font-mono text-[10px] font-bold text-slate-600">
                {row.retSeatClass || 'N/A'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-medium text-slate-500">
                {row.retPlane || 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-[11px] text-slate-500">
              <span>
                Khởi hành:{' '}
                <strong className="text-slate-600">
                  {row.retDate} {row.retTime}
                </strong>
              </span>
              <span>
                Hạ cánh:{' '}
                <strong className="text-slate-600">
                  {row.retArrDate} {row.retArrTime}
                </strong>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Giá vé & Ghế',
      key: 'prices',
      width: 210,
      render: (record: any) => {
        const row = record.rowRaw;
        const formatPrice = (p: any) => {
          const num = Number(p);
          return isNaN(num) ? '0đ' : num.toLocaleString('vi-VN') + 'đ';
        };
        return (
          <div className="space-y-1 py-1 text-xs">
            <div className="font-medium text-slate-700">
              Số ghế:{' '}
              <span className="font-bold text-indigo-600">
                {row.seatTotal || 0}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-[10px] text-slate-500">
              <span className="flex justify-between gap-1.5">
                <span>Người lớn:</span>{' '}
                <strong className="text-slate-700">
                  {formatPrice(row.priceAdult)}
                </strong>
              </span>
              <span className="flex justify-between gap-1.5">
                <span>Trẻ em:</span>{' '}
                <strong className="text-slate-700">
                  {formatPrice(row.priceChild)}
                </strong>
              </span>
              <span className="flex justify-between gap-1.5">
                <span>Em bé:</span>{' '}
                <strong className="text-slate-700">
                  {formatPrice(row.priceInfant)}
                </strong>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Bộ điều kiện',
      key: 'conditions',
      width: 220,
      render: (record: any) => {
        const rules = record.rules || [];
        if (rules.length === 0)
          return (
            <span className="text-xs text-slate-400 italic">
              Không có điều kiện
            </span>
          );
        return (
          <div className="max-h-24 space-y-1 overflow-y-auto py-1 pr-1">
            {rules.map((r: any, i: number) => {
              const ruleType = getFareRuleType(r.type);
              return (
                <div
                  key={i}
                  className="border-b border-slate-100 pb-1 text-[10px] leading-relaxed last:border-0 last:pb-0"
                >
                  <span className="block font-bold text-indigo-600">
                    {ruleType ? FARE_RULE_TYPE_LABEL[ruleType] : r.type}:
                  </span>
                  <span className="line-clamp-2 text-slate-600">{r.text}</span>
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHelmet title="Import Excel | Kho vé máy bay" />
      <AppPageHeader
        title={
          <span className="flex items-center gap-2">
            <Button
              size={'icon-sm'}
              variant={'ghost'}
              onClick={() => {
                if (step === 'PREVIEW') setStep('UPLOAD');
                else navigate(-1);
              }}
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            Tạo chuyến bay từ Excel
          </span>
        }
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Steps navigation */}
        <div className="rounded-xl border bg-white p-6 shadow-xs">
          <Steps
            current={step === 'UPLOAD' ? 0 : step === 'PREVIEW' ? 1 : 2}
            items={[
              { title: 'Tải tệp tin mẫu & chọn file' },
              { title: 'Xem trước & kiểm tra' },
              { title: 'Hoàn tất import' },
            ]}
          />
        </div>

        {/* STEP 1: UPLOAD & INSTRUCTIONS */}
        {step === 'UPLOAD' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Drag & Drop Zone */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="overflow-hidden rounded-xl border shadow-xs">
                <div className="border-b bg-linear-to-r from-blue-50/50 to-indigo-50/50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-indigo-500 p-3 text-white">
                      <SparklesIcon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">
                        Tải lên tệp Excel
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Hệ thống tự động phân tích hành trình, tính toán thời
                        gian chặng bay và ánh xạ thông tin điều kiện vé nhanh
                        chóng.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Upload.Dragger
                    accept=".xlsx"
                    showUploadList={false}
                    beforeUpload={handleExcelUpload}
                    className="group rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-10 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/10"
                  >
                    <div className="flex flex-col items-center gap-4 py-2">
                      <div className="rounded-full border bg-white p-4 text-slate-400 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:text-indigo-500 group-hover:shadow-md">
                        <UploadCloudIcon className="size-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700">
                          Kéo thả tệp tin Excel vào đây hoặc click để chọn
                        </p>
                        <p className="text-xs text-slate-400">
                          Chỉ chấp nhận tệp định dạng .xlsx có cấu trúc 3 sheet
                        </p>
                      </div>
                    </div>
                  </Upload.Dragger>

                  <div className="mt-6 flex items-center justify-between rounded-xl border bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheetIcon className="size-6 text-emerald-500" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-700">
                          Chưa có tệp Excel đúng mẫu?
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Tải xuống tệp Excel chứa dữ liệu mẫu chuẩn của chúng
                          tôi.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={generateFlightTemplateExcel}
                      className="flex items-center gap-1.5 text-xs hover:bg-white"
                    >
                      <DownloadIcon className="size-3.5" /> Tải file mẫu
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Instructions & Guidelines */}
            <div className="space-y-6">
              <Card
                title={
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <HelpCircleIcon className="size-4 text-indigo-500" /> Hướng
                    dẫn chuẩn hóa file
                  </span>
                }
                className="rounded-xl border shadow-xs"
              >
                <div className="space-y-4">
                  <div className="space-y-1 border-b border-dashed pb-3">
                    <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Sheet 1: Danh sách chuyến bay
                    </span>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Mỗi hàng đại diện cho 1 chuyến bay. STT sẽ là Mã chuyến
                      bay làm khóa tham chiếu đến điều kiện ở Sheet 2.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-b border-dashed pb-3">
                    <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Cách tách hành trình (Itinerary)
                    </span>
                    <div className="space-y-1 rounded-lg border border-indigo-100/50 bg-indigo-50/50 p-2.5 text-xs text-slate-600">
                      <div>
                        •{' '}
                        <code className="font-mono font-bold text-indigo-700">
                          HANSGNHAN
                        </code>
                        : Khứ hồi (Chiều đi HAN-SGN, chiều về SGN-HAN)
                      </div>
                      <div>
                        •{' '}
                        <code className="font-mono font-bold text-indigo-700">
                          HANSGN
                        </code>
                        : Một chiều (Chiều đi HAN-SGN)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-dashed pb-3">
                    <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      Sheet 2: Danh sách bộ điều kiện
                    </span>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Chứa các cột:{' '}
                      <strong className="text-slate-700">Mã chuyến bay</strong>{' '}
                      (trùng STT Sheet 1),{' '}
                      <strong className="text-slate-700">Loại điều kiện</strong>{' '}
                      (Hoàn hủy, Hành lý xách tay...), và{' '}
                      <strong className="text-slate-700">Nội dung</strong>.
                    </p>
                  </div>

                  <div className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-600">
                    <strong className="flex items-center gap-1 font-bold">
                      <AlertTriangleIcon className="size-3.5" /> Lưu ý quan
                      trọng:
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Nếu hành trình được xác định là Khứ hồi nhưng người dùng
                      để trống các thông tin phần Chiều về (R đến X), hệ thống
                      sẽ báo lỗi và ngăn import dòng đó.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* STEP 2: PREVIEW & BATCH SUBMIT */}
        {step === 'PREVIEW' && (
          <div className="space-y-6">
            {/* Table Filtering & Main Container */}
            <Card className="rounded-xl border shadow-xs">
              <div className="mb-5 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Danh sách dữ liệu xem trước
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Vui lòng rà soát lại thông tin trước khi thực hiện import
                    chính thức.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mr-1 text-xs font-semibold text-slate-500">
                    Bộ lọc nhanh:
                  </span>
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-slate-700">
                    <button
                      onClick={() => setFilterType('ALL')}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${filterType === 'ALL' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Tất cả ({totalCount})
                    </button>
                    <button
                      onClick={() => setFilterType('VALID')}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${filterType === 'VALID' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Hợp lệ ({validCount})
                    </button>
                    <button
                      onClick={() => setFilterType('INVALID')}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${filterType === 'INVALID' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Không hợp lệ ({invalidCount})
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <Table
                  dataSource={filteredFlights}
                  columns={columns}
                  rowKey="id"
                  pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                  }}
                  className="custom-table"
                />
              </div>

              {/* Actions panel */}
              <div className="mt-6 flex items-center justify-between rounded-xl border bg-slate-50 p-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('UPLOAD')}
                  disabled={isImporting}
                  className="text-xs"
                >
                  Chọn file khác
                </Button>

                <div className="flex items-center gap-4">
                  {invalidCount > 0 && (
                    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-600">
                      <AlertTriangleIcon className="size-4 shrink-0" />
                      <span>
                        Có {invalidCount} dòng lỗi sẽ được bỏ qua. Hệ thống chỉ
                        import {validCount} dòng hợp lệ.
                      </span>
                    </div>
                  )}
                  <Button
                    onClick={handleImportSubmit}
                    disabled={isImporting || validCount === 0}
                    loading={isImporting}
                    className="min-w-32 bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    Import {validCount} chuyến bay
                  </Button>
                </div>
              </div>
            </Card>

            {/* Importing Progress overlay */}
            {isImporting && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
                <Card className="w-full max-w-md space-y-6 rounded-2xl border-0 p-6 text-center shadow-2xl">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      Đang import dữ liệu...
                    </h3>
                    <p className="text-xs text-slate-500">
                      Vui lòng không đóng trình duyệt lúc này.
                    </p>
                  </div>

                  <div className="py-2">
                    <Progress
                      percent={importProgress}
                      strokeColor={{ '0%': '#4F46E5', '100%': '#10B981' }}
                      status="active"
                    />
                  </div>

                  <p className="text-xs font-medium text-slate-600">
                    Đã hoàn thành{' '}
                    {Math.round((importProgress / 100) * validCount)} /{' '}
                    {validCount} chuyến bay hợp lệ
                  </p>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: RESULT SCREEN */}
        {step === 'RESULT' && (
          <Card className="mx-auto max-w-2xl space-y-6 rounded-xl border p-8 text-center shadow-xs">
            <div className="flex flex-col items-center gap-3">
              {importResults.fail === 0 ? (
                <div className="animate-bounce rounded-full bg-emerald-100 p-4 text-emerald-600">
                  <CheckCircle2Icon className="size-12" />
                </div>
              ) : (
                <div className="rounded-full bg-amber-100 p-4 text-amber-600">
                  <AlertTriangleIcon className="size-12" />
                </div>
              )}
              <h2 className="mt-2 text-xl font-bold text-slate-800">
                Import hoàn tất!
              </h2>
              <p className="max-w-md text-xs leading-relaxed text-slate-500">
                Quá trình đồng bộ dữ liệu vào hệ thống đã được hoàn thành. Dưới
                đây là kết quả chi tiết.
              </p>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-slate-50 p-4">
              <div className="space-y-0.5 border-r">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Thành công
                </span>
                <p className="text-xl font-bold text-emerald-600">
                  {importResults.success} chuyến bay
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Thất bại
                </span>
                <p className="text-xl font-bold text-rose-600">
                  {importResults.fail} chuyến bay
                </p>
              </div>
            </div>

            {/* Details failure list if any */}
            {importResults.fail > 0 && (
              <div className="space-y-2 text-left">
                <span className="text-xs font-bold text-slate-700">
                  Chi tiết các chuyến bay thất bại:
                </span>
                <div className="max-h-40 space-y-1 divide-y overflow-y-auto rounded-xl border bg-slate-50/50 p-2">
                  {importResults.details
                    .filter(x => !x.success)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 p-2 text-xs"
                      >
                        <span className="shrink-0 font-mono font-bold text-slate-600">
                          {item.bookingCode}
                        </span>
                        <span className="text-right text-[11px] leading-normal text-rose-600">
                          {item.error}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setValidatedFlights([]);
                  setStep('UPLOAD');
                }}
                className="px-5 text-xs"
              >
                Tiếp tục import file khác
              </Button>
              <Button
                onClick={() =>
                  navigate(flightManagementPaths.flightList.fullPath)
                }
                className="bg-indigo-600 px-6 text-xs font-bold text-white hover:bg-indigo-700"
              >
                Quay về danh sách chuyến bay
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};
