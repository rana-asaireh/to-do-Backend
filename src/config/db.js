// import config from './config.js';
// import { Sequelize } from 'sequelize';

// const env = process.env.NODE_ENV || 'production';
// const dbConfig = config[env];

// export const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//   }
// );
// import config from './config.js';
// import { Sequelize } from 'sequelize';

// const env = process.env.NODE_ENV || 'production';
// const dbConfig = config[env];

// export const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     port: parseInt(dbConfig.port), 
//     dialect: dbConfig.dialect,
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, 
//       },
//     },
//   }
// );
import fs from 'fs';
import { Sequelize } from 'sequelize';
import config from './config.js';

const env = process.env.NODE_ENV || 'production';
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: parseInt(dbConfig.port),
    dialect: dbConfig.dialect,
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CA_PATH),
      },
      connectTimeout: 10000, 
    },
  }
);