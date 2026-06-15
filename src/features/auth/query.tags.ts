export const AUTH_MANAGEMENT_TAGS = {
  USER: 'AuthUser',
} as const;

export type AuthManagementTagType =
  (typeof AUTH_MANAGEMENT_TAGS)[keyof typeof AUTH_MANAGEMENT_TAGS];

export const AUTH_MANAGEMENT_TAG_IDS = {
  ME: 'ME',
} as const;
