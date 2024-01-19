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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middlewares/auth");
dotenv_1.default.config();
const secretkey = process.env.SECRET_KEY;
const jwtExpiresInTime = '10m';
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
const login = (req, res) => {
    const { email, password } = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    mariadb_1.default.query(sql, email, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).end();
        }
        let loginUser = results[0];
        let isPasswordMatch = yield bcrypt_1.default.compare(password, loginUser.password);
        if (loginUser && isPasswordMatch) {
            const token = jsonwebtoken_1.default.sign({
                id: loginUser.id,
                email: loginUser.email,
            }, secretkey, {
                expiresIn: jwtExpiresInTime,
            });
            res.cookie('token', token, {
                httpOnly: true,
            });
            console.log('token : ', token);
            return res.status(http_status_codes_1.StatusCodes.OK).json(results);
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).end();
        }
    }));
};
exports.login = login;
const passwordRequestReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield (0, auth_1.isAuth)(req, res);
    console.log(test);
    res.json('비밀번호 초기화 (요청)');
});
exports.passwordRequestReset = passwordRequestReset;
const passwordReset = (req, res) => {
    mariadb_1.default.query('SELECT * FROM users', (err, results) => {
        res.status(http_status_codes_1.StatusCodes.OK).json(results);
    });
};
exports.passwordReset = passwordReset;
