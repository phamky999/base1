import { AppBreadcrumbs } from '@/components/app-breadcrumbs';
import type { ReactNode } from 'react';

type AppPageHeaderProps = {
  title: string;
  description?: string;
  addon?: ReactNode;
  showBreadcrumbs?: boolean;
};

export const AppPageHeader = ({
  title,
  description,
  addon,
  showBreadcrumbs = true,
}: AppPageHeaderProps) => {
  return (
    <div className="mb-6 space-y-1">
      {showBreadcrumbs && (
        <div className="block md:hidden">
          <AppBreadcrumbs />
        </div>
      )}
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
