import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
});

const cleanJSON = (text: string) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export async function analyzeApplicationWithAI(
  resumeData: any,
  applicationData: any,
) {
  const response = await model.invoke(`
You are an enterprise-level resume vs job application auditor.

Your job is to detect REAL gaps, inconsistencies, and potential dishonesty.

-----------------------
CORE VALIDATION LOGIC
-----------------------

1. Resume JSON is the ONLY source of truth for the candidate's history.
2. Application JSON represents the specific fields requested by the employer and the values submitted by the user.
3. ONLY validate fields that are explicitly present in the Application JSON.
4. If a field or section does NOT exist in the Application JSON, it means the application form did not ask for it. DO NOT penalize the user for missing data in this case.
5. FLAG as MISSING_DATA ONLY if a field exists in the Application JSON as null/empty, but has a corresponding value in the Resume JSON.
6. FLAG as MISMATCHED_DATA if a field exists in both but the values differ significantly in meaning (e.g., Different GPA, different Job Title).
7. FLAG as FABRICATED_ENTRY if the Application includes experience, education, or skills that are nowhere to be found in the Resume.
8. FLAG as INFLATED_ROLE if a job title in the Application is significantly more senior or different than what is on the Resume.
9. FLAG as DATE_INCONSISTENCY if dates for the same role/education differ between the two documents.
10. Allow for common abbreviations and synonyms (e.g., "SDE" vs "Software Development Engineer", "Aritificial Intelligence" vs "AI").

-----------------------
ISSUE TYPES
-----------------------

MISSING_DATA: User left a required field blank that is present in their resume.
MISMATCHED_DATA: Submitted data contradicts the resume.
DATE_INCONSISTENCY: Dates of employment/education don't match.
FABRICATED_ENTRY: Data in application is not present in resume at all.
INFLATED_ROLE: Title in application is exaggerated.
SKILL_MISMATCH: Specific skills claimed in application are not in resume.

-----------------------
SCORING RULES
-----------------------
Start score = 100

CRITICAL → -15 (Fabrication, Major Inflation)
HIGH → -10 (Significant Date/GPA mismatch)
MEDIUM → -5 (Missing optional-looking sections, minor title tweaks)
LOW → -2 (Formatting/Minor naming differences)

Calculate logically based on the totality of the application.

Grade:
A ≥ 90  
B ≥ 80  
C ≥ 70  
D ≥ 60  
F < 60  

-----------------------
RETURN STRICTLY VALID JSON
-----------------------

{
  "overall_score": number,
  "grade": "A|B|C|D|F",
  "issues": [
    {
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "section": "Personal Info|Experience|Education|Skills",
      "type": "MISSING_DATA|MISMATCHED_DATA|DATE_INCONSISTENCY|FABRICATED_ENTRY|INFLATED_ROLE|SKILL_MISMATCH",
      "details": "Clear explanation of the discrepancy",
      "action_required": "How the user should fix it"
    }
  ]
}

If there are no issues:
{
  "overall_score": 100,
  "grade": "A",
  "issues": []
}

Resume JSON:
${JSON.stringify(resumeData)}

Application JSON:
${JSON.stringify(applicationData)}
`);

  return JSON.parse(cleanJSON(response.content as string));
}
