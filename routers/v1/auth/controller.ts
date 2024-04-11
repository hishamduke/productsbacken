import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { Users } from "../../../models/user.js";
import { comparePasswords, generateToken } from "./services.js";
import { JWT_SECRET } from "../../../constants/index.js";
import jwt from "jsonwebtoken";
import {
  AuthTokenPayload,
  AuthenticatedRequest,
} from "../../../types/index.js";

const authSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6, "Password must contain minimun of 6 letters"),
});

const signUpSchema = authSchema.transform((arg) => ({
  email: arg.email,
  passwordhash: arg.password,
}));

export async function signupController(req: Request, res: Response) {
  try {
    const body = signUpSchema.parse(req.body);
    const user = await Users.create(body);
    const token = generateToken({ userId: user._id });
    return res.json({ token });
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({ error: errorMessage ?? JSON.stringify(error) }).status(500);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const body = authSchema.parse(req.body);

    const user = await Users.findOne({ email: body.email });
    if (!user) throw new Error("No user found with this email");

    const isCorrectPwd = await comparePasswords(
      body.password,
      user.passwordhash
    );
    if (!isCorrectPwd) throw new Error("Invalid password entered");

    const token = generateToken({ userId: user._id });
    return res.json({ token });
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({ error: errorMessage ?? JSON.stringify(error) }).status(500);
  }
}

export async function profile(req: AuthenticatedRequest, res: Response) {
  try {
    return res.json({ user: req.user });
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({ error: errorMessage ?? JSON.stringify(error) }).status(500);
  }
}

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
