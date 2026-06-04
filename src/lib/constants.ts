export const TOKEN = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_QUERY_KEY = {
  PAGE_INDEX: 'page',
  PAGE_SIZE: 'pageSize',
} as const;

export const ACTIVE_STATUS_OPTIONS = [
  { value: true, label: 'Hoạt động' },
  { value: false, label: 'Không hoạt động' },
];

export const GENDER = {
  MALE: 1,
  FEMALE: 0,
} as const;

export const GENDER_LABEL = {
  [GENDER.MALE]: 'Nam',
  [GENDER.FEMALE]: 'Nữ',
} as const;

export const GENDER_OPTIONS = [
  { value: GENDER.MALE, label: GENDER_LABEL[GENDER.MALE] },
  { value: GENDER.FEMALE, label: GENDER_LABEL[GENDER.FEMALE] },
];

export const PASSENGER_TYPE = {
  ADULT: 'ADT',
  CHILDREN: 'CHD',
  INFANT: 'INF',
} as const;

export const PASSENGER_TYPE_LABEL = {
  [PASSENGER_TYPE.ADULT]: 'Người lớn',
  [PASSENGER_TYPE.CHILDREN]: 'Trẻ em',
  [PASSENGER_TYPE.INFANT]: 'Em bé',
};

export const PASSENGER_TYPE_OPTIONS = [
  {
    value: PASSENGER_TYPE.ADULT,
    label: PASSENGER_TYPE_LABEL[PASSENGER_TYPE.ADULT],
  },
  {
    value: PASSENGER_TYPE.CHILDREN,
    label: PASSENGER_TYPE_LABEL[PASSENGER_TYPE.CHILDREN],
  },
  {
    value: PASSENGER_TYPE.INFANT,
    label: PASSENGER_TYPE_LABEL[PASSENGER_TYPE.INFANT],
  },
];
