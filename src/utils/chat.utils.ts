export const isNewChat = (chat: Chat): boolean =>
  chat.initialLastMessage === undefined || chat.initialLastMessage === null;

export const isNotNewChat = (chat: Chat): boolean => !isNewChat(chat);
