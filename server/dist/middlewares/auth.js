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
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AUTH_ERROR = { message: 'Authentication Error' };
const secretKey = process.env.SECRET_KEY;
const isAuth = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: '로그인 세션이 만료됨',
            });
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: '잘못된 토큰이야',
            });
        }
        console.log('decoded', decoded);
        return decoded;
    }));
};
exports.isAuth = isAuth;
