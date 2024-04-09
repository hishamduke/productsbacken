import "dotenv/config";
import mongoose from "mongoose";

export function initDB() {
  const dev = process.env.NODE_ENV != "production";

  const url = dev ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;

  if (!url) {
    throw new Error("PROVIDE MONGO DB URL, CHECK .env.example for format");
  } else {
    mongoose
      .connect(url)
      .then(() => console.log(`\x1b[33m Database connected \x1b[0m`));
  }
}
