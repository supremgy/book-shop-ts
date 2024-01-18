"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.passwordRequestReset = exports.login = exports.join = void 0;
const http_status_codes_1 = require("http-status-codes");
const mariadb_1 = __importDefault(require("../db/mariadb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtSecretKey = '';
const jwtExpiresInTime = '2m';
const bcryptSaltRounds = 10;
const join = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = yield bcrypt_1.default.genSalt(bcryptSaltRounds);
    const hasedPW = yield bcrypt_1.default.hash(password, salt);
    let values = [email, hasedPW];
    let sql = 'INSERT INTO users (email, password) VALUES (?,?)';
    mariadb_1.default.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).end();
        }
        if (results.affectedRows) {
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(results);
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).end();
        }
    });
});
exports.join = join;
const login = (eq, res) => {
    res.json('로그인');
};
exports.login = login;
const passwordRequestReset = (req, res) => {
    res.json('비밀번호 초기화 (요청)');
};
exports.passwordRequestReset = passwordRequestReset;
const passwordReset = (req, res) => {
    mariadb_1.default.query('SELECT * FROM users', (err, results) => {
        res.status(http_status_codes_1.StatusCodes.OK).json(results);
    });
};
exports.passwordReset = passwordReset;
