type Message = {
  id?: number;
  localId: number;
  senderId: number;
  chatId: number;
  value: string;
  status: Status;
  date: string;
};
