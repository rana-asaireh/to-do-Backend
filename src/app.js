import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './modules/auth/authRoutes.js';
import tasksRoutes from './modules/tasks/tasksRoutes.js';


const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);


export default app;




