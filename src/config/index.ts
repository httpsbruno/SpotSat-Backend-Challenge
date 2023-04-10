import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  POSTGRES: {
    USER: process.env.USER,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    DBPORT: process.env.DBPORT,
  },
};

export { config };