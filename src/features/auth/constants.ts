export const USER_ROLE = {
  ADMIN: 'ADMIN',
} as const;

export const USER_ROLES_LABEL = {
  [USER_ROLE.ADMIN]: 'Quản trị',
} as const;

export const USER_PERMISSIONS = {
  FLIGHT: 'FLIGHT',
} as const;

export const USER_ROLES_OPTIONS = [
  { value: USER_ROLE.ADMIN, label: USER_ROLES_LABEL[USER_ROLE.ADMIN] },
];

export const USER_ACTIVE_STATUS_OPTIONS = [
  { value: true, label: 'Hoạt động' },
  { value: false, label: 'Không hoạt động' },
];
