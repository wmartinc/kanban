import socket from 'socket.io-client'

const ioClient = socket('http://localhost:3000', {withCredentials: true}); // Reemplaza con la URL de tu servidor

export { ioClient };