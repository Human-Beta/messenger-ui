import { Status } from '../../@types/status';
import { RootState } from '../store';
import { SearchBy } from './types';

export const isSearhing = (state: RootState): boolean => state.search.searching;

export const getSearchValue = (state: RootState): string => state.search.searchValue;

export const getSearchBy = (state: RootState): SearchBy => state.search.by;

export const getFoundChats = (state: RootState): Chat[] => state.search.chats.value;

export const getInitChatsStatus = (state: RootState): Status => state.search.chats.initStatus;

export const getNextChatsStatus = (state: RootState): Status => state.search.chats.status;

export const getUnknownUsers = (state: RootState): User[] => state.search.unknownUsers.value;

export const getInitUnknownUsersStatus = (state: RootState): Status =>
  state.search.unknownUsers.initStatus;
export const getNextUnknownUsersStatus = (state: RootState): Status =>
  state.search.unknownUsers.status;
