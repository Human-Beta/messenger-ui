import { RootState } from '../store';

export const getMessages = (state: RootState) => state.message.messages;
