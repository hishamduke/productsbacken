import express from "express";
import "dotenv/config";
import { initDB } from "./database/init.js";
import bodyparser from "body-parser";
import cors from "cors";
import { apiRouter } from "./routers/index.js";

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
initDB();

app.use("/api", apiRouter);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
