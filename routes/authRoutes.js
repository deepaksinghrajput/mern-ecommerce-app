import express from 'express';
import { forgotPasswordController, getAllOrdersController, getOrderController, loginController, orderStatusController, registerController, updateProfileController,  } from '../controllers/authController.js';
import { testController } from './../controllers/authController.js';
import {isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
// router object

const router = express.Router();
//routing
//register || method post

router.post('/register',registerController);

//Login || method post

router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// Protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
});

// Protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok:true});
});

// update profile
router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrderController);

// all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);


export default router;