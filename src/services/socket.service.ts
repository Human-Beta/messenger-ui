import io from 'socket.io-client';
import { getAccessToken } from './localStorage.service';
import config from "../config";

let socket: any = null;

// TODO: remove alerts? or add check if it is debug mode?
// Example:
// if (debug) {
//    alert("message");
// }
// TODO: or just add logger?

export const getSocket = () => {
  requireInit();

  return socket;
};

const requireInit = () => {
  if (!socket) {
    alert('Socket has not been initialized yet!!!');
    return;
  }
};

const requireConnection = () => {
  if (socket.disconnected) {
    alert('Socket connection has not been established yet!!!');
    return;
  }
};

const requireDisconnection = () => {
  if (socket.connected) {
    alert('Socket connection has been established already!!!');
    return;
  }
};

export const initSocket = (autoConnect?: boolean) => {
  if (socket) {
    alert('Socket has been initialized already!!!');
    return;
  }

  const token = getAccessToken();
  if (!token) {
    alert('There is no access token in local storage!!!');
    return;
  }

  // TODO: url from props
  socket = io(`http://${config.SERVER_HOST}:${config.SERVER_SOCKET_PORT}/messenger`, {
    autoConnect,
    transports: ['polling', 'websocket'],
    query: {
      token,
    },
  });
};

export const removeSocket = () => {
  requireInit();

  closeConnection();

  socket = null;
};

export const removeSocketIfPresent = () => {
  if (!socket) {
    // TODO: logger
    console.log('Socket has not been initialized yet.');
    return;
  }

  closeConnection();

  socket = null;
};

export const openConnection = () => {
  requireInit();
  requireDisconnection();

  socket.open();
};

export const closeConnection = () => {
  requireInit();
  requireConnection();

  socket.close();
};

export const initSocketAndOpen = () => {
  initSocket(true);
};
