import config from './config.js';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'production';
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);
