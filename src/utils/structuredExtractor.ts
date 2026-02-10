// METHOD-1 (USIGNG INTERNAL TOOL OF LANGCHAIN)

// import { ChatOpenAI } from "@langchain/openai";
// import { ResumeSchema } from "../schema/resume.schema.js";

// const model = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0,
// });

// const structuredModel = model.withStructuredOutput(ResumeSchema);

// export const extractStructuredResume = async (text: string) => {
//   return await structuredModel.invoke(text);
// };

// METHOD-2 (USING THE PROMPTING TO GENERATE THE JSON SCHEMA)
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export const extractStructuredResume = async (text: string) => {
  const response = await model.invoke(`
You are a professional resume parser.

Extract structured data from this RESUME.

Rules:
- Return ONLY valid JSON.
- Use double-quoted keys.
- Include only fields that actually exist in the resume.
- DO NOT create null fields.
- DO NOT guess missing data.
- If a section does not exist, return an empty array [].
- Use nested arrays for experience and education.

Resume Text:
${text}
`);

  return JSON.parse(response.content as string);
};

export const extractStructuredApplication = async (text: string) => {
  const response = await model.invoke(`
You are a strict job application parser.

Extract structured data from this JOB APPLICATION.

Rules:
- Return ONLY valid JSON.
- Use double-quoted keys.
- ALL fields in the schema MUST exist.
- If a value is missing, explicitly set it to null.
- If a section is missing, return [].
- Do not omit any keys.

Required structure:

{
  "personal_info": {
    "name": "string | null",
    "email": "string | null",
    "phone": "string | null",
    "linkedin": "string | null"
  },
  "skills": [],
  "experience": [
    {
      "company": "string | null",
      "role": "string | null",
      "startDate": "string | null",
      "endDate": "string | null",
      "description": "string | null"
    }
  ],
  "education": [
    {
      "institution": "string | null",
      "degree": "string | null",
      "startDate": "string | null",
      "endDate": "string | null"
    }
  ]
}

Application Text:
${text}
`);

  return JSON.parse(response.content as string);
};
