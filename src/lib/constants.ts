export const TOKEN = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_QUERY_KEY = {
  PAGE_INDEX: 'pageIndex',
  PAGE_SIZE: 'pageSize',
} as const;
