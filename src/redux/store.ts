import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chatReducer from './chat/slice';
import messageReducer from './message/slice';
import userReducer from './user/slice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    message: messageReducer,
    user: userReducer,
  },
  // TODO: is it OK? It is used to prevent an error related to saving Date to the storage.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
