import express, { type Application } from "express";
import { applicationRouter } from "./routes/application-check.route.js";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/v1/application", applicationRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
