"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController_1 = require("../controllers/UserController");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
const validation = [
    (0, express_validator_1.body)('email').trim().notEmpty().isEmail().withMessage('email을 입력하세요.'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('password를 입력하세요.'),
    validate_1.validate,
];
//회원가입
router.post('/join', validation, UserController_1.join);
//로그인
router.post('/login', validation, UserController_1.login);
//비밀번호 초기화 (요청)
router.get('/reset', UserController_1.passwordRequestReset);
//비밀번호 초기화 (최종 수정)
// router.get('/reset', passwordReset);
exports.default = router;
