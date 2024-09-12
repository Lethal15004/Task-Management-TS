"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_route_1 = __importDefault(require("./task.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const routesAPI = (app) => {
    app.use('/tasks', auth_middleware_1.default, task_route_1.default);
    app.use('/users', user_route_1.default);
};
exports.default = routesAPI;
