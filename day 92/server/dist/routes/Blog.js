"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controller/blogController");
const authenticateToken_1 = require("../middlewares/authenticateToken");
const blogrouter = express_1.default.Router(); // Make sure this is a Router instance!
// Correctly register route handlers
blogrouter.get("/getblogs/:id", blogController_1.getBlogById);
blogrouter.post("/getblogs/comment/:id", authenticateToken_1.verifyToken, blogController_1.addComment);
blogrouter.post("/getblogs/like/:id", authenticateToken_1.verifyToken, blogController_1.addLike);
blogrouter.post("/getblogs/share/:id", authenticateToken_1.verifyToken, blogController_1.addShare);
exports.default = blogrouter;
