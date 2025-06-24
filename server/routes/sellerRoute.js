import express from 'express';

import {isSellerAuth,sellerLogin,sellerLogout} from '../middlewares/sellerController.js'
import { authSeller } from '../middlewares/authSeller.js';

export const sellerRouter = express.Router();

sellerRouter.post('/login',sellerLogin)
sellerRouter.get('/is-auth',authSeller,isSellerAuth)
sellerRouter.get('/logout',sellerLogout)