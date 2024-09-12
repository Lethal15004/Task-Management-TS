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
exports.deleteTask = exports.edit = exports.create = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find['status'] = req.query.status;
    }
    if (req.query.keyword) {
        find['title'] = new RegExp(`${req.query.keyword}`, 'i');
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue;
    }
    const pagination = {
        currentPage: 1
    };
    if (req.query.limitItems) {
        pagination['limitItems'] = parseInt(`${req.query.limitItems}`);
    }
    if (req.query.page) {
        pagination.currentPage = parseInt(`${req.query.page}`);
    }
    pagination['skip'] = (pagination.currentPage - 1) * pagination['limitItems'];
    const tasks = yield task_model_1.default.find(find).limit(pagination['limitItems']).skip(pagination['skip']).sort(sort);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.idTask;
        const task = yield task_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json(task);
    }
    catch (error) {
        res.json({
            code: 400,
            message: 'Lỗi không tìm thấy task'
        });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const status = req.body.status;
        yield task_model_1.default.updateMany({ _id: { $in: ids } }, { status: status });
        res.json({ message: 'Cập nhật dữ liệu thành công' });
    }
    catch (error) {
        res.json({ message: 'Not Found' });
    }
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.listUser) {
        for (const idUser of req.body.listUser) {
            try {
                const user = yield user_model_1.default.findOne({ _id: idUser });
                if (!user) {
                    res.json({
                        code: 400,
                        message: `User không tồn tại`
                    });
                }
            }
            catch (error) {
                res.json({
                    code: 400,
                    message: `User không tồn tại`
                });
            }
        }
    }
    req.body.createdBy = req['user'].id;
    const newTask = new task_model_1.default(req.body);
    yield newTask.save();
    res.json({
        message: 'Tạo mới công việc thành công',
        task: newTask
    });
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.idTask;
        yield task_model_1.default.updateOne({ _id: id }, req.body);
        res.json({ message: 'Thay đổi dữ liệu thành công' });
    }
    catch (error) {
        res.json({ message: 'Not Found' });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        yield task_model_1.default.updateMany({ _id: { $in: ids } }, { deleted: true });
        res.json({ message: 'Xóa công việc thành công' });
    }
    catch (error) {
        res.json({ message: 'Not Found' });
    }
});
exports.deleteTask = deleteTask;
