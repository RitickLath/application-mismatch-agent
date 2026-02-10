import type { Request, Response } from "express";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { createWorker } from "tesseract.js";

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
    const nike10kPdfPath = "uploads/073f501e869df35c909b52bb0d16766f";
    const loader = new PDFLoader(nike10kPdfPath);
    const docs = await loader.load();
    console.log(docs);
    res.json({ success: true, docs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export const screenshotParser = async (req: Request, res: Response) => {
  try {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(
      "uploads/ae14cb9324aaeecaa0a684cee6b37b38",
    );
    console.log(ret.data.text);
    res.json({ success: true, data: ret });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export const resumeStructuredData = () => {};

export const screenshotStructuredData = () => {};
