import express from "express";
import {
  applicationCheckController,
  resumeParser,
  resumeStructuredData,
  screenshotParser,
  screenshotStructuredData,
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

applicationRouter.get("/resume-structured-data", resumeStructuredData);

applicationRouter.get("/screenshot-structured-data", screenshotStructuredData);
