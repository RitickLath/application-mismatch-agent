import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
};
