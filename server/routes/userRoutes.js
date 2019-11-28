import express from 'express';
import userController from '../controllers/userControllers';
import Users from '../model/Users';
import validation from '../validation/userValidation';

const userRoute = express.Router();
// get all users
userRoute.get('/users', (req, res) => res.status(200).json({ users: Users }));
// Create a new User
userRoute.post('/auth/signup', validation.signup, userController.userSignup);
// user Sign in
userRoute.post('/auth/signin', validation.signin, userController.userSignin);

export default userRoute;
