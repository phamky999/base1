export const appPathConfig = {
  auth: {
    root: '/auth',
    login: 'login',
  },

  portal: {
    root: '/',
    flightManagement: {
      root: 'flight-management',
      flightList: {
        root: 'list',
        createFlight: 'create',
        flightDetail: ':id',
      },
      bookingList: 'booking-list',
      ticketConditions: 'ticket-conditions',
    },
    systemManagement: {
      root: 'system-management',
      accountList: 'account-list',
      emailConfig: 'email-config',
      notificationConfig: 'notification-config',
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
      appPathConfig.portal.flightManagement.root,
      appPathConfig.portal.flightManagement.flightList.root
    ),

  createFlightPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightManagement.root,
      appPathConfig.portal.flightManagement.flightList.root,
      appPathConfig.portal.flightManagement.flightList.createFlight
    ),

  flightDetailPage: (id: string) =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightManagement.root,
      appPathConfig.portal.flightManagement.flightList.root,
      id
    ),

  flightBookingListPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightManagement.root,
      appPathConfig.portal.flightManagement.bookingList
    ),

  flightTicketConditionsPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.flightManagement.root,
      appPathConfig.portal.flightManagement.ticketConditions
    ),

  accountListPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.systemManagement.root,
      appPathConfig.portal.systemManagement.accountList
    ),

  emailConfigPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.systemManagement.root,
      appPathConfig.portal.systemManagement.emailConfig
    ),

  notificationConfigPage: () =>
    handleGetAbsolutePathConfig(
      appPathConfig.portal.systemManagement.root,
      appPathConfig.portal.systemManagement.notificationConfig
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
