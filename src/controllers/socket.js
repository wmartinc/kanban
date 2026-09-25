import socket from 'socket.io-client'

const VITE_SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT

const ioClient = socket(VITE_SOCKET_ENDPOINT, {withCredentials: true});

export { ioClient };