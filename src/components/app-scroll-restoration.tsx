import { type PropsWithChildren, useEffect } from 'react';

export const AppScrollRestoration = ({ children }: PropsWithChildren) => {
  useEffect(
    () => () => {
      document.getElementById('main')?.scrollTo(0, 0);
    },
    []
  );
  return <>{children}</>;
};
