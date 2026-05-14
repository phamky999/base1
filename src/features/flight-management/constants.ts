import type {
  TFareRuleType,
  TFlightBookingLogAction,
} from '@/features/flight-management/types';

export const FLIGHT_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
} as const;

export const FLIGHT_STATUS_LABEL = {
  [FLIGHT_STATUS.DRAFT]: 'Đang khởi tạo',
  [FLIGHT_STATUS.ACTIVE]: 'Đang hoạt động',
} as const;

export const FLIGHT_STATUS_COLOR = {
  [FLIGHT_STATUS.DRAFT]: 'blue',
  [FLIGHT_STATUS.ACTIVE]: 'green',
} as const;

export const FLIGHT_BOOKING_STATUS = {
  HOLD: 'HOLD',
  CANCELLED: 'CANCELLED',
  ISSUED: 'ISSUED',
} as const;

export const FLIGHT_BOOKING_STATUS_LABEL = {
  [FLIGHT_BOOKING_STATUS.HOLD]: 'Đang giữ chỗ',
  [FLIGHT_BOOKING_STATUS.CANCELLED]: 'Đã hủy',
  [FLIGHT_BOOKING_STATUS.ISSUED]: 'Đã xuất vé',
} as const;

export const FLIGHT_BOOKING_STATUS_COLOR = {
  [FLIGHT_BOOKING_STATUS.HOLD]: 'blue',
  [FLIGHT_BOOKING_STATUS.CANCELLED]: 'red',
  [FLIGHT_BOOKING_STATUS.ISSUED]: 'green',
} as const;

export const FARE_RULE_TYPE = {
  REFUNDABLE: 'REFUNDABLE',
  NON_REFUNDABLE: 'NON_REFUNDABLE',
  HAND_BAGGAGE: 'HAND_BAGGAGE',
  CHECKED_BAGGAGE: 'CHECKED_BAGGAGE',
  CHANGE: 'CHANGE',
  NO_CHANGE: 'NO_CHANGE',
  NOTE: 'NOTE',
} as const;

export const FARE_RULE_TYPE_LABEL: Record<TFareRuleType, string> = {
  [FARE_RULE_TYPE.REFUNDABLE]: 'Hoàn hủy',
  [FARE_RULE_TYPE.NON_REFUNDABLE]: 'Không hoàn hủy',
  [FARE_RULE_TYPE.HAND_BAGGAGE]: 'Hành lý xách tay',
  [FARE_RULE_TYPE.CHECKED_BAGGAGE]: 'Hành lý ký gửi',
  [FARE_RULE_TYPE.CHANGE]: 'Thay đổi thông tin',
  [FARE_RULE_TYPE.NO_CHANGE]: 'Không được thay đổi thông tin',
  [FARE_RULE_TYPE.NOTE]: 'Ghi chú',
} as const;

export const FLIGHT_DETAIL_LOG_ACTION = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
} as const;

export const FLIGHT_DETAIL_LOG_ACTION_LABEL = {
  [FLIGHT_DETAIL_LOG_ACTION.ADD]: 'Tạo mới',
  [FLIGHT_DETAIL_LOG_ACTION.UPDATE]: 'Cập nhật',
} as const;

export const FLIGHT_BOOKING_LOG_ACTION = {
  HOLD: 'HOLD',
  CANCELLED: 'CANCELLED',
  ISSUED: 'ISSUED',
} as const;

export const FLIGHT_BOOKING_LOG_ACTION_LABEL: Record<
  TFlightBookingLogAction,
  string
> = {
  [FLIGHT_BOOKING_LOG_ACTION.HOLD]: 'Giữ chỗ',
  [FLIGHT_BOOKING_LOG_ACTION.CANCELLED]: 'Hủy vé',
  [FLIGHT_BOOKING_LOG_ACTION.ISSUED]: 'Xuất vé',
} as const;
