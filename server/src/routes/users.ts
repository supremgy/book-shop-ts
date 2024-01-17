import express from 'express';
import {
  join,
  login,
  passwordRequestReset,
  passwordReset,
} from '../controllers/UserController';
const router = express.Router();

//회원가입
router.post('/join', join);
//로그인
router.post('/login', login);
//비밀번호 초기화 (요청)
router.post('/reset', passwordRequestReset);
//비밀번호 초기화 (최종 수정)
router.put('/reset', passwordReset);

export default router;
