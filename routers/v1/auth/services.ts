import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants/index.js";
import bcrypt from "bcrypt";
import { AuthTokenPayload } from "../../../types/index.js";

export function generateToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export async function comparePasswords(
  enteredPassword: string,
  savedPasswordHash: string
) {
  try {
    return await bcrypt.compare(enteredPassword, savedPasswordHash);
  } catch (error) {
    return false;
  }
}
