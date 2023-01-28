interface Message {
  id?: number;
  localId?: string;
  senderId: number;
  chatId: number;
  value: string;
  status: Status;
  date: string;
}
