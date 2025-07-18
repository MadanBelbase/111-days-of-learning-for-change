"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controller/authcontroller");
const signupValidator_1 = require("../validators/signupValidator");
const Loginvalidators_1 = require("../validators/Loginvalidators");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authenticateToken_1 = require("../middlewares/authenticateToken");

const authrouter = express_1.default.Router();
authrouter.post('/signup', signupValidator_1.signupValidationRules, validationMiddleware_1.validate, authcontroller_1.signup);
authrouter.post('/login', Loginvalidators_1.loginValidationRules, authcontroller_1.postLogin);
// authrouter.get("/profile/:id", authenticateToken_1.verifyToken, authcontroller_1.getProfile);
exports.default = authrouter;
