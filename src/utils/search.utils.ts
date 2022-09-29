export const extractChatName = (value: string) => {
  return value.replaceAll('@', '').trim();
};
