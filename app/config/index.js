require('dotenv').config();

module.exports = {
    URL_PREFIX: process.env.URL_PREFIX,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN
  };
  