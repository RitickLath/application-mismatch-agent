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

Your job is to detect REAL gaps and inconsistencies.

-----------------------
CORE VALIDATION LOGIC
-----------------------

1. Resume JSON is the ONLY source of truth.
2. Application JSON represents what the form actually asked and what the user submitted.
3. ONLY validate fields that EXIST in the Application JSON.
4. If a field does NOT exist in Application JSON, assume it was not requested — DO NOT penalize it.
5. If a field exists in Application JSON but is null, and resume has value → flag it.
6. If a field exists in both but values differ meaningfully → flag it.
7. If the number fields mentioned in the application is less than the number of fields in the resume → flag as MISSING_DATA. 
8. If Application includes entries not present in resume → flag as FABRICATED_ENTRY.
9. If titles are exaggerated compared to resume → flag as INFLATED_ROLE.
10. If dates exist in Application and differ from resume → flag DATE_INCONSISTENCY.
11. If skills exist in Application and do not exist in Resume → flag SKILL_MISMATCH.
12. If resume contains an experience/education entry completely missing in application → flag MISSING_DATA.

DO NOT:
- Penalize fields not present in application JSON.
- Penalize sections the application never asked for.
- Penalize formatting differences like casing or punctuation unless meaning changes.
- Do not penalize if the application asks for a field that is not present in the resume.
- Do not penalize if the application asks for a field that is present in the resume but the value is null or empty.
- Understandable Shortcuts are allowed.
    Example: SDE for Software Development Engineer, CGPA for Cumulative Grade Point Average

-----------------------
ISSUE TYPES
-----------------------

MISSING_DATA  
MISMATCHED_DATA  
DATE_INCONSISTENCY  
FABRICATED_ENTRY  
INFLATED_ROLE  
SKILL_MISMATCH  
NULL_WHERE_REQUIRED  

-----------------------
SCORING RULES
-----------------------
Start score = 100

CRITICAL → -15  
HIGH → -10  
MEDIUM → -5  
LOW → -2  

Minimum score = 0  
Calculate logically based on severity.  

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
      "type": "MISSING_DATA|MISMATCHED_DATA|DATE_INCONSISTENCY|FABRICATED_ENTRY|INFLATED_ROLE|SKILL_MISMATCH|NULL_WHERE_REQUIRED",
      "details": "Clear explanation",
      "action_required": "Clear correction instruction"
    }
  ]
}

If there are no issues:

{
  "overall_score": 100,
  "grade": "A",
  "issues": []
}


-----------------------
EXAMPLE RESPONSE
-----------------------

{
  "overall_score": 82,
  "grade": "B",
  "issues": [
    {
      "severity": "HIGH",
      "section": "Experience",
      "type": "MISSING_DATA",
      "details": "Experience at Wells Fargo exists in resume but is missing in application.",
      "action_required": "Add Wells Fargo experience to the application."
    },
    {
      "severity": "MEDIUM",
      "section": "Personal Info",
      "type": "NULL_WHERE_REQUIRED",
      "details": "Phone field exists in application but is null while resume contains a phone number.",
      "action_required": "Fill the phone number in the application."
    }
  ]
}

Resume JSON:
${JSON.stringify(resumeData)}

Application JSON:
${JSON.stringify(applicationData)}
`);

  return JSON.parse(response.content as string);
}
