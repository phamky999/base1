import type { RootState } from '@/app/redux/store';

export const currentUserSelector = (state: RootState) => state.auth.currentUser;
