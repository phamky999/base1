export const appPathConfig = {
  auth: {
    root: '/auth',
    login: 'login',
  },

  portal: {
    root: '/',
    flight: {
      root: 'flight-inventory-management',
      create: 'create',
      detail: {
        root: ':id',
        bookingList: 'booking-list',
      },
    },
  },
} as const;

const absolutePagePaths = {
  loginPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.auth.root,
      appPathConfig.auth.login
    ),

  portalPage: () => '/',

  flightListPage: () =>
    handleGetAbsolutePathConfig(appPathConfig.portal.flight.root),

  createFlightPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flight.root,
      appPathConfig.portal.flight.create
    ),

  flightDetailPage: (id: string) =>
    handleGetAbsolutePathConfig(appPathConfig.portal.flight.root, id),

  flightBookingListPage: (id: string) =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flight.root,
      id,
      appPathConfig.portal.flight.detail.bookingList
    ),
};

export const handleGetAbsolutePathConfig = (...paths: string[]) => {
  const relativePath = paths
    .filter(path => Boolean(path))
    .map(path => path.replace(/^\//, '').replace(/\/$/, ''))
    .join('/');

  return '/' + relativePath;
};

export const getPagePath = <TRoute extends keyof typeof absolutePagePaths>(
  route: TRoute,
  ...params: Parameters<(typeof absolutePagePaths)[TRoute]>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathCb: (...args: any[]) => string = absolutePagePaths[route];
  return pathCb(...params);
};
