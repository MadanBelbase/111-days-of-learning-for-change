import express from 'express';
import { signup , postLogin } from '../controller/authcontroller';
import { signupValidationRules } from '../validators/signupValidator';
import { loginValidationRules } from '../validators/Loginvalidators';
import { validate } from '../middlewares/validationMiddleware';



const authrouter = express.Router();

authrouter.post('/signup', signupValidationRules, validate, signup);
authrouter.post('/login',loginValidationRules, postLogin)

export default authrouter;