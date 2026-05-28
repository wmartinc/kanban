import socket from 'socket.io-client'

const ioClient = socket('http://localhost:3000'); // Reemplaza con la URL de tu servidor

export { ioClient };