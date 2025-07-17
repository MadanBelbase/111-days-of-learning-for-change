"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.postLogin = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// SIGNUP
const signup = async (req, res) => {
    try {
        const { fullName, username, email, phone, location, password, terms } = req.body;
        const existingUser = await User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ message: "Email or username already exists" });
            return;
        }
        const user = new User_1.default({ fullName, username, email, phone, location, password, terms });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.json({ message: "Server error during signup" });
    }
};
exports.signup = signup;
// LOGIN
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.json({ message: "Server error during login" });
    }
};
exports.postLogin = postLogin;
const getProfile = async (req, res) => {
};
exports.getProfile = getProfile;
