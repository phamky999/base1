import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const mql =
  typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null;

const subscribe = (callback: () => void) => {
  if (!mql) return () => {};
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getSnapshot = () => {
  return mql ? mql.matches : false;
};

const getServerSnapshot = () => {
  return false;
};

export const useIsMobile = () => {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
