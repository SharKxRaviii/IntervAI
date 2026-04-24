import { UserRepo } from "./auth.repo.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class UserService {
    private userRepo = new UserRepo();

    async signUp (email: string, password: string) {
        const existingEmail = await this.userRepo.findEmail(email);
        if(existingEmail) {
            throw new Error("Email already exists");
        }

        const hashedPass = await bcrypt.hash(password, 12);
        const user = await this.userRepo.register(email, hashedPass);
        return user;
    }

    async login (email: string, password: string) {
        const user = await this.userRepo.findEmail(email);
        if(!user) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.SECRET_KEY as string,
            {
                expiresIn: "15min",
            }
        );

        return token;

    }
}