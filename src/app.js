import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes.js';
import tasksRoutes from './modules/tasks/tasksRoutes.js';


const app = express();

// TRUST PROXY: needed for secure cookies behind Render proxy
app.set('trust proxy', 1);


const allowedOrigins = [
  'https://to-do-frontend-mu-plum.vercel.app',
  'https://to-do-frontend-lg4xxg1jz-rana-asairehs-projects.vercel.app'
];

const corsOptions = {
  origin: function(origin, callback) {
    // allow server-to-server requests like Postman (no origin)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    // Reject requests from unknown origins
    return callback(null, false); // do NOT throw new Error
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));




app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);


export default app;




