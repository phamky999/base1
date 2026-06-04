import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  AIRLINE_CODE: 'airlineCode',
  BOOKING_CODE: 'bookingCode',
  SEAT_TOTAL: 'seatTotal',
  TIME_LIMIT: 'timeLimit',
  CLOSING_DAYS_BEFORE_DEPARTURE: 'closingDaysBeforeDeparture',
  FARE_RULES: 'fareRules',

  PRICE_ADULT: 'priceAdult',
  PRICE_CHILD: 'priceChild',
  PRICE_INFANT: 'priceInfant',
  ITINERARY_TYPE: 'itineraryType',
  DEPARTURE_SEGMENTS: 'departureSegments',
  RETURN_SEGMENTS: 'returnSegments',
} as const;

export const FARE_RULE_FIELDS = {
  TYPE: 'type',
  TEXT: 'text',
} as const;

export const SEGMENT_FIELDS = {
  AIRLINE_CODE: 'airlineCode',
  START_POINT: 'startPoint',
  END_POINT: 'endPoint',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  FLIGHT_NUMBER: 'flightNumber',
  SEAT_CLASS: 'seatClass',
  PLANE: 'plane',
  DURATION: 'duration',
} as const;

export const FORM_LABELS: Partial<Record<string, string>> = {
  [FORM_FIELDS.AIRLINE_CODE]: 'Mã hãng hàng không',
  [FORM_FIELDS.BOOKING_CODE]: 'Mã đặt chỗ',
  [FORM_FIELDS.SEAT_TOTAL]: 'Tổng số ghế',
  [FORM_FIELDS.TIME_LIMIT]: 'Thời gian giữ chỗ',
  [FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]: 'Đóng bán trước',
  [FORM_FIELDS.FARE_RULES]: 'Cấu hình bộ điều kiện',
  [FORM_FIELDS.PRICE_ADULT]: 'Giá người lớn',
  [FORM_FIELDS.PRICE_CHILD]: 'Giá trẻ em',
  [FORM_FIELDS.PRICE_INFANT]: 'Giá em bé',
  [FORM_FIELDS.DEPARTURE_SEGMENTS]: 'Chiều đi',
  [FORM_FIELDS.RETURN_SEGMENTS]: 'Chiều về',
} as const;

export const SEGMENT_FIELD_LABELS = {
  [SEGMENT_FIELDS.AIRLINE_CODE]: 'Mã hãng hàng không',
  [SEGMENT_FIELDS.START_POINT]: 'Mã sân bay khởi hành',
  [SEGMENT_FIELDS.END_POINT]: 'Mã sân bay hạ cánh',
  [SEGMENT_FIELDS.START_DATE]: 'Thời gian khởi hành',
  [SEGMENT_FIELDS.END_DATE]: 'Thời gian hạ cánh',
  [SEGMENT_FIELDS.FLIGHT_NUMBER]: 'Số hiệu chuyến bay',
  [SEGMENT_FIELDS.SEAT_CLASS]: 'Hạng ghế',
  [SEGMENT_FIELDS.PLANE]: 'Loại máy bay',
  [SEGMENT_FIELDS.DURATION]: 'Thời gian bay',
};

export const FARE_RULE_FIELD_LABELS = {
  [FARE_RULE_FIELDS.TYPE]: 'Loại',
  [FARE_RULE_FIELDS.TEXT]: 'Nội dung',
};

export const FORM_VALIDATIONS: Record<string, Rule[]> = {
  [FORM_FIELDS.AIRLINE_CODE]: [
    { required: true, message: 'Hãy nhập mã hãng hàng không' },
    {
      pattern: Regex.AIRLINE_CODE,
      message: RegexValidationMessage.AIRLINE_CODE,
    },
  ],
  [FORM_FIELDS.BOOKING_CODE]: [
    { required: true, message: 'Hãy nhập mã đặt chỗ', whitespace: true },
  ],
  [FORM_FIELDS.SEAT_TOTAL]: [
    { required: true, message: 'Hãy nhập tổng số ghế', type: 'number' },
  ],
  [FORM_FIELDS.TIME_LIMIT]: [
    { required: true, message: 'Hãy nhập thời gian giữ chỗ', type: 'number' },
  ],
  [FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]: [
    {
      required: true,
      message: 'Hãy nhập số ngày đóng trước khi khởi hành',
      type: 'number',
    },
  ],
  [FORM_FIELDS.PRICE_ADULT]: [
    { required: true, message: 'Hãy nhập giá người lớn', type: 'number' },
  ],
  [FORM_FIELDS.PRICE_CHILD]: [
    { required: true, message: 'Hãy nhập giá trẻ em', type: 'number' },
  ],
  [FORM_FIELDS.PRICE_INFANT]: [
    { required: true, message: 'Hãy nhập giá em bé', type: 'number' },
  ],
  [FORM_FIELDS.DEPARTURE_SEGMENTS]: [
    {
      validator: (_, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(
            new Error('Vui lòng thêm ít nhất 1 hành trình')
          );
        }
        return Promise.resolve();
      },
    },
  ],
} as const;

export const SEGMENT_FIELD_VALIDATIONS: Partial<Record<string, Rule[]>> = {
  [SEGMENT_FIELDS.AIRLINE_CODE]: [
    { required: true, message: 'Hãy nhập mã hãng hàng không' },
    {
      pattern: Regex.AIRLINE_CODE,
      message: RegexValidationMessage.AIRLINE_CODE,
    },
  ],
  [SEGMENT_FIELDS.START_POINT]: [
    { required: true, message: 'Hãy nhập mã sân bay khởi hành' },
    {
      pattern: Regex.AIRPORT_CODE,
      message: RegexValidationMessage.AIRPORT_CODE,
    },
  ],
  [SEGMENT_FIELDS.END_POINT]: [
    { required: true, message: 'Hãy nhập mã sân bay hạ cánh' },
    {
      pattern: Regex.AIRPORT_CODE,
      message: RegexValidationMessage.AIRPORT_CODE,
    },
  ],
  [SEGMENT_FIELDS.START_DATE]: [
    { required: true, message: 'Hãy nhập ngày khởi hành' },
  ],
  [SEGMENT_FIELDS.END_DATE]: [
    { required: true, message: 'Hãy nhập ngày hạ cánh' },
  ],

  [SEGMENT_FIELDS.FLIGHT_NUMBER]: [
    { required: true, message: 'Hãy nhập số hiệu chuyến bay' },
    {
      pattern: Regex.FLIGHT_NUMBER,
      message: RegexValidationMessage.FLIGHT_NUMBER,
    },
  ],
  [SEGMENT_FIELDS.SEAT_CLASS]: [
    { required: true, message: 'Hãy nhập hạng ghế' },
  ],
  [SEGMENT_FIELDS.PLANE]: [
    { required: true, message: 'Hãy nhập loại máy bay' },
  ],
  [SEGMENT_FIELDS.DURATION]: [
    { required: true, message: 'Hãy nhập thời gian bay' },
    { type: 'number', message: 'Thời gian bay phải là số' },
  ],
} as const;

export const FARE_RULE_FIELD_VALIDATIONS: Partial<Record<string, Rule[]>> = {
  [FARE_RULE_FIELDS.TEXT]: [
    {
      required: true,
      message: 'Hãy nhập nội dung điều kiện',
      whitespace: true,
    },
  ],
  [FARE_RULE_FIELDS.TYPE]: [
    { required: true, message: 'Hãy chọn loại điều kiện' },
  ],
} as const;
