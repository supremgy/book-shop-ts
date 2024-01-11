import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('hellow world');
});
app.listen(8080, () => {
  console.log('server is running');
});
