"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidationRules = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
// Custom validation for terms, if neede
