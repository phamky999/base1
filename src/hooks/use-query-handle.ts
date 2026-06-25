import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PAGINATION_QUERY_KEY,
  SORT_ORDER,
  SORT_QUERY_KEY,
} from '@/lib/constants';
import { type ObjectType, type TPaginationQueryKey } from '@/lib/types';
import { pick, pickBy } from 'lodash-es';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryHandle = <T extends ObjectType>() => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => queryString.parse(location.search.replace('?', '')),
    [location.search]
  );

  const {
    [PAGINATION_QUERY_KEY.PAGE_INDEX]: pageIndex,
    [PAGINATION_QUERY_KEY.PAGE_SIZE]: pageSize,
  } = queryParams || {};

  const {
    [SORT_QUERY_KEY.SORT_BY]: sortBy,
    [SORT_QUERY_KEY.SORT_DIRECTION]: sortDirection,
  } = queryParams || {};

  const paginationData = useMemo(
    (): Record<TPaginationQueryKey, number> => ({
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: pageIndex
        ? +pageIndex
        : DEFAULT_PAGE_INDEX,
      [PAGINATION_QUERY_KEY.PAGE_SIZE]: pageSize
        ? +pageSize
        : DEFAULT_PAGE_SIZE,
    }),
    [pageIndex, pageSize]
  );

  const sortData = useMemo(() => {
    if (sortBy && sortDirection) {
      return {
        [SORT_QUERY_KEY.SORT_BY]: sortBy,
        [SORT_QUERY_KEY.SORT_DIRECTION]: sortDirection,
      };
    }
    return {};
  }, [sortBy, sortDirection]);

  const handleUpdateQuery = useCallback(
    (payload: Record<string, unknown>) => {
      const nextQuery = pickBy(
        {
          ...queryParams,
          ...payload,
        },
        value => value !== undefined && value !== null && value !== ''
      );

      navigate(
        {
          pathname: location.pathname,
          search: `?${queryString.stringify(nextQuery)}`,
        },
        {
          replace: true,
        }
      );
    },
    [navigate, location.pathname, queryParams]
  );

  const handlePaginationChange = (page: number, pageSize?: number) => {
    handleUpdateQuery({
      [PAGINATION_QUERY_KEY.PAGE_INDEX]:
        pageSize !== paginationData.pageSize ? DEFAULT_PAGE_INDEX : page,
      [PAGINATION_QUERY_KEY.PAGE_SIZE]: pageSize || paginationData.pageSize,
    });
  };

  const getApiQueryParamsFromUrlQuery = useCallback(
    ({
      keys,
      parser,
      noPagination = false,
      noSort = false,
    }: {
      keys: (keyof T)[];
      parser?: {
        [K in keyof T]?: (value: unknown) => T[K];
      };
      noPagination?: boolean;
      noSort?: boolean;
    }) => {
      const picked = pick(queryParams, keys) as T;

      const parsed = Object.entries(picked).reduce((acc, [key, value]) => {
        if (value == null || value === '') return acc;

        const parseFn = parser?.[key as keyof T];

        acc[key as keyof T] = parseFn ? parseFn(value) : value;

        return acc;
      }, {} as Partial<T>);

      let cleanedParams = pickBy(
        parsed,
        value => value !== null && value !== undefined && value !== ''
      );

      if (!noPagination) {
        cleanedParams = {
          ...cleanedParams,
          ...paginationData,
        };
      }

      if (!noSort) {
        cleanedParams = {
          ...cleanedParams,
          ...sortData,
        };
      }

      return cleanedParams;
    },
    [queryParams, paginationData, sortData]
  );

  const handleTableSort = ({
    order,
    columnKey,
  }: {
    order?: string;
    columnKey?: string;
  }) => {
    handleUpdateQuery({
      [SORT_QUERY_KEY.SORT_BY]: columnKey,
      [SORT_QUERY_KEY.SORT_DIRECTION]:
        order === 'ascend'
          ? SORT_ORDER.ASCENDING
          : order === 'descend'
            ? SORT_ORDER.DESCENDING
            : undefined,
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
    });
  };

  return {
    pagination: paginationData,
    queryParams,
    sortData,
    handlePaginationChange,
    getApiQueryParamsFromUrlQuery,
    handleTableSort,
    handleUpdateQuery,
  };
};
