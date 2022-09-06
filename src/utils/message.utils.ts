const utils = {
  getLastMessage: (messages: Message[]) => messages[0],
  getFirstMessage: (messages: Message[]) => messages[messages.length - 1],
};

export default utils;
