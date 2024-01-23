import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();
const AUTH_ERROR = { message: 'Authentication Error' };
const secretKey: string | undefined = process.env.SECRET_KEY;

export const isAuth = async (
  req: Request,
  res: Response
): Promise<string | jwt.JwtPayload | undefined> => {
  const authHeader = req.headers['authorization'];
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(StatusCodes.UNAUTHORIZED).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey as Secret, (err, decoded) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: '로그인 세션이 만료됨',
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: '잘못된 토큰이야',
      });
    }
    console.log('decoded', decoded);

    return decoded;
  });
};
