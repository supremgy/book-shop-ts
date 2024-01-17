"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(process.env.PORT, () => {
    console.log('server is running');
});
app.use('/users', users_1.default);
