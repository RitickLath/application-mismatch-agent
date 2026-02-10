import type { NextFunction, Request, Response } from "express";

export const fileUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
