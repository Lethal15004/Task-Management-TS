"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
const database_1 = __importDefault(require("./config/database"));
(0, database_1.default)();
const index_route_1 = __importDefault(require("./routes/client/index.route"));
(0, index_route_1.default)(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
