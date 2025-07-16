"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter")); // Import userRouter
const auth_1 = __importDefault(require("./routes/auth"));
const Blog_1 = __importDefault(require("./routes/Blog"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
}));
// Routes
app.use(userRouter_1.default);
app.use("/auth", auth_1.default);
app.use("/api", Blog_1.default);
exports.default = app;
