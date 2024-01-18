"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.passwordRequestReset = exports.login = exports.join = void 0;
const join = (req, res) => {
    const { email, password } = req.body;
};
exports.join = join;
const login = (req, res) => {
    res.json('로그인');
};
exports.login = login;
const passwordRequestReset = (req, res) => {
    res.json('비밀번호 초기화 (요청)');
};
exports.passwordRequestReset = passwordRequestReset;
const passwordReset = (req, res) => {
    res.json('비밀번호 초기화 (최종 수정)');
};
exports.passwordReset = passwordReset;
