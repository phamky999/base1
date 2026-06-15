import { baseApi } from '@/app/redux/baseApi';
import authReducer from '@/features/auth/slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: import.meta.env.DEV
        ? {
            ignoredPaths: ['scanner.onScan', 'modals'],
            ignoredActionPaths: [
              'payload.onScan',
              'payload.element',
              'meta.arg',
              'meta.baseQueryMeta',
            ],
          }
        : false,
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
