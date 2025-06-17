import express from 'express';
import { signup } from '../controller/authcontroller';
import { signupValidationRules } from '../validators/signupValidator';
import { validate } from '../middlewares/validationMiddleware';


const authrouter = express.Router();

authrouter.post('/signup', signupValidationRules, validate, signup);

export default authrouter;