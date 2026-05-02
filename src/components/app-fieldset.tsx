import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type AppFieldSetProps = PropsWithChildren & {
  legend: ReactNode | string;
  className?: HTMLAttributes<HTMLFieldSetElement>['className'];
};

export const AppFieldSet = ({ children, legend }: AppFieldSetProps) => {
  return (
    <fieldset className="border-border-primary rounded-lg border px-2 py-2 lg:px-4">
      <legend className="mb-0 inline-block w-auto border-0 px-1 text-sm font-semibold lg:-ml-1">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
};
