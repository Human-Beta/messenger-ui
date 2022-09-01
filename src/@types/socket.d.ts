// TODO: declare functions
interface MySocket {
  on: (action: string, fun: (arg: any) => void) => void;
  emit: (action: string, arg: any) => void;
}

declare module 'socket.io-client';
