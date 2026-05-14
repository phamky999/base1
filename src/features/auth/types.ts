import { USER_PERMISSIONS, USER_ROLE } from './constants';

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TUserPermission =
  (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];

export type TUserInfo = {
  id: string;
  username: string;
  displayName: string;
  providerCode: string;
  role: TUserRole;
  email: string;
  phone: string;
  isActive: boolean;
  permissions: TUserPermission;
  avatar?: string;
};

export type TUserSignInPayload = {
  username: string;
  password: string;
};

export type TUserSignInSuccessResponse = {
  accessToken: string;
  accessTokenExpiresIn: number; // seconds
  refreshToken: string;
  refreshTokenExpiresIn: number; // seconds
  user: TUserInfo;
};

export type TAuthState = {
  currentUser: TUserInfo | null;
};

export type TRefreshAuthTokenResponse = TUserSignInSuccessResponse;
