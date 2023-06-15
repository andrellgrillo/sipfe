import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: 50123,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
