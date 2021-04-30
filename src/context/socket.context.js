import { createContext } from 'react';
import io from 'socket.io-client';
import config from '../constants/config';

const server = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
export const socket = io.connect(server);
export const SocketContext = createContext();
