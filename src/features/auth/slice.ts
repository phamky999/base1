import { createSlice } from '@reduxjs/toolkit';
import { authQueryApi } from './query';
import { type TAuthState } from './types';

const initialState: TAuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const { GetCurrentUser } = authQueryApi.endpoints;

    builder.addMatcher(GetCurrentUser.matchFulfilled, (state, { payload }) => {
      state.currentUser = payload?.data ?? null;
    });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
