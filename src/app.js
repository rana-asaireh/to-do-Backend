import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes.js';
import tasksRoutes from './modules/tasks/tasksRoutes.js';


const app = express();

app.use(cors({
  origin: 'https:to-do-frontend-lg4xxg1jz-rana-asairehs-projects.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);


export default app;




