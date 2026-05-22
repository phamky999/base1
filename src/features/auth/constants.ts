export const USER_ROLE = {
  ADMIN: 'ADMIN',
} as const;

export const USER_ROLES_LABEL = {
  [USER_ROLE.ADMIN]: 'Quản trị',
} as const;

export const USER_PERMISSIONS = {
  FLIGHT: 'FLIGHT',
} as const;

export const USER_PERMISSIONS_LABEL = {
  [USER_PERMISSIONS.FLIGHT]: 'Kho vé máy bay',
} as const;

export const USER_ROLES_OPTIONS = [
  { value: USER_ROLE.ADMIN, label: USER_ROLES_LABEL[USER_ROLE.ADMIN] },
];

export const USER_PERMISSIONS_OPTIONS = [
  {
    value: USER_PERMISSIONS.FLIGHT,
    label: USER_PERMISSIONS_LABEL[USER_PERMISSIONS.FLIGHT],
  },
];
