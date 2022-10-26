import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import {
  findInitChats,
  findInitUnknownUsers,
  findNextChats,
  findNextUnknownUsers,
} from './asyncActions';
import { SearchBy, SearchState } from './types';

const initialState: SearchState = {
  searching: false,
  searchValue: '',
  by: SearchBy.CHATS_AND_MESSAGES,
  chats: {
    value: [],
    initStatus: Status.INITIAL,
    status: Status.INITIAL,
    page: 1,
  },
  unknownUsers: {
    value: [],
    initStatus: Status.INITIAL,
    status: Status.INITIAL,
    page: 1,
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
      state.chats.value = [];
      state.chats.initStatus = Status.INITIAL;
      state.chats.status = Status.INITIAL;
      state.chats.page = 1;
      state.unknownUsers.value = [];
      state.unknownUsers.status = Status.INITIAL;
      state.unknownUsers.page = 0;
    },
    // TODO: use PayloadAction in each slice
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSearchBy(state, action: PayloadAction<SearchBy>) {
      state.by = action.payload;
    },
    resetSearch(state) {
      state.chats.initStatus = Status.INITIAL;
      state.chats.status = Status.INITIAL;
      state.unknownUsers.initStatus = Status.INITIAL;
      state.unknownUsers.status = Status.INITIAL;
    },
  },
  extraReducers(builder) {
    // --- findInitChats ---

    builder.addCase(findInitChats.pending, (state) => {
      state.chats.initStatus = Status.LOADING;
      state.chats.page = 1;
    });

    builder.addCase(findInitChats.fulfilled, (state, action) => {
      state.chats.value = action.payload;

      // TODO: move to common method
      if (action.payload.length < action.meta.arg.size) {
        state.chats.initStatus = Status.FULL_LOADED;
      } else {
        state.chats.initStatus = Status.SUCCESS;
      }
    });

    builder.addCase(findInitChats.rejected, (state) => {
      state.chats.initStatus = Status.ERROR;
    });

    // --- findNextChats ---

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

    // find init unknown users

    builder.addCase(findInitUnknownUsers.pending, (state) => {
      state.unknownUsers.initStatus = Status.LOADING;
      state.unknownUsers.page = 1;
    });

    builder.addCase(findInitUnknownUsers.fulfilled, (state, action) => {
      state.unknownUsers.value = action.payload;

      if (action.payload.length < action.meta.arg.size) {
        state.unknownUsers.initStatus = Status.FULL_LOADED;
      } else {
        state.unknownUsers.initStatus = Status.SUCCESS;
      }
    });

    builder.addCase(findInitUnknownUsers.rejected, (state) => {
      state.unknownUsers.initStatus = Status.ERROR;
    });

    // find next unknown users

    builder.addCase(findNextUnknownUsers.pending, (state) => {
      state.unknownUsers.status = Status.LOADING;
      state.unknownUsers.page += 1;
    });

    builder.addCase(findNextUnknownUsers.fulfilled, (state, action) => {
      state.unknownUsers.value.push(...action.payload);

      if (action.payload.length < action.meta.arg.size) {
        state.unknownUsers.status = Status.FULL_LOADED;
      } else {
        state.unknownUsers.status = Status.SUCCESS;
      }
    });

    builder.addCase(findNextUnknownUsers.rejected, (state) => {
      state.unknownUsers.status = Status.ERROR;
    });
  },
});

export const { startSearching, stopSearching, setSearchValue, setSearchBy, resetSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
