import type {
  TFareRuleType,
  TFlightBookingAction,
  TGetFlightListRequestParams,
} from '@/features/flight-management/types';

export const FLIGHT_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  CANCELLED: 'CANCELLED',
} as const;

export const FLIGHT_STATUS_LABEL = {
  [FLIGHT_STATUS.DRAFT]: 'Đang khởi tạo',
  [FLIGHT_STATUS.ACTIVE]: 'Đang mở bán',
  [FLIGHT_STATUS.CLOSED]: 'Đóng bán',
  [FLIGHT_STATUS.CANCELLED]: 'Đã hủy',
} as const;

export const FLIGHT_STATUS_COLOR = {
  [FLIGHT_STATUS.DRAFT]: 'blue',
  [FLIGHT_STATUS.ACTIVE]: 'green',
  [FLIGHT_STATUS.CLOSED]: 'gray',
  [FLIGHT_STATUS.CANCELLED]: 'red',
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

export const FLIGHT_DETAIL_ACTION = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  PUBLISH: 'PUBLISH',
  CLOSE: 'CLOSE',
  REOPEN: 'REOPEN',
  CANCEL: 'CANCEL',

  //front-end
  VIEW_BOOKING_LIST: 'VIEW_BOOKING_LIST',
  VIEW_LOGS: 'VIEW_LOGS',
} as const;

export const FLIGHT_DETAIL_ACTION_LABEL = {
  [FLIGHT_DETAIL_ACTION.ADD]: 'Tạo mới',
  [FLIGHT_DETAIL_ACTION.UPDATE]: 'Cập nhật',
  [FLIGHT_DETAIL_ACTION.DELETE]: 'Xóa chuyến bay',
  [FLIGHT_DETAIL_ACTION.PUBLISH]: 'Mở bán',
  [FLIGHT_DETAIL_ACTION.CLOSE]: 'Đóng bán',
  [FLIGHT_DETAIL_ACTION.REOPEN]: 'Mở bán lại',
  [FLIGHT_DETAIL_ACTION.CANCEL]: 'Hủy chuyến bay',

  //front-end
  [FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST]: 'Xem danh sách đơn hàng',
  [FLIGHT_DETAIL_ACTION.VIEW_LOGS]: 'Xem lịch sử thay đổi',
} as const;

export const FLIGHT_BOOKING_ACTION = {
  HOLD: 'HOLD',
  CANCELLED: 'CANCELLED',
  ISSUED: 'ISSUED',
} as const;

export const FLIGHT_BOOKING_ACTION_LABEL: Record<TFlightBookingAction, string> =
  {
    [FLIGHT_BOOKING_ACTION.HOLD]: 'Giữ chỗ',
    [FLIGHT_BOOKING_ACTION.CANCELLED]: 'Hủy đơn hàng',
    [FLIGHT_BOOKING_ACTION.ISSUED]: 'Xuất vé',
  } as const;

export const GET_FLIGHT_FILTER_KEYS: (keyof TGetFlightListRequestParams)[] = [
  'status',
  'airlineCode',
  'bookingCode',
  'startPoint',
  'endPoint',
  'flightNumber',
];
