const utils = {
  getLastMessage: (messages: Message[]): Message => messages[0],
  getFirstMessage: (messages: Message[]): Message => messages[messages.length - 1],
};

export default utils;
