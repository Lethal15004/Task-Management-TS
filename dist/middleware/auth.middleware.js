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
const user_model_1 = __importDefault(require("../model/user.model"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.json({
            code: 400,
            message: "Vui lòng gửi kèm theo token"
        });
    }
    const token = authorization.split(' ')[1].trim();
    if (!token) {
        return res.json({
            code: 400,
            message: "Vui lòng gửi kèm theo token"
        });
    }
    const user = yield user_model_1.default.findOne({
        token: token,
        deleted: false
    });
    if (!user) {
        return res.json({
            code: 403,
            message: "Token không hợp lệ"
        });
    }
    req['user'] = user;
    next();
});
exports.default = authMiddleware;
