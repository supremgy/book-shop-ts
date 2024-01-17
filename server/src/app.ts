import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/users';
dotenv.config();

const app: Express = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log('server is running');
});

app.use('/users', userRouter);
