import type { Request, Response } from "express";

export const applicationCheckController = (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
