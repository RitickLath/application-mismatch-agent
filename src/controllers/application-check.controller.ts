import type { Request, Response } from "express";

import { extractTextFromPDF } from "../utils/pdfProcessor.js";
import { extractTextFromImage } from "../utils/ocrProcessor.js";
import { extractStructuredResume } from "../utils/structuredExtractor.js";

export const applicationCheckController = (req: Request, res: Response) => {
  try {
    console.log(req.files);
    res.json({ success: true, message: "Files Uploaded", files: req.files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resumeParser = async (req: Request, res: Response) => {
  try {
    const filePath = "uploads/90696e9a0b27c554b7f5a74837b80639";
    const fullText = await extractTextFromPDF(filePath);

    const structuredData = await extractStructuredResume(fullText);
    console.log(structuredData);

    res.json({
      success: true,
      structuredData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

export const screenshotParser = async (req: Request, res: Response) => {
  try {
    const filePath = "uploads/fa82f96a15307a5337d025abcb45aa33";
    const cleanedText = await extractTextFromImage(filePath);

    const structuredData = await extractStructuredResume(cleanedText);

    res.json({
      success: true,
      structuredData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const analysisController = (req: Response, res: Response) => {
  try {
    const resumeStructured = {};
    const screenshotStructured = {};
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
