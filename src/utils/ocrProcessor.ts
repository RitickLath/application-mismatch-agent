import { createWorker } from "tesseract.js";

export const extractTextFromImage = async (
  filePath: string,
): Promise<string> => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(filePath);
  await worker.terminate();

  // Clean OCR text (Noise Removal)
  const cleanedText = ret.data.text
    .replace(/\s+/g, " ")
    .replace(/[^\x00-\x7F]/g, "");

  return cleanedText;
};
