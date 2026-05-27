import {
  FARE_RULE_TYPE_LABEL,
  FLIGHT_ITINERARY_TYPE,
} from '@/features/flight-management/constants';
import { parseExcelDateTimeToISO } from '@/features/flight-management/helper/parse-excel-value-helper';
import type {
  TCreateFlightPayload,
  TCreateFlightSegmentItem,
  TFareRuleType,
  TFlightExcelImportRow,
} from '@/features/flight-management/types';
import { FLIGHT_DATE_TIME_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { Regex, RegexValidationMessage } from '@/lib/validations';

// Helper to convert rule labels/keys to TFareRuleType
export const getFareRuleType = (ruleLabel: string): TFareRuleType | null => {
  const cleanVal = String(ruleLabel).trim();

  if (cleanVal in FARE_RULE_TYPE_LABEL) {
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

export const validateFlightDataImport = (
  flight: TFlightExcelImportRow,
  rules: { label: string; text: string }[]
): string[] => {
  const errors: string[] = [];

  if (!flight?.airlineCode) errors.push('Mã hãng hàng không là bắt buộc.');
  else if (!Regex.AIRLINE_CODE.test(String(flight?.airlineCode).trim())) {
    errors.push(
      `Mã hãng hàng không không hợp lệ: "${flight?.airlineCode}". ${RegexValidationMessage.AIRLINE_CODE}`
    );
  }

  if (!flight?.bookingCode) errors.push('Mã đặt chỗ là bắt buộc.');

  const seatTotal = Number(flight?.seatTotal);
  if (
    flight?.seatTotal === '' ||
    flight?.seatTotal === null ||
    flight?.seatTotal === undefined ||
    isNaN(seatTotal)
  ) {
    errors.push('Tổng số ghế phải là một số.');
  } else if (seatTotal <= 0) {
    errors.push('Tổng số ghế phải lớn hơn 0.');
  }

  const timeLimit = Number(flight?.timeLimit);
  if (
    flight?.timeLimit === '' ||
    flight?.timeLimit === null ||
    flight?.timeLimit === undefined ||
    isNaN(timeLimit)
  ) {
    errors.push('Thời gian giữ chỗ phải là một số.');
  } else if (timeLimit < 0) {
    errors.push('Thời gian giữ chỗ không được nhỏ hơn 0.');
  }

  const closingDays = Number(flight?.closingDaysBeforeDeparture);
  if (
    flight?.closingDaysBeforeDeparture === '' ||
    flight?.closingDaysBeforeDeparture === null ||
    flight?.closingDaysBeforeDeparture === undefined ||
    isNaN(closingDays)
  ) {
    errors.push('Đóng bán trước (ngày) phải là một số.');
  } else if (closingDays < 0) {
    errors.push('Số ngày đóng bán trước không được nhỏ hơn 0.');
  }

  const pAdult = Number(flight?.priceAdult);
  const pChild = Number(flight?.priceChild);
  const pInfant = Number(flight?.priceInfant);

  if (
    flight?.priceAdult === '' ||
    flight?.priceAdult === null ||
    flight?.priceAdult === undefined ||
    isNaN(pAdult) ||
    pAdult < 0
  ) {
    errors.push('Giá người lớn không hợp lệ (phải là số >= 0).');
  }
  if (
    flight?.priceChild === '' ||
    flight?.priceChild === null ||
    flight?.priceChild === undefined ||
    isNaN(pChild) ||
    pChild < 0
  ) {
    errors.push('Giá trẻ em không hợp lệ (phải là số >= 0).');
  }
  if (
    flight?.priceInfant === '' ||
    flight?.priceInfant === null ||
    flight?.priceInfant === undefined ||
    isNaN(pInfant) ||
    pInfant < 0
  ) {
    errors.push('Giá em bé không hợp lệ (phải là số >= 0).');
  }

  const itinerary = String(flight?.itinerary || '')
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

      const depStartStr = parseExcelDateTimeToISO({
        dateStr: String(flight?.departure?.date ?? ''),
        timeStr: String(flight?.departure?.time ?? ''),
      });
      const depEndStr = parseExcelDateTimeToISO({
        dateStr: String(flight?.departure?.arrDate ?? ''),
        timeStr: String(flight?.departure?.arrTime ?? ''),
      });

      if (!flight.departure?.date || !flight.departure?.time || !depStartStr) {
        errors.push('Thời gian khởi hành chiều đi không hợp lệ.');
      }
      if (
        !flight.departure?.arrDate ||
        !flight.departure?.arrTime ||
        !depEndStr
      ) {
        errors.push('Thời gian hạ cánh chiều đi không hợp lệ.');
      }
      if (!flight.departure?.flightNum) {
        errors.push('Số hiệu chuyến bay chiều đi là bắt buộc.');
      } else if (
        !Regex.FLIGHT_NUMBER.test(String(flight.departure?.flightNum).trim())
      ) {
        errors.push(
          `Số hiệu chuyến bay chiều đi không hợp lệ. ${RegexValidationMessage.FLIGHT_NUMBER}`
        );
      }
      if (!flight.departure?.seatClass)
        errors.push('Hạng ghế chiều đi là bắt buộc.');
      if (!flight.departure?.plane)
        errors.push('Loại máy bay chiều đi là bắt buộc.');

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
          flight?.return?.date ||
          flight?.return?.time ||
          flight?.return?.arrDate ||
          flight?.return?.arrTime ||
          flight?.return?.flightNum ||
          flight?.return?.seatClass ||
          flight?.return?.plane;

        if (!hasAnyReturnInfo) {
          errors.push(
            'Chuyến bay được xác định là khứ hồi (itinerary có điểm đầu khớp điểm cuối) nhưng thiếu hoàn toàn thông tin chiều về.'
          );
        } else {
          const retStartStr = parseExcelDateTimeToISO({
            dateStr: String(flight?.return?.date ?? ''),
            timeStr: String(flight?.return?.time ?? ''),
          });
          const retEndStr = parseExcelDateTimeToISO({
            dateStr: String(flight?.return?.arrDate ?? ''),
            timeStr: String(flight?.return?.arrTime ?? ''),
          });

          if (!flight?.return?.date || !flight?.return?.time || !retStartStr) {
            errors.push('Thời gian khởi hành chiều về không hợp lệ.');
          }
          if (
            !flight?.return?.arrDate ||
            !flight?.return?.arrTime ||
            !retEndStr
          ) {
            errors.push('Thời gian hạ cánh chiều về không hợp lệ.');
          }
          if (!flight?.return?.flightNum) {
            errors.push('Số hiệu chuyến bay chiều về là bắt buộc.');
          } else if (
            !Regex.FLIGHT_NUMBER.test(String(flight?.return?.flightNum).trim())
          ) {
            errors.push(
              `Số hiệu chuyến bay chiều về không hợp lệ. ${RegexValidationMessage.FLIGHT_NUMBER}`
            );
          }
          if (!flight?.return?.seatClass)
            errors.push('Hạng ghế chiều về là bắt buộc.');
          if (!flight?.return?.plane)
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
            const diffBet = dayjs(retStartStr).diff(dayjs(depEndStr), 'minute');
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
      const type = getFareRuleType(rule.label);
      if (!type) {
        errors.push(
          `Điều kiện dòng ${idx + 1}: Loại điều kiện "${rule.label}" không hợp lệ.`
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

export const mapFlightDataImportToCreateFlightPayload = (
  flight: TFlightExcelImportRow,
  rules: { label: string; text: string }[]
): TCreateFlightPayload => {
  const itinerary = String(flight.itinerary || '')
    .trim()
    .toUpperCase();
  const airportCodes: string[] = [];
  for (let i = 0; i < itinerary.length; i += 3) {
    airportCodes.push(itinerary.substring(i, i + 3));
  }

  const totalAirports = airportCodes.length;

  const isRoundTrip =
    totalAirports >= 3 && airportCodes[0] === airportCodes[totalAirports - 1];

  const itineraryType = isRoundTrip
    ? FLIGHT_ITINERARY_TYPE.ROUND_TRIP
    : FLIGHT_ITINERARY_TYPE.ONE_WAY;

  const depStart = parseExcelDateTimeToISO({
    dateStr: String(flight?.departure?.date ?? ''),
    timeStr: String(flight?.departure?.time ?? ''),
  });
  const depEnd = parseExcelDateTimeToISO({
    dateStr: String(flight?.departure?.arrDate ?? ''),
    timeStr: String(flight?.departure?.arrTime ?? ''),
  });
  const depDuration =
    depEnd && depStart ? dayjs(depEnd).diff(dayjs(depStart), 'minute') : 0;

  const departureSegments = [
    {
      airlineCode: String(flight.airlineCode).trim().toUpperCase(),
      startPoint: airportCodes[0],
      endPoint: airportCodes[1] || airportCodes[0],
      startDate: dayjs(depStart).format(FLIGHT_DATE_TIME_FORMAT),
      endDate: dayjs(depEnd).format(FLIGHT_DATE_TIME_FORMAT),
      flightNumber: String(flight.departure?.flightNum).trim().toUpperCase(),
      seatClass: String(flight.departure?.seatClass).trim().toUpperCase(),
      plane: String(flight.departure?.plane).trim(),
      duration: depDuration,
    },
  ];

  let returnSegments: TCreateFlightSegmentItem[] | undefined = undefined;
  if (itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP) {
    const retStart = parseExcelDateTimeToISO({
      dateStr: String(flight?.return?.date ?? ''),
      timeStr: String(flight?.return?.time ?? ''),
    });
    const retEnd = parseExcelDateTimeToISO({
      dateStr: String(flight?.return?.arrDate ?? ''),
      timeStr: String(flight?.return?.arrTime ?? ''),
    });
    const retDuration =
      retEnd && retStart ? dayjs(retEnd).diff(dayjs(retStart), 'minute') : 0;

    returnSegments = [
      {
        airlineCode: String(flight.airlineCode).trim().toUpperCase(),
        startPoint: airportCodes[totalAirports - 2],
        endPoint: airportCodes[totalAirports - 1] || airportCodes[0],
        startDate: dayjs(retStart).format(FLIGHT_DATE_TIME_FORMAT),
        endDate: dayjs(retEnd).format(FLIGHT_DATE_TIME_FORMAT),
        flightNumber: String(flight.return?.flightNum).trim().toUpperCase(),
        seatClass: String(flight.return?.seatClass).trim().toUpperCase(),
        plane: String(flight.return?.plane).trim(),
        duration: retDuration,
      },
    ];
  }

  const mappedRules = (rules || []).map(r => ({
    type: (getFareRuleType(r.label) || r.label) as TFareRuleType,
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
