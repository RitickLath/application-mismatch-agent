import type { NextFunction, Request, Response } from "express";
import multer from "multer";

export const fileUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const upload = multer({
      dest: "uploads/",
    });

    upload.fields([
      { name: "resume", maxCount: 1 },
      { name: "screenshot", maxCount: 1 },
    ])(req, res, next);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
