import type { ReactNode } from 'react';

type AppPageHeaderProps = {
  title: string | ReactNode;
  description?: string | ReactNode;
  addon?: ReactNode;
};

export const AppPageHeader = ({
  title,
  description,
  addon,
}: AppPageHeaderProps) => {
  return (
    <div className="mb-6 space-y-1">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold lg:text-2xl">{title}</h1>
          {!!description && (
            <p className="text-base text-gray-800">{description}</p>
          )}
        </div>
        {!!addon && addon}
      </div>
    </div>
  );
};
