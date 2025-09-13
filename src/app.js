import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes.js';
import tasksRoutes from './modules/tasks/tasksRoutes.js';


const app = express();

// TRUST PROXY: needed for secure cookies behind Render proxy
app.set('trust proxy', 1);

// const allowedOrigins = [
//   'https://to-do-frontend-mu-plum.vercel.app',
//   'https://to-do-frontend-lg4xxg1jz-rana-asairehs-projects.vercel.app'
// ];
// app.use(cors({
//   origin:  function(origin, callback) {
//     if (!origin) return callback(null, true);
//     const normalizedOrigin = origin.replace(/\/$/, '');
//     if (allowedOrigins.some(url => url.replace(/\/$/, '') === normalizedOrigin)) {
//       return callback(null, true);
//     }
//     const msg = `CORS error: origin ${origin} not allowed`;
//     return callback(new Error(msg), false);
//   },
//   credentials: true,
// }));


// const allowedOrigins = [
//   'https://to-do-frontend-mu-plum.vercel.app',
//   'https://to-do-frontend-lg4xxg1jz-rana-asairehs-projects.vercel.app'
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman / server requests
//     const normalizedOrigin = origin.replace(/\/$/, '');
//     if (allowedOrigins.some(url => url.replace(/\/$/, '') === normalizedOrigin)) {
//       return callback(null, true);
//     }
//     return callback(new Error(`CORS error: origin ${origin} not allowed`), false);
//   },
//   credentials: true, 
// }));

// // Preflight OPTIONS requests
// app.options('*', cors({ origin: allowedOrigins, credentials: true }));
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server requests
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.some(url => url.replace(/\/$/, '') === normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS error: origin ${origin} not allowed`), false);
  },
  credentials: true,
}));

app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.some(url => url.replace(/\/$/, '') === normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS error: origin ${origin} not allowed`), false);
  },
  credentials: true,
}));





app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);


export default app;




