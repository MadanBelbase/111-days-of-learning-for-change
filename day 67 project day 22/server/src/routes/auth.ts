import express from 'express';
import { signup , postLogin ,postProfile} from '../controller/authcontroller';
import { signupValidationRules } from '../validators/signupValidator';
import { loginValidationRules } from '../validators/Loginvalidators';
import { validate } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authenticateToken'

const authrouter = express.Router();

authrouter.post('/signup', signupValidationRules, validate, signup);
authrouter.post('/login',loginValidationRules, postLogin)
authrouter.get('/profile',authenticateToken, postProfile)

export default authrouter;