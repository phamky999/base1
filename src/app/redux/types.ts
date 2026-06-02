import type { FetchArgs } from '@reduxjs/toolkit/query';

export type QueryResponse<T> = {
  data: T;
  message: string;
  code: number;
};

export type TCustomExtraOptions = {
  skipGlobalErrorHandler?: boolean;
};

export type TCustomFetchArgs = FetchArgs & {
  extraOptions?: TCustomExtraOptions;
};
