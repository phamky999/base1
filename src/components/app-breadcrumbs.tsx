import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { TAppUIMatch } from '@/lib/types';
import { Fragment, memo } from 'react';
import { Link, useLocation, useMatches } from 'react-router-dom';

export const AppBreadcrumbs = memo(() => {
  const matches = useMatches() as TAppUIMatch[];
  const location = useLocation();
  const isHome = location.pathname === '/';

  let crumbs = matches
    .filter(match => match.handle?.crumb != null)
    .map(match => {
      const crumbFnOrValue = match.handle?.crumb;

      const label =
        typeof crumbFnOrValue === 'function'
          ? crumbFnOrValue(match)
          : crumbFnOrValue;

      return {
        label,
        path: match.pathname,
        clickable: match.handle?.clickable !== false,
      };
    });

  if (!isHome && crumbs.length > 0 && crumbs[0]?.label !== 'Trang chủ') {
    crumbs = [
      {
        label: 'Trang chủ',
        path: '/',
        clickable: true,
      },
      ...crumbs,
    ];
  }

  if (isHome || crumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          const shouldLink = !isLast && crumb.clickable;

          const item = shouldLink ? (
            <BreadcrumbItem>
              <BreadcrumbLink asChild href={crumb.path}>
                <Link
                  to={crumb.path}
                  className="hover:bg-transparent hover:text-primary"
                >
                  {crumb.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );

          return (
            <Fragment key={index}>
              {isLast ? (
                item
              ) : (
                <>
                  {item}
                  <BreadcrumbSeparator />
                </>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
});
