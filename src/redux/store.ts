import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createNewChat } from '../services/chat.service';
import { removeAccessToken } from '../services/localStorage.service';
import { removeSocketIfPresent } from '../services/socket.service';
import { isNewChat } from '../utils/chat.utils';
import authReducer from './auth/slice';
import chatReducer from './chat/slice';
import { ChatState } from './chat/types';
import messageReducer from './message/slice';
import { MessageState } from './message/types';
import searchReducer from './search/slice';
import { SearchState } from './search/types';
import userReducer from './user/slice';
import { UserState } from './user/types';
import produce from 'immer';

const USER_LOGOUT_ACTION_TYPE = 'USER_LOGOUT';
const CREATE_NEW_CHAT_ACTION_TYPE = 'CREATE_NEW_CHAT';
const SAVE_CREATED_NEW_CHAT_TYPE = 'SAVE_CREATED_NEW_CHAT';
const DELETE_NEW_CHAT_ACTION_TYPE = 'DELETE_NEW_CHAT';

export const LOGOUT_USER_ACTION: Action = {
  type: USER_LOGOUT_ACTION_TYPE,
};
export const createNewChatAction = (user: User): PayloadAction<User> => ({
  type: CREATE_NEW_CHAT_ACTION_TYPE,
  payload: user,
});
export const saveCreatedNewChatAction = (newId: number): PayloadAction<number> => ({
  type: SAVE_CREATED_NEW_CHAT_TYPE,
  payload: newId,
});
export const DELETE_NEW_CHAT_ACTION: Action = {
  type: DELETE_NEW_CHAT_ACTION_TYPE,
};

const appReducer = combineReducers({
  chat: chatReducer,
  message: messageReducer,
  user: userReducer,
  auth: authReducer,
  search: searchReducer,
});

const getNewChat = (state: RootState) => state!.chat.chats.findIndex((c) => isNewChat(c));

const rootReducer: Reducer<
  {
    chat: ChatState;
    message: MessageState;
    user: UserState;
    auth: {};
    search: SearchState;
  },
  AnyAction
> = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === USER_LOGOUT_ACTION_TYPE) {
    removeAccessToken();
    removeSocketIfPresent();

    state = undefined;
  } else if (state && action.type === CREATE_NEW_CHAT_ACTION_TYPE) {
    const newChat = createNewChat(action.payload);

    state = produce(state, (draftState) => {
      draftState.chat.chats.push(newChat);
      draftState.chat.selectedChat = newChat;
    });
  } else if (state && action.type === SAVE_CREATED_NEW_CHAT_TYPE) {
    const index = getNewChat(state);
    const chatId = action.payload;

    state = produce(state, (draftState) => {
      draftState.chat.chats[index].id = chatId;
      draftState.message.messages[chatId] = [];
    });
  } else if (state && action.type === DELETE_NEW_CHAT_ACTION_TYPE) {
    const index = getNewChat(state);

    if (index >= 0) {
      state = produce(state, (draftState) => {
        draftState.chat.selectedChat = null;
        draftState.chat.chats.splice(index, 1);
      });
    }
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // TODO: remove?
  // TODO: is it OK? It is used to prevent an error related to saving Date to the storage.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
