import io from 'socket.io-client'

const socket = io('http://127.0.0.1:7001', {
  path: '/jenkins'
})

socket.on('connect', () => {
  console.log('连接成功')
})

socket.on('disconnect', () => {
  console.log('连接成功')
})

socket.on('error', () => {
  console.log('连接成功')
})

socket.on('client_connect', () => {
  console.log('连接成功')
})


export default socket