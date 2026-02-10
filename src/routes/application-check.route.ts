import express from "express";
import { applicationCheckController } from "../controllers/application-check.controller.js";
import { fileUploadMiddleware } from "../middleware/file-upload.middleware.js";

export const applicationRouter = express.Router();

applicationRouter.post(
  "/check",
  fileUploadMiddleware,
  applicationCheckController,
);
