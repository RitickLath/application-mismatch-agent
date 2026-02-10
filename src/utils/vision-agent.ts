import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import fs from "fs/promises";
import {
  ApplicationSchema,
  type Application,
} from "../schema/resume.schema.js";

export class VisionAgent {
  private model: ChatAnthropic;

  constructor() {
    this.model = new ChatAnthropic({
      modelName: "claude-sonnet-4-20250514",
      maxTokens: 4096,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async extractFromScreenshot(imagePath: string): Promise<Application> {
    // Read image as base64
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Determine image type
    const imageType =
      imagePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

    const prompt = `You are analyzing an application form screenshot. Extract ALL information in structured JSON format.

CRITICAL INSTRUCTIONS:
1. Count EVERY entry field visible (even if empty)
2. Mark empty fields as "MISSING"
3. Extract all filled data precisely
4. Note the total number of visible entry slots

Extract these sections:
- metadata: Count of visible experience/education fields
- personal_info: name, email, phone, location
- experiences: ALL entries (mark unfilled as MISSING)
- education: ALL entries
- skills: List all skills
- certifications: All certifications
- projects: All projects

For EACH experience/education:
- If field is empty/blank, use "MISSING" as value
- Extract dates exactly as shown
- Include all visible information

Return ONLY valid JSON matching this structure:
{
  "metadata": {
    "total_experience_fields_visible": 3,
    "total_education_fields_visible": 2,
    "form_type": "Job Application Form"
  },
  "personal_info": {...},
  "experiences": [{...}],
  "education": [{...}],
  "skills": [...],
  "certifications": [...],
  "projects": [...]
}`;

    const message = new HumanMessage({
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: imageType,
            data: base64Image,
          },
        },
        {
          type: "text",
          text: prompt,
        },
      ],
    });

    const response = await this.model.invoke([message]);

    // Extract JSON from response
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Claude response");
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    // Validate with Zod schema
    const validated = ApplicationSchema.parse(parsedData);

    console.log(`✅ Found ${validated.experiences.length} experiences`);
    console.log(`✅ Found ${validated.education.length} education entries`);

    return validated;
  }
}
