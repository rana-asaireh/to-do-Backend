import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: process.env.PORT,
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_USER_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
  },  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_USER_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
  }
};
export default config;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
