import { NextFunction, Response } from "express";
import {
  AuthTokenPayload,
  AuthenticatedRequest,
} from "../../../types/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants/index.js";
import { Users } from "../../../models/user.js";

export async function authMiddleWare(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    if (decoded) {
      const user = await Users.findById(decoded?.userId, { passwordhash: 0 });
      if (user) {
        //@ts-ignore
        req["user"] = user;
        return next();
      }
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}
