import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import messageApi from '../../api/message';
import messageUtils from '../../utils/message.utils';
import { RootState } from '../store';
import { GetMessagesParams } from './types';

const PAGE_SIZE = 30;

export const getInitMessagesFromChat = createAsyncThunk<Message[], GetMessagesParams>(
  'message/getInitMessagesFromChat',
  async ({ chatId }) => {
    const { data } = await messageApi.getMessagesFromChat(
      chatId,
      // TODO: move ALL usages of the moment to the date.utils
      moment().toISOString(),
      PAGE_SIZE,
    );

    return data;
  },
);

export const getNextMessagesFromChat = createAsyncThunk<Message[], GetMessagesParams>(
  'message/getMessagesFromNextPage',
  async ({ chatId }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const sinceDate = messageUtils.getFirstMessage(state.message.messages[chatId]).date;

    const { data } = await messageApi.getMessagesFromChat(chatId, sinceDate, PAGE_SIZE);

    return data;
  },
);

export const sendMessage = createAsyncThunk<Message, MessageRequest>(
  'message/sendMessage',
  async (messageRequest) => {
    const { data } = await messageApi.sendMessage(messageRequest);

    return data;
  },
);
