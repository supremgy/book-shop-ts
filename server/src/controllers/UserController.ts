import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import conn from '../db/mariadb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isAuth } from '../middlewares/auth';
dotenv.config();
const secretkey: string | undefined = process.env.SECRET_KEY;
const jwtExpiresInTime: string = '10m';
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
export const login = (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  let sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email, async (err, results: RowDataPacket[]) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let loginUser = results[0];
    let isPasswordMatch = await bcrypt.compare(password, loginUser.password);
    if (loginUser && isPasswordMatch) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        secretkey as Secret,
        {
          expiresIn: jwtExpiresInTime,
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
      });
      console.log('token : ', token);

      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};
export const passwordRequestReset = async (req: Request, res: Response) => {
  const test = await isAuth(req, res);
  console.log(test);

  res.json('비밀번호 초기화 (요청)');
};
export const passwordReset = (req: Request, res: Response) => {
  conn.query('SELECT * FROM users', (err, results) => {
    res.status(StatusCodes.OK).json(results);
  });
};
