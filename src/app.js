import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes.js';
import tasksRoutes from './modules/tasks/tasksRoutes.js';


const app = express();

const allowedOrigins = [
  'https://to-do-frontend-mu-plum.vercel.app',
  'https://to-do-frontend-lg4xxg1jz-rana-asairehs-projects.vercel.app'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);


export default app;




