import express from "express";
import userController from "../controllers/userControllers";
import Users from "../model/Users";
import validation from "../validation/userValidation";

const userRoute = express.Router();
// get all users
userRoute.get('/users',(req, res)=>{
    return res.status(200).json({ users: Users });
})
// Create a new User
userRoute.post("/auth/signup", validation.signup, userController.userSignup);

export default userRoute;
