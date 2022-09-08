import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { Status } from '../../@types/status';
import messageApi from '../../api/message';
import messageUtils from '../../utils/message.utils';
import { RootState } from '../store';
import { GetMessagesParams } from './types';

export const getInitMessagesFromChat = createAsyncThunk<Message[], GetMessagesParams>(
  'message/getInitMessagesFromChat',
  async ({ chatId, size }) => {
    const { data } = await messageApi.getMessagesFromChat(
      chatId,
      // TODO: move ALL usages of the moment to the date.utils
      moment().toISOString(),
      size,
    );

    return data;
  },
);

export const getNextMessagesFromChat = createAsyncThunk<Message[], GetMessagesParams>(
  'message/getMessagesFromNextPage',
  async ({ chatId, size }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const sinceDate = messageUtils.getFirstMessage(state.message.messages[chatId]).date;

    const { data } = await messageApi.getMessagesFromChat(chatId, sinceDate, size);

    return data;
  },
  {
    condition: ({ chatId }, { getState }) => {
      const state = getState() as RootState;

      if (state.message.messagesStatuses[chatId] === Status.FULL_LOADED) {
        return false;
      }
    },
  },
);

export const sendMessage = createAsyncThunk<Message, MessageRequest>(
  'message/sendMessage',
  async (messageRequest) => {
    const { data } = await messageApi.sendMessage(messageRequest);

    return data;
  },
);
