import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  TOUR_ROUTE_ID: 'tourRouteId',
  PROGRAM_NAME: 'programName',
  DEPARTURE_POINT: 'departurePoint',
  DESTINATION_POINTS: 'destinationPoints',
  TOUR_TYPE: 'tourType',
  DEPARTURE_DAY_OF_WEEK: 'departureDayOfWeek',
  DEPARTURE_DATE: 'departureDate',
  DEPARTURE_DATES: 'departureDates',
  NUMBER_OF_DAYS: 'numberOfDays',
  NUMBER_OF_NIGHTS: 'numberOfNights',
  NOTE_IDS: 'noteIds',
  HOLD_TIME: 'holdTime',
  SEAT_COUNT: 'seatCount',
  TRANSPORTATION: 'transportation',
  SIGHTSEEING: 'sightseeing',
  CUISINE: 'cuisine',
  PROMOTIONS: 'promotions',
  BEST_TIME_TO_VISIT: 'bestTimeToVisit',
  SUITABLE_FOR: 'suitableFor',
  HOTEL: 'hotel',
  ADULT_PRICE: 'adultPrice',
  CHILD_PRICE: 'childPrice',
  INFANT_PRICE: 'infantPrice',
  PRIVATE_ROOM_PRICE: 'privateRoomPrice',
  PAYMENT_METHOD: 'paymentMethod',
  ITINERARY: 'itinerary',
} as const;

export const ITINERARY_FIELDS = {
  TITLE: 'title',
  CONTENT: 'content',
} as const;

export const FORM_LABELS: Record<string, string> = {
  [FORM_FIELDS.TOUR_ROUTE_ID]: 'Tuyến tour',
  [FORM_FIELDS.PROGRAM_NAME]: 'Tên chương trình tour',
  [FORM_FIELDS.DEPARTURE_POINT]: 'Điểm khởi hành',
  [FORM_FIELDS.DESTINATION_POINTS]: 'Điểm đến',
  [FORM_FIELDS.TOUR_TYPE]: 'Loại tour',
  [FORM_FIELDS.DEPARTURE_DAY_OF_WEEK]: 'Ngày khởi hành trong tuần',
  [FORM_FIELDS.DEPARTURE_DATE]: 'Ngày khởi hành',
  [FORM_FIELDS.DEPARTURE_DATES]: 'Ngày khởi hành',
  [FORM_FIELDS.NUMBER_OF_DAYS]: 'Số ngày tour',
  [FORM_FIELDS.NUMBER_OF_NIGHTS]: 'Số đêm tour',
  [FORM_FIELDS.NOTE_IDS]: 'Danh sách lưu ý',
  [FORM_FIELDS.HOLD_TIME]: 'Thời hạn giữ chỗ',
  [FORM_FIELDS.SEAT_COUNT]: 'Số lượng chỗ',
  [FORM_FIELDS.TRANSPORTATION]: 'Phương tiện di chuyển',
  [FORM_FIELDS.SIGHTSEEING]: 'Điểm tham quan',
  [FORM_FIELDS.CUISINE]: 'Ẩm thực',
  [FORM_FIELDS.PROMOTIONS]: 'Ưu đãi',
  [FORM_FIELDS.BEST_TIME_TO_VISIT]: 'Thời điểm tham quan',
  [FORM_FIELDS.SUITABLE_FOR]: 'Đối tượng thích hợp',
  [FORM_FIELDS.HOTEL]: 'Khách sạn',
  [FORM_FIELDS.ADULT_PRICE]: 'Giá người lớn',
  [FORM_FIELDS.CHILD_PRICE]: 'Giá trẻ em',
  [FORM_FIELDS.INFANT_PRICE]: 'Giá em bé',
  [FORM_FIELDS.PRIVATE_ROOM_PRICE]: 'Giá phòng riêng',
  [FORM_FIELDS.PAYMENT_METHOD]: 'Hình thức thanh toán',
  [FORM_FIELDS.ITINERARY]: 'Lịch trình tour',
};

export const FORM_VALIDATIONS: Record<string, Rule[]> = {
  [FORM_FIELDS.TOUR_ROUTE_ID]: [
    { required: true, message: 'Vui lòng chọn tuyến tour' },
  ],
  [FORM_FIELDS.PROGRAM_NAME]: [
    {
      required: true,
      message: 'Vui lòng nhập tên chương trình tour',
      whitespace: true,
    },
  ],
  [FORM_FIELDS.DEPARTURE_POINT]: [
    { required: true, message: 'Vui lòng chọn điểm khởi hành' },
  ],
  [FORM_FIELDS.DESTINATION_POINTS]: [
    { required: true, message: 'Vui lòng chọn điểm đến', type: 'array' },
  ],
  [FORM_FIELDS.TOUR_TYPE]: [
    { required: true, message: 'Vui lòng chọn loại tour' },
  ],
  [FORM_FIELDS.DEPARTURE_DAY_OF_WEEK]: [
    { required: true, message: 'Vui lòng chọn ngày khởi hành' },
  ],
  [FORM_FIELDS.DEPARTURE_DATE]: [
    { required: true, message: 'Vui lòng chọn ngày khởi hành' },
  ],
  [FORM_FIELDS.DEPARTURE_DATES]: [
    { required: true, message: 'Vui lòng chọn ngày khởi hành', type: 'array' },
  ],
  [FORM_FIELDS.NUMBER_OF_DAYS]: [
    {
      required: true,
      message: 'Vui lòng nhập số ngày đi tour',
      type: 'number',
    },
  ],
  [FORM_FIELDS.NUMBER_OF_NIGHTS]: [
    { required: true, message: 'Vui lòng nhập số đêm đi tour', type: 'number' },
  ],
  [FORM_FIELDS.HOLD_TIME]: [
    {
      required: true,
      message: 'Vui lòng nhập thời hạn giữ chỗ',
      type: 'number',
    },
  ],
  [FORM_FIELDS.SEAT_COUNT]: [
    { required: true, message: 'Vui lòng nhập số lượng chỗ', type: 'number' },
  ],
  [FORM_FIELDS.ADULT_PRICE]: [
    { required: true, message: 'Vui lòng nhập giá người lớn', type: 'number' },
  ],
  [FORM_FIELDS.CHILD_PRICE]: [
    { required: true, message: 'Vui lòng nhập giá trẻ em', type: 'number' },
  ],
  [FORM_FIELDS.INFANT_PRICE]: [
    { required: true, message: 'Vui lòng nhập giá em bé', type: 'number' },
  ],
  [FORM_FIELDS.PRIVATE_ROOM_PRICE]: [
    {
      required: true,
      message: 'Vui lòng nhập giá phòng riêng',
      type: 'number',
    },
  ],
};
