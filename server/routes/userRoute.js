import express from 'express';
import {isAuth, login, logout, register} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';


export const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/is-auth',authUser,isAuth);
userRouter.post('/logout',authUser,logout);