import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { findNextChats } from './asyncActions';
import { SearchBy, SearchState } from './types';

const initialState: SearchState = {
  searching: false,
  searchValue: '',
  by: SearchBy.CHATS_AND_MESSAGES,
  chats: {
    value: [],
    status: Status.LOADING,
    page: 0,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearching(state) {
      state.searching = true;
    },
    stopSearching(state) {
      state.searching = false;
      state.searchValue = '';
      state.by = SearchBy.CHATS_AND_MESSAGES;
      state.chats = {
        value: [],
        status: Status.LOADING,
        page: 0,
      };
    },
    // TODO: use PayloadAction in each slice
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSearchBy(state, action: PayloadAction<SearchBy>) {
      state.by = action.payload;
    },
    clearSearch(state) {
      state.chats = {
        value: [],
        status: Status.LOADING,
        page: 0,
      };
    },
  },
  extraReducers(builder) {
    // --- findChats ---

    builder.addCase(findNextChats.pending, (state) => {
      state.chats.status = Status.LOADING;
      state.chats.page += 1;
    });

    builder.addCase(findNextChats.fulfilled, (state, action) => {
      state.chats.value.push(...action.payload);

      if (action.payload.length < action.meta.arg.size) {
        state.chats.status = Status.FULL_LOADED;
      } else {
        state.chats.status = Status.SUCCESS;
      }
    });

    builder.addCase(findNextChats.rejected, (state) => {
      state.chats.status = Status.ERROR;
    });
  },
});

export const { startSearching, stopSearching, setSearchValue, setSearchBy, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
