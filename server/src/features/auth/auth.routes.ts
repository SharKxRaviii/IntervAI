import express from "express";
import { UserController } from "./auth.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);

export default userRouter;
