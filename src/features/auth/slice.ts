import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type TAuthState, type TUserInfo } from './types';

const initialState: TAuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TUserInfo | null>) => {
      state.currentUser = action.payload;
    },

    logout() {
      return initialState;
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
