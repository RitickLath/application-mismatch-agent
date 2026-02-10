import { ChatOpenAI } from "@langchain/openai";
import { ResumeSchema } from "../schema/resume.schema.js";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const structuredModel = model.withStructuredOutput(ResumeSchema);

export const extractStructuredResume = async (text: string) => {
  return await structuredModel.invoke(text);
};
