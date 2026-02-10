import express from "express";
import {
  analysisController,
  applicationCheckController,
  resumeParser,
  screenshotParser,
} from "../controllers/application-check.controller.js";
import multer from "multer";

export const applicationRouter = express.Router();

const upload = multer({ dest: "uploads/" });

applicationRouter.post(
  "/check",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "screenshot", maxCount: 1 },
  ]),
  applicationCheckController,
);

applicationRouter.get("/resume-parser", resumeParser);

applicationRouter.get("/screenshot-parser", screenshotParser);

applicationRouter.get("/analysis", analysisController);
