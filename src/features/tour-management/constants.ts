import type { TTourType } from './types';

export const TOUR_TYPE: Record<string, TTourType> = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  SINGLE_DAY: 'SINGLE_DAY',
  MULTI_DAY: 'MULTI_DAY',
} as const;

export const TOUR_TYPE_LABEL = {
  [TOUR_TYPE.DAILY]: 'Hàng ngày',
  [TOUR_TYPE.WEEKLY]: 'Hàng tuần',
  [TOUR_TYPE.SINGLE_DAY]: 'Ngày',
  [TOUR_TYPE.MULTI_DAY]: 'Nhiều ngày',
};

export const TOUR_TYPE_OPTIONS = Object.values(TOUR_TYPE).map(item => ({
  value: item,
  label: TOUR_TYPE_LABEL[item],
}));

export const DAY_OF_WEEK = {
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
  SUNDAY: 8,
} as const;

export const DAY_OF_WEEK_LABEL: Record<number, string> = {
  [DAY_OF_WEEK.MONDAY]: 'Thứ 2',
  [DAY_OF_WEEK.TUESDAY]: 'Thứ 3',
  [DAY_OF_WEEK.WEDNESDAY]: 'Thứ 4',
  [DAY_OF_WEEK.THURSDAY]: 'Thứ 5',
  [DAY_OF_WEEK.FRIDAY]: 'Thứ 6',
  [DAY_OF_WEEK.SATURDAY]: 'Thứ 7',
  [DAY_OF_WEEK.SUNDAY]: 'Chủ nhật',
};

export const DAY_OF_WEEK_OPTIONS = Object.entries(DAY_OF_WEEK).map(
  ([, value]) => ({
    value,
    label: DAY_OF_WEEK_LABEL[value],
  })
);

export const MOCK_DESTINATIONS = [
  { value: 'HAN', label: 'Hà Nội' },
  { value: 'HPH', label: 'Hải Phòng' },
  { value: 'DAD', label: 'Đà Nẵng' },
  { value: 'HUI', label: 'Huế' },
  { value: 'PQC', label: 'Phú Quốc' },
  { value: 'NHA', label: 'Nha Trang' },
  { value: 'DIN', label: 'Điện Biên' },
  { value: 'CXR', label: 'Cam Ranh' },
  { value: 'SGN', label: 'TP. Hồ Chí Minh' },
  { value: 'VCA', label: 'Cần Thơ' },
];

export const MOCK_TOUR_ROUTES = [
  { value: 'ROUTE_01', label: 'Tuyến miền Bắc' },
  { value: 'ROUTE_02', label: 'Tuyến miền Trung' },
  { value: 'ROUTE_03', label: 'Tuyến miền Nam' },
  { value: 'ROUTE_04', label: 'Tuyến Bắc - Nam' },
  { value: 'ROUTE_05', label: 'Tuyến Nam - Bắc' },
];

export const MOCK_NOTES = [
  { value: 'NOTE_01', label: 'Mang theo giấy tờ tùy thân' },
  { value: 'NOTE_02', label: 'Mang theo thuốc cá nhân' },
  { value: 'NOTE_03', label: 'Trang phục phù hợp thời tiết' },
  { value: 'NOTE_04', label: 'Mang theo kem chống nắng' },
  { value: 'NOTE_05', label: 'Mang theo ô/dù' },
];

export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Tiền mặt' },
  { value: 'TRANSFER', label: 'Chuyển khoản' },
  { value: 'BOTH', label: 'Tiền mặt & Chuyển khoản' },
];
