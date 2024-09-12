"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.profile = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const generateHelper = __importStar(require("../../helper/generateString.helper"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password && req.body.fullName) {
        const userExist = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false,
        });
        if (userExist) {
            return res.json({
                code: 400,
                message: 'Email đã tồn tại'
            });
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        req.body['token'] = generateHelper.generateRandomString(30);
        const newUser = new user_model_1.default(req.body);
        yield newUser.save();
        res.json({
            code: 200,
            message: 'Đăng ký thành công',
            token: newUser.token
        });
    }
    else {
        res.json({
            code: 400,
            message: 'Thông tin đăng ký không hợp lệ'
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        const userLogin = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false,
        });
        if (!userLogin) {
            return res.json({
                code: 401,
                message: 'Tài khoản không tồn tại hoặc đã bị xóa'
            });
        }
        if (userLogin.password !== (0, md5_1.default)(req.body.password)) {
            return res.json({
                code: 401,
                message: 'Mật khẩu không đúng'
            });
        }
        res.json({
            code: 200,
            message: 'Đăng nhập thành công!',
            token: userLogin.token
        });
    }
    else {
        res.json({
            code: 400,
            message: 'Thông tin đăng nhập không hợp lệ'
        });
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req['user'].token;
        const user = yield user_model_1.default.findOne({
            token: token,
            deleted: false
        }).select('-token -password');
        res.json({
            code: 200,
            message: 'Trang cá nhân',
            user: user
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: 'Not Found'
        });
    }
});
exports.profile = profile;
