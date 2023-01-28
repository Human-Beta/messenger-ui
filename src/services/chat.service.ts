import { NEW_CHAT_ID } from '../constants/chat.constants';

export const createNewChat = (user: User): Chat => ({
  id: NEW_CHAT_ID,
  name: user.name,
  chatName: user.nickname,
  imageUrl: user.avatarUrl,
});
