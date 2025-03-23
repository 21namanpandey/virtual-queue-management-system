import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ADMIN_SECRET_CODE: process.env.ADMIN_SECRET_CODE,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default config;
