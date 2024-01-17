import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('hellow world');
});
app.listen(process.env.PORT, () => {
  console.log('server is running');
});
