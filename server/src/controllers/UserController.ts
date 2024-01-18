import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import conn from '../db/mariadb';
import { validate } from '../middlewares/validate';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';

const jwtSecretKey: string = '';
const jwtExpiresInTime: string = '2m';
const bcryptSaltRounds: number = 10;
type User = {
  email: string;
  password: string;
};
export const join = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const salt = await bcrypt.genSalt(bcryptSaltRounds);
  const hasedPW = await bcrypt.hash(password, salt);
  let values = [email, hasedPW];
  let sql: string = 'INSERT INTO users (email, password) VALUES (?,?)';
  conn.query(sql, values, (err, results: ResultSetHeader) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows) {
      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};
export const login = (eq: Request, res: Response) => {
  res.json('로그인');
};
export const passwordRequestReset = (req: Request, res: Response) => {
  res.json('비밀번호 초기화 (요청)');
};
export const passwordReset = (req: Request, res: Response) => {
  conn.query('SELECT * FROM users', (err, results) => {
    res.status(StatusCodes.OK).json(results);
  });
};
