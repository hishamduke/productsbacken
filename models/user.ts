import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const user = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordhash: { type: String, required: true },
  },
  { timestamps: true }
);

user.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("passwordhash")) return next();

  try {
    if (user?.passwordhash) {
      const hash = await getHash(user.passwordhash);
      user.passwordhash = hash;
    }
    next();
  } catch (error) {
    return next(error as Error);
  }
});

export async function getHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const Users = model("users", user);

export type TUser = InferSchemaType<typeof user> & { _id: string };
