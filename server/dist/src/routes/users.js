"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
//회원가입
router.post('/join', UserController_1.join);
//로그인
router.post('/login', UserController_1.login);
//비밀번호 초기화 (요청)
router.post('/reset', UserController_1.passwordRequestReset);
//비밀번호 초기화 (최종 수정)
router.put('/reset', UserController_1.passwordReset);
exports.default = router;
