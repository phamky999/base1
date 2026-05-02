import { LOGIN_FORM_FIELDS, USER_ROLE } from './constants';

export type TLoginFormFields =
  (typeof LOGIN_FORM_FIELDS)[keyof typeof LOGIN_FORM_FIELDS];

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TTokenExpires = {
  expireInSeconds: number;
  refreshTokenExpireIn: number;
};

export type TUserInfo = {
  id: number;
  displayName: string;
  userName: string;
  email: string;
  phone: string;
  role: TUserRole;
};

export type TUserSignInPayload = {
  username: string;
  password: string;
};

export type TUserSignInSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  agentUser: TUserInfo;
} & TTokenExpires;

export type TAuthState = {
  currentUser: TUserInfo | null;
};
