import type { Request, Response } from "express";

import { extractTextFromPDF } from "../utils/pdfProcessor.js";
import { extractTextFromImage } from "../utils/ocrProcessor.js";
import {
  extractStructuredApplication,
  extractStructuredResume,
} from "../utils/structuredExtractor.js";
import { analyzeApplicationWithAI } from "../utils/analysis.js";

// Controller for file uploads.
export const applicationCheckController = (req: Request, res: Response) => {
  try {
    console.log("Files received:", req.files);
    res.json({
      success: true,
      message: "Files Uploaded Successfully",
      files: req.files,
    });
  } catch (error) {
    console.error("Upload controller error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Extracts text -> Converts to JSON -> Performs AI Comparison.
export const analysisController = async (req: Request, res: Response) => {
  try {
    const resumeFilePath = "uploads/90696e9a0b27c554b7f5a74837b80639";
    const screenshotFilePath = "uploads/fa82f96a15307a5337d025abcb45aa33";

    console.log("--- Starting Analysis Process ---");

    // 1. Parsing Resume (PDF -> Text -> JSON)
    console.log("Step 1: Parsing Resume...");
    const resumeText = await extractTextFromPDF(resumeFilePath);
    const resumeParsed = await extractStructuredResume(resumeText);

    // 2. Parsing Application (Image -> Text -> JSON)
    console.log("Step 2: Parsing Application Screenshot...");
    const screenshotText = await extractTextFromImage(screenshotFilePath);
    const applicationParsed =
      await extractStructuredApplication(screenshotText);

    // 3. AI Comparison Analysis
    console.log("Step 3: Running AI Analysis...");
    const analysisReport = await analyzeApplicationWithAI(
      resumeParsed,
      applicationParsed,
    );

    console.log("--- Analysis Process Completed ---");

    res.json({
      success: true,
      message: "Analysis Completed",
      data: {
        resume: resumeParsed,
        application: applicationParsed,
        analysis: analysisReport,
      },
    });
  } catch (error) {
    console.error("Analysis Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during the analysis process",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
