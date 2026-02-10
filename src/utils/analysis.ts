import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export async function analyzeApplicationWithAI(
  resumeData: any,
  applicationData: any,
) {
  const response = await model.invoke(`
You are an enterprise-level resume vs job application auditor.

Your task is to detect ALL gaps and inconsistencies.

CORE RULES:
- Resume JSON is the ONLY source of truth.
- Application JSON must strictly reflect resume data.
- Detect missing, null, altered, inflated, fabricated, or contradictory data.
- Identify hallucinated entries added in the application.
- Compare semantically (not just exact string match).
- Dates must match logically.
- Titles must not be inflated.
- Skills must not be fabricated.
- Application null fields must be flagged if resume has value.

WHAT TO FLAG:

1. MISSING_DATA  
   Resume has value but application is null or missing.

2. MISMATCHED_DATA  
   Same field exists but values differ meaningfully.

3. DATE_INCONSISTENCY  
   Start/end dates differ or timeline altered.

4. FABRICATED_ENTRY  
   Application includes experience/education not in resume.

5. INFLATED_ROLE  
   Title or responsibility exaggerated in application.

6. SKILL_MISMATCH  
   Skill in resume missing in application.

7. NULL_WHERE_REQUIRED  
   Application has null but resume contains value.
   

SCORING RULES:
- Start from 100.
- CRITICAL: -20
- HIGH: -10
- MEDIUM: -5
- LOW: -2
- Minimum score = 0.
- Calculate final score logically.
- Assign grade:
  A ≥ 90
  B ≥ 80
  C ≥ 70
  D ≥ 60
  F < 60

Return STRICTLY valid JSON:

{
  "overall_score": number,
  "grade": "A|B|C|D|F",
  "issues": [
    {
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "section": "Personal Info|Experience|Education|Skills",
      "type": "MISSING_DATA|MISMATCHED_DATA|DATE_INCONSISTENCY|FABRICATED_ENTRY|INFLATED_ROLE|SKILL_MISMATCH|NULL_WHERE_REQUIRED",
      "details": "clear explanation of the mismatch",
      "action_required": "clear correction instruction"
    }
  ]
}

If no issues found:
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

  return JSON.parse(response.content as string);
}
