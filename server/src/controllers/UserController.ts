import { Request, Response } from 'express';

export const join = (req: Request, res: Response) => {
  const { email, password } = req.body;
};
export const login = (req: Request, res: Response) => {
  res.json('로그인');
};
export const passwordRequestReset = (req: Request, res: Response) => {
  res.json('비밀번호 초기화 (요청)');
};
export const passwordReset = (req: Request, res: Response) => {
  res.json('비밀번호 초기화 (최종 수정)');
};
