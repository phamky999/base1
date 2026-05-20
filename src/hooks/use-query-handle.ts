import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PAGINATION_QUERY_KEY,
} from '@/lib/constants';
import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { type ObjectType, type TPaginationQueryKey } from '@/lib/types';
import { pick, pickBy } from 'lodash-es';
import { normalizeQueryParamValue } from '@/components/app-filter/helper';

type QueryHandleProps = {
  noPagination?: boolean;
};

export const useQueryHandle = <T extends ObjectType>(
  props?: QueryHandleProps
) => {
  const { noPagination } = props || {};

  const navigate = useNavigate();
  const location = useLocation();

  const pathName = location.pathname;

  const queryParams = useMemo(
    () =>
      normalizeQueryParamValue(
        queryString.parse(location.search.replace('?', ''))
      ) as T,
    [location.search]
  );

  const {
    [PAGINATION_QUERY_KEY.PAGE_INDEX]: pageIndex,
    [PAGINATION_QUERY_KEY.PAGE_SIZE]: pageSize,
  } = queryParams;

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

  const handleChangeFilter = useCallback(
    (values: T) => {
      const queryPayload = queryString.stringify({
        ...values,
        ...(!noPagination && {
          [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
          [PAGINATION_QUERY_KEY.PAGE_SIZE]:
            paginationData[PAGINATION_QUERY_KEY.PAGE_SIZE],
        }),
      });
      navigate(`${pathName}?${queryPayload}`, {
        replace: true,
      });
    },
    [navigate, noPagination, paginationData, pathName]
  );

  const handleClearFilter = useCallback(() => {
    navigate(pathName, {
      replace: true,
    });
  }, [navigate, pathName]);

  const handleChangePageIndex = useCallback(
    (index: number) => {
      if (index === paginationData[PAGINATION_QUERY_KEY.PAGE_INDEX]) return;
      const queryPayload = queryString.stringify({
        ...queryParams,
        [PAGINATION_QUERY_KEY.PAGE_INDEX]: index,
      });
      navigate(`${pathName}?${queryPayload}`, {
        replace: true,
      });
    },
    [navigate, paginationData, pathName, queryParams]
  );

  const handleChangePageSize = useCallback(
    (size: number) => {
      if (size === paginationData[PAGINATION_QUERY_KEY.PAGE_SIZE]) return;
      const queryPayload = queryString.stringify({
        ...queryParams,
        [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
        [PAGINATION_QUERY_KEY.PAGE_SIZE]: size,
      });
      navigate(`${pathName}?${queryPayload}`, {
        replace: true,
      });
    },
    [navigate, paginationData, pathName, queryParams]
  );

  const getApiQueryParamsFromUrlQuery = useCallback(
    ({
      keys,
      parser,
      noPagination = false,
    }: {
      keys: (keyof T)[];
      parser?: {
        [K in keyof T]?: (value: unknown) => T[K];
      };
      noPagination?: boolean;
    }) => {
      const picked = pick(queryParams, keys) as T;

      const parsed = Object.entries(picked).reduce((acc, [key, value]) => {
        if (value == null || value === '') return acc;

        const parseFn = parser?.[key as keyof T];

        acc[key as keyof T] = parseFn ? parseFn(value) : value;

        return acc;
      }, {} as Partial<T>);

      const cleanedParams = pickBy(
        parsed,
        value => value !== null && value !== undefined && value !== ''
      );

      if (!noPagination) {
        return {
          ...cleanedParams,
          ...paginationData,
        };
      }

      return cleanedParams;
    },
    [queryParams, paginationData]
  );

  return {
    pagination: paginationData,
    queryParams,
    handleChangePageIndex,
    handleChangePageSize,
    handleChangeFilter,
    handleClearFilter,
    getApiQueryParamsFromUrlQuery,
  };
};
