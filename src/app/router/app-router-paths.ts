export const appPathConfig = {
  auth: {
    root: '/auth',
    login: 'login',
  },

  portal: {
    root: '/',
    flightInventoryManagement: {
      root: 'flight-inventory-management',
      createFlight: 'create',
      flightDetail: ':id',
      bookingList: 'booking-list',
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
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightInventoryManagement.root
    ),

  createFlightPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightInventoryManagement.root,
      appPathConfig.portal.flightInventoryManagement.createFlight
    ),

  flightDetailPage: (id: string) =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightInventoryManagement.root,
      id
    ),

  flightBookingListPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightInventoryManagement.root,
      appPathConfig.portal.flightInventoryManagement.bookingList
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
