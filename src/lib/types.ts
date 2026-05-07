/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PAGINATION_QUERY_KEY, TOKEN } from '@/lib/constants';
import type { ReactNode } from 'react';
import type { UIMatch } from 'react-router-dom';

/** Get extracted type from an Array Type */
export type Unpacked<T> = T extends (infer U)[] ? U : T;

/** Type for Object with unknown value type */
export type ObjectType = Record<string, any>;

/** Get type that would ensure such member will be added using Strictly Union */
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;

/** Convert a type with deeply nested type into partial/optional */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type TAppRouteHandle = {
  crumb?: (match: UIMatch) => ReactNode;
  clickable?: boolean;
};

export type TAppRoute = {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TAppRoute[];
  handle?: TAppRouteHandle;
};

export type TAppUIMatch = UIMatch<unknown, TAppRouteHandle | undefined>;

export type TAuthToken = (typeof TOKEN)[keyof typeof TOKEN];
export type TPaginationQueryKey =
  (typeof PAGINATION_QUERY_KEY)[keyof typeof PAGINATION_QUERY_KEY];
