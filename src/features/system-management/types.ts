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
