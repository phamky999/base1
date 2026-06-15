import type { TUserPermission, TUserRole } from '@/features/auth/types';

export type TGetAccountListParams = {
  username?: string;
  email?: string;
  phone?: string;
  displayName?: string;
};

export type TAccountListItem = {
  id: string;
  username: string;
  displayName: string;
  providerCode: string;
  role: TUserRole;
  email: string;
  phone: string;
  isActive: boolean;
};

export type TAccountDetail = TAccountListItem & {
  permissions: TUserPermission;
};

export type TGetAccountListResponse = {
  users: TAccountListItem[];
};

export type TUpdateAccountParams = {
  displayName: string;
  role: TUserRole;
  email: string;
  phone: string;
  permissions: TUserPermission;
  isActive: boolean;
};

export type TCreateAccountParams = {
  username: string;
  displayName: string;
  providerCode: string;
  password: string;
  role: TUserRole;
  email: string;
  phone: string;
  permissions: TUserPermission;
};

export type TGetEmailConfigResponse = {
  email: string;
  password: string;
  host: string;
  port: number;
  senderName: string;
  ccEmail: string;
  enableSSL: boolean;
};

export type TUpdateEmailConfigParams = {
  email: string;
  password: string;
  host: string;
  port: number;
  senderName: string;
  ccEmail: string;
  enableSSL: boolean;
};
