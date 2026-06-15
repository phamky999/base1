export const SYSTEM_MANAGEMENT_TAGS = {
  ACCOUNT: 'SystemAccount',
  ACCOUNT_DETAIL: 'SystemAccountDetail',
  EMAIL_CONFIG: 'SystemEmailConfig',
} as const;

export type SystemManagementTagType =
  (typeof SYSTEM_MANAGEMENT_TAGS)[keyof typeof SYSTEM_MANAGEMENT_TAGS];

export const SYSTEM_MANAGEMENT_TAG_IDS = {
  LIST: 'LIST',
} as const;
