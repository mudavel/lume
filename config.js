const config =
  process.env.NODE_ENV === 'production'
    ? {
        DB_CONNECTION: process.env.DB_CONNECTION,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        BASE_URL: 'https://lume.vercel.app',
        SERVER_MIDDLEWARE: [],
        SOCKET_URL: 'http://localhost:3000',
      }
    : {
        DB_CONNECTION:
          'mongodb+srv://usuarioteste:testeusuario@primeirocluster.vcadi.mongodb.net/lume-db',
        ACCESS_TOKEN_SECRET:
          'b475cc8573555862655c5eb196ddae4a350c860a9d8bcf0f45d6ed3890889f02e5c1bd290b2f48b0ac1c4554200b576443f1ddf61fb3e9bcc0c07c8e58c9bc29',
        BASE_URL: 'http://localhost:3000',
        SERVER_MIDDLEWARE: ['~/api/app.js', '~/api/ws.js'],
        SOCKET_URL: 'http://localhost:3001',
      }

module.exports = config
