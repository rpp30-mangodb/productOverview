const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    PORT: process.env.CLIENT
  },
  server: {
    HOST: process.env.HOST,
    PORT: process.env.SERVER
  },
  db: {
    HOST: process.env.HOST,
    PORT: process.env.DB,
    NAME: process.env.NAME
  }
};

module.exports = config;