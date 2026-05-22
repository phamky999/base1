export const TOKEN = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const OBJECT_KEY_SEPARATOR = '---';

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
