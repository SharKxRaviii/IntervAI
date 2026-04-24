import { UserService } from "./auth.service.js";
import type { NextFunction, Request, Response } from "express";

export class UserController {
    private userService = new UserService();

    async signUp (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }
            const user = await this.userService.signUp(email, password);        
            return res.status(201).json({
                message: "User Sign Up Successful",
                user
            });
        } catch (error) {
            next(error);
        }
    }

    async login (req: Request, res: Response, next: NextFunction) {
        try {          
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }
            const data = await this.userService.login(email, password);
            return res.status(200).json({
                message: "User Login Successful",
                ...data // token, user(id, email)
            });
        } catch (error) {
            next(error);
        }
    }
}