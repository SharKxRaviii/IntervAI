import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role: "CANDIDATE" | "INTERVIEWER";
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Unauthorised" });
  }

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ message: "Secret key not configured" });
  }

  try {
    const payload = jwt.verify(token, secretKey) as CustomJwtPayload;

    req.user = {
      _id: payload._id,
      role: payload.role,
    };
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
