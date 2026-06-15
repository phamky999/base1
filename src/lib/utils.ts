import { TOKEN } from '@/lib/constants';
import type { TAuthToken } from '@/lib/types';
import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { lazy, type ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * @param factory - Hàm import()
 * @param name - Tên của Component được export
 */
export const lazyNamedExport = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, ComponentType<any>>,
  K extends keyof T,
>(
  factory: () => Promise<T>,
  name: K
) => {
  return lazy(() =>
    factory().then(module => ({
      default: module[name],
    }))
  );
};

/** Set application auth token
 * @param tokenType
 * @param token
 * @param expiration chỉ truyền vào số giây
 * */
export const setAuthToken = (
  tokenType: TAuthToken,
  token: string,
  expiration?: number
) => {
  Cookies.set(tokenType, token, {
    expires: new Date(Date.now() + ((expiration ?? 86400) - 60) * 1000),
  });
};

export const getAuthToken = (tokenType: TAuthToken): string | null => {
  const token = Cookies.get(tokenType);
  if (!token) return null;
  return token;
};

export const clearAuthToken = () => {
  Cookies.remove(TOKEN.ACCESS_TOKEN);
  Cookies.remove(TOKEN.REFRESH_TOKEN);
};
