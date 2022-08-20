import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../services/localStorage.service';
import authReducer from './auth/slice';
import chatReducer from './chat/slice';
import { ChatState } from './chat/types';
import messageReducer from './message/slice';
import { MessageState } from './message/types';
import userReducer from './user/slice';
import { UserState } from './user/types';

const USER_LOGOUT_ACTION_TYPE = 'USER_LOGOUT';

export const LOGOUT_USER_ACTION = {
  type: USER_LOGOUT_ACTION_TYPE,
};

const appReducer = combineReducers({
  chat: chatReducer,
  message: messageReducer,
  user: userReducer,
  auth: authReducer,
});

const rootReducer: Reducer<
  {
    chat: ChatState;
    message: MessageState;
    user: UserState;
    auth: {};
  },
  AnyAction
> = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === USER_LOGOUT_ACTION_TYPE) {
    removeAccessToken();
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // TODO: is it OK? It is used to prevent an error related to saving Date to the storage.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
