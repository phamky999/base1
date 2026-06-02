import { OBJECT_KEY_SEPARATOR } from '@/lib/constants';
import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FARE_RULE_FORM_LIST_ITEM_PREFIX = 'fareRule';

export const SEGMENT_FORM_LIST_ITEM_PREFIX = 'segment';

export const FORM_FIELDS = {
  AIRLINE_CODE: 'airlineCode',
  BOOKING_CODE: 'bookingCode',
  SEAT_TOTAL: 'seatTotal',
  TIME_LIMIT: 'timeLimit',
  CLOSING_DAYS_BEFORE_DEPARTURE: 'closingDaysBeforeDeparture',
  FARE_RULES: 'fareRules',
  FARE_RULE_TYPE: [FARE_RULE_FORM_LIST_ITEM_PREFIX, 'type'].join(
    OBJECT_KEY_SEPARATOR
  ),
  FARE_RULE_TEXT: [FARE_RULE_FORM_LIST_ITEM_PREFIX, 'text'].join(
    OBJECT_KEY_SEPARATOR
  ),
  PRICE_ADULT: 'priceAdult',
  PRICE_CHILD: 'priceChild',
  PRICE_INFANT: 'priceInfant',
  ITINERARY_TYPE: 'itineraryType',
  DEPARTURE_SEGMENTS: 'departureSegments',
  RETURN_SEGMENTS: 'returnSegments',
  SEGMENT_AIRLINE_CODE: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'airlineCode'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_START_POINT: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'startPoint'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_END_POINT: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'endPoint'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_START_DATE: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'startDate'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_END_DATE: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'endDate'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_FLIGHT_NUMBER: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'flightNumber'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_SEAT_CLASS: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'seatClass'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_PLANE: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'plane'].join(
    OBJECT_KEY_SEPARATOR
  ),
  SEGMENT_DURATION: [SEGMENT_FORM_LIST_ITEM_PREFIX, 'duration'].join(
    OBJECT_KEY_SEPARATOR
  ),
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.AIRLINE_CODE]: 'Mã hãng hàng không',
  [FORM_FIELDS.BOOKING_CODE]: 'Mã đặt chỗ',
  [FORM_FIELDS.SEAT_TOTAL]: 'Tổng số ghế',
  [FORM_FIELDS.TIME_LIMIT]: 'Thời gian giữ chỗ',
  [FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]: 'Đóng bán trước',
  [FORM_FIELDS.FARE_RULES]: 'Cấu hình bộ điều kiện',
  [FORM_FIELDS.FARE_RULE_TYPE]: 'Loại ',
  [FORM_FIELDS.FARE_RULE_TEXT]: 'Nội dung',
  [FORM_FIELDS.PRICE_ADULT]: 'Giá người lớn',
  [FORM_FIELDS.PRICE_CHILD]: 'Giá trẻ em',
  [FORM_FIELDS.PRICE_INFANT]: 'Giá em bé',
  [FORM_FIELDS.DEPARTURE_SEGMENTS]: 'Chiều đi',
  [FORM_FIELDS.RETURN_SEGMENTS]: 'Chiều về',
  [FORM_FIELDS.SEGMENT_AIRLINE_CODE]: 'Mã hãng hàng không',
  [FORM_FIELDS.SEGMENT_START_POINT]: 'Mã sân bay khởi hành',
  [FORM_FIELDS.SEGMENT_END_POINT]: 'Mã sân bay hạ cánh',
  [FORM_FIELDS.SEGMENT_START_DATE]: 'Thời gian khởi hành',
  [FORM_FIELDS.SEGMENT_END_DATE]: 'Thời gian hạ cánh',
  [FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]: 'Số hiệu chuyến bay',
  [FORM_FIELDS.SEGMENT_SEAT_CLASS]: 'Hạng ghế',
  [FORM_FIELDS.SEGMENT_PLANE]: 'Loại máy bay',
  [FORM_FIELDS.SEGMENT_DURATION]: 'Thời gian bay',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
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
  [FORM_FIELDS.SEGMENT_AIRLINE_CODE]: [
    { required: true, message: 'Hãy nhập mã hãng hàng không' },
    {
      pattern: Regex.AIRLINE_CODE,
      message: RegexValidationMessage.AIRLINE_CODE,
    },
  ],
  [FORM_FIELDS.SEGMENT_START_POINT]: [
    { required: true, message: 'Hãy nhập mã sân bay khởi hành' },
    {
      pattern: Regex.AIRPORT_CODE,
      message: RegexValidationMessage.AIRPORT_CODE,
    },
  ],
  [FORM_FIELDS.SEGMENT_END_POINT]: [
    { required: true, message: 'Hãy nhập mã sân bay hạ cánh' },
    {
      pattern: Regex.AIRPORT_CODE,
      message: RegexValidationMessage.AIRPORT_CODE,
    },
  ],
  [FORM_FIELDS.SEGMENT_START_DATE]: [
    { required: true, message: 'Hãy nhập ngày khởi hành' },
  ],
  [FORM_FIELDS.SEGMENT_END_DATE]: [
    { required: true, message: 'Hãy nhập ngày hạ cánh' },
  ],

  [FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]: [
    { required: true, message: 'Hãy nhập số hiệu chuyến bay' },
    {
      pattern: Regex.FLIGHT_NUMBER,
      message: RegexValidationMessage.FLIGHT_NUMBER,
    },
  ],
  [FORM_FIELDS.SEGMENT_SEAT_CLASS]: [
    { required: true, message: 'Hãy nhập hạng ghế' },
  ],
  [FORM_FIELDS.SEGMENT_PLANE]: [
    { required: true, message: 'Hãy nhập loại máy bay' },
  ],
  [FORM_FIELDS.SEGMENT_DURATION]: [
    { required: true, message: 'Hãy nhập thời gian bay' },
    { type: 'number', message: 'Thời gian bay phải là số' },
  ],
} as const;
