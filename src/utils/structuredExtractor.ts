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
- Include ONLY fields that actually exist in the resume.
- DO NOT create null fields.
- DO NOT guess missing data.
- If a section does not exist, return an empty array [].
- Use nested arrays for experience and education.

Example response:

{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 1234567890"
  },
  "skills": ["JavaScript", "React"],
  "experience": [
    {
      "company": "Wells Fargo",
      "role": "Software Engineer",
      "startDate": "01/2022",
      "endDate": "03/2024",
      "description": "Worked on internal tools."
    }
  ],
  "education": [
    {
      "institution": "West Virginia University",
      "degree": "MS Computer Science",
      "startDate": "08/2020",
      "endDate": "05/2022"
    }
  ]
}

Resume Text:
${text}
`);

  return JSON.parse(response.content as string);
};

export const extractStructuredApplication = async (text: string) => {
  const response = await model.invoke(`
You are a strict job application parser.

Extract structured data from this JOB APPLICATION.

CRITICAL RULES:

- Return ONLY valid JSON.
- Use double-quoted keys.
- Include ONLY fields that are actually present in the application form.
- DO NOT create fields that were not asked in the application.
- If a field exists in the application form but user left it blank, set it to null.
- If a section was not part of the application form, omit it entirely.
- If a section exists but has no entries, return [].

Important:
If the application did NOT request startDate, endDate, linkedin, description, etc.,
DO NOT include them in the output at all.

Example response (if form asked for linkedin but user didn’t fill it):

{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 1234567890",
    "linkedin": null
  },
  "skills": [],
  "experience": [
    {
      "company": "Wells Fargo",
      "role": "Software Engineer"
    }
  ]
}

Example response (if form did NOT ask for linkedin or dates):

{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "experience": [
    {
      "company": "Wells Fargo",
      "role": "Software Engineer"
    }
  ]
}

Application Text:
${text}
`);

  return JSON.parse(response.content as string);
};
