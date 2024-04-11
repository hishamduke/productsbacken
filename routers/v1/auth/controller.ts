import { Request, Response } from "express";
import { Users } from "../../../models/user.js";
import { comparePasswords, generateToken } from "./services.js";
import { AuthenticatedRequest } from "../../../types/index.js";
import { authSchema, signUpSchema } from "./validators.js";

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
