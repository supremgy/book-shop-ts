import express from 'express';
import { body } from 'express-validator';
import {
  join,
  login,
  passwordRequestReset,
  passwordReset,
} from '../controllers/UserController';
import { validate } from '../middlewares/validate';
const router = express.Router();
const validation = [
  body('email').trim().notEmpty().isEmail().withMessage('email을 입력하세요.'),
  body('password')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('password를 입력하세요.'),
  validate,
];
//회원가입
router.post('/join', validation, join);
//로그인
router.post('/login', validation, login);
//비밀번호 초기화 (요청)
router.post('/reset', passwordRequestReset);
//비밀번호 초기화 (최종 수정)
router.get('/reset', passwordReset);

export default router;
