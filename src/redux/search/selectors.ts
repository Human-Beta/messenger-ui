import { Status } from '../../@types/status';
import { RootState } from '../store';
import { SearchBy } from './types';

export const isSearhing = (state: RootState): boolean => state.search.searching;

export const getSearchValue = (state: RootState): string => state.search.searchValue;

export const getSearchBy = (state: RootState): SearchBy => state.search.by;

export const getFoundChats = (state: RootState): Chat[] => state.search.chats.value;

export const getChatsStatus = (state: RootState): Status => state.search.chats.status;
