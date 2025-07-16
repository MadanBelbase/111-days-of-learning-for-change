"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.mongoconnect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config(); // Load environment variables from .env
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("❌ MONGO_URL is not defined in .env");
}
let _db; // Store DB connection
// Function to connect to MongoDB
const mongoconnect = (callback) => {
    mongoose_1.default.connect(mongoUrl)
        .then(() => {
        _db = mongoose_1.default.connection;
        console.log("✅ Connected to MongoDB using Mongoose");
        if (callback)
            callback();
    })
        .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });
};
exports.mongoconnect = mongoconnect;
// Getter to access DB connection
const getDb = () => {
    if (_db)
        return _db;
    throw new Error("❗ No database found!");
};
exports.getDb = getDb;
