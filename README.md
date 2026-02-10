# Application Mismatch Agent

An AI-powered auditing system that detects gaps and inconsistencies between a candidate's Resume (PDF) and their Job Application (Screenshot).

## Features

- **Resume Parsing**: Automated text extraction from PDF resumes.
- **OCR Integration**: Screenshot text extraction using Tesseract.js.
- **AI-Powered Structured Extraction**: Uses LangChain and GPT-4o-mini to convert raw text into structured JSON.
- **Semantic Analysis**: Detects mismatched dates, inflated titles, fabricated entries, and missing data.
- **Scoring & Grading**: Categorizes issues by severity and generates an overall candidate grade (A-F).

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **LLM Orchestration**: LangChain
- **AI Model**: OpenAI GPT-4o-mini
- **File Handling**: Multer
- **OCR**: Tesseract.js
- **PDF Processing**: pdf-parse

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd application-mismatch-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 4. Run the application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

---

## API Endpoints

### 1. Upload Files

`POST /api/v1/application/check`

- **Fields (form-data)**:
  - `resume`: PDF file
  - `screenshot`: Image file

### 2. Run Full Analysis

`GET /api/v1/application/analysis`

- **Description**: Performs text extraction, AI parsing, and generates the final gap analysis report.
- **Response**: Returns parsed resume data, parsed application data, and the consistency report.

---

## Response

```
{
    "success": true,
    "message": "Analysis Completed",
    "data": {
        "resume": {
            "personal_info": {
                "name": "LOKESH SATPUTE",
                "email": "lokesh.satpute121@gmail.com",
                "phone": "+1 571 507 4979"
            },
            "skills": [
                "JavaScript",
                "TypeScript",
                "Java",
                "Python",
                "React",
                "Angular",
                "Next.js",
                "HTML",
                "CSS",
                "Node.js",
                "Express",
                "GraphQL",
                "MongoDB",
                "MySQL",
                "PostgreSQL",
                "AWS (EC2, S3)",
                "Docker",
                "Jenkins",
                "GitHub Actions",
                "Jest",
                "Cypress",
                "Figma",
                "Postman",
                "JIRA",
                "Webpack"
            ],
            "experience": [
                {
                    "company": "Wells Fargo",
                    "role": "Software Development Engineer",
                    "startDate": "January 2025",
                    "endDate": "Present",
                    "description": "Developed front-end web applications using React and TypeScript, building interactive dashboards and optimizing rendering performance to reduce perceived latency by ~25%. Implemented automated front-end testing using Jest and Cypress, significantly improving test coverage and ensuring cross-browser compatibility through CI/CD pipelines. Designed responsive UI components with Angular and integrated GraphQL endpoints for dynamic data fetching, improving real-time analytics efficiency by 30%. Collaborated with UX teams to refine Figma prototypes into pixel-perfect React interfaces, enhancing user satisfaction by 20% via A/B testing and feedback loops. Optimized component libraries for reusability, streamlining development workflows and accelerating feature delivery by 15%."
                },
                {
                    "company": "Bizware International Technologies Pvt. Ltd.",
                    "role": "Software Engineer – Web Applications",
                    "startDate": "August 2022",
                    "endDate": "October 2023",
                    "description": "Developed responsive web interfaces using React and Angular, integrating REST APIs and improving performance through code splitting and lazy loading. Aligned HTML/CSS/JS layouts with Figma designs, implementing modern CSS (Flexbox, Grid) for 100% cross-device compatibility and accessibility compliance. Developed and executed 40+ UI test cases per sprint using Cypress and Postman, resolving 50+ UI defects in JIRA to cut bug recurrence by 15%. Contributed to Agile ceremonies, focusing on front-end backlog prioritization and CI/CD integration, shortening deployment cycles by 20%. Supported remote UI/UX testing post-relocation, facilitating cross-time-zone collaborations for iterative design improvements."
                },
                {
                    "company": "Max Gen Technologies Pvt. Ltd.",
                    "role": "Software Developer",
                    "startDate": "August 2021",
                    "endDate": "July 2022",
                    "description": "Built intuitive front-end components for a customer web portal using React and JavaScript, supporting high daily user interactions with stable performance. Integrated MongoDB data via REST APIs into React components, slashing query response times by 25% for enhanced real-time user experiences. Created comprehensive UI tests with Jest, attaining 90% coverage and preempting 30+ front-end issues prior to launch. Participated in Agile sprints with a team of 8, emphasizing front-end prototyping and user story refinement to hit deadlines."
                }
            ],
            "education": [
                {
                    "institution": "Virginia Tech",
                    "degree": "Master of Engineering in Computer Science",
                    "startDate": "Aug 2023",
                    "endDate": "May 2025",
                    "GPA": "3.77"
                },
                {
                    "institution": "Ajeenkya D. Y. Patil University",
                    "degree": "Bachelor of Technology in Computer Science",
                    "startDate": "2019",
                    "endDate": "2023",
                    "GPA": "8.04"
                }
            ],
            "projects": [],
            "publications": [
                {
                    "title": "Enhancing Organizational Collaboration and Communication",
                    "event": "2023 World Conference on Communication & Computing (WCONF), IEEE",
                    "year": "2023",
                    "description": "Co-developed a secure, user-friendly networking interface with encryption-enhanced UI, elevating data security by 30%. Presented findings on privacy-centric designs, supporting collaborative tools for 500+ global users."
                }
            ]
        },
        "application": {
            "personal_info": {
                "name": "Lokesh Devendra SATPUTE",
                "email": "lokesh.satpute121@gmail.com",
                "phone": "+1 (571) 5074979"
            },
            "experience": [
                {
                    "company": "Wells Fargo",
                    "role": "Software Development Engineer",
                    "location": "USA",
                    "currently_work_here": true,
                    "from": "01/2025",
                    "to": null
                },
                {
                    "company": "Bizware International Technologies Pvt. Ltd.",
                    "role": "Software Engineer",
                    "location": "India",
                    "currently_work_here": false,
                    "from": "08/2022",
                    "to": "10/2023"
                },
                {
                    "company": "Max Gen Technologies Pvt. Ltd.",
                    "role": "Software Developer",
                    "location": "India",
                    "currently_work_here": false,
                    "from": "08/2021",
                    "to": "07/2022"
                }
            ],
            "education": [
                {
                    "school": "Community and Technical College at West Virginia University Institute of Technology",
                    "degree": "MS",
                    "field_of_study": "Computer and Information Science"
                }
            ],
            "application_questions": {
                "authorized_to_work_in_us": true,
                "require_immigration_sponsorship": false,
                "relevant_work_experience": true,
                "relative_employed_by_rsm": false,
                "client_of_professional_services": false,
                "elected_official": false,
                "active_cpa_license": false,
                "other_license_or_certification": "N/A"
            },
            "preferred_office_location": "Charlotte, North Carolina, United States",
            "voluntary_disclosures": {
                "gender": "Male",
                "ethnicity": "Asian (United States of America)",
                "veteran_status": "I Am Not A Veteran"
            }
        },
        "analysis": {
            "overall_score": 60,
            "grade": "D",
            "issues": [
                {
                    "severity": "HIGH",
                    "section": "Experience",
                    "type": "MISSING_DATA",
                    "details": "Experience at Wells Fargo exists in resume but is missing location in application.",
                    "action_required": "Add location for Wells Fargo experience in the application."
                },
                {
                    "severity": "HIGH",
                    "section": "Education",
                    "type": "MISMATCHED_DATA",
                    "details": "Education institution in application differs from resume. Application lists 'Community and Technical College at West Virginia University Institute of Technology' while resume lists 'Virginia Tech'.",
                    "action_required": "Correct the education institution in the application to match the resume."
                },
                {
                    "severity": "MEDIUM",
                    "section": "Personal Info",
                    "type": "MISMATCHED_DATA",
                    "details": "Name in application is 'Lokesh Devendra SATPUTE' while resume lists 'LOKESH SATPUTE'.",
                    "action_required": "Ensure the name in the application matches the resume."
                },
                {
                    "severity": "MEDIUM",
                    "section": "Personal Info",
                    "type": "MISMATCHED_DATA",
                    "details": "Phone format in application is different from resume. Application uses '+1 (571) 5074979' while resume uses '+1 571 507 4979'.",
                    "action_required": "Standardize the phone number format in the application."
                },
                {
                    "severity": "MEDIUM",
                    "section": "Education",
                    "type": "MISSING_DATA",
                    "details": "Master's degree in Computer Science from Virginia Tech is missing in application.",
                    "action_required": "Add the Master's degree from Virginia Tech to the application."
                },
                {
                    "severity": "LOW",
                    "section": "Experience",
                    "type": "NULL_WHERE_REQUIRED",
                    "details": "End date for Wells Fargo experience is null in application while resume states 'Present'.",
                    "action_required": "Update the end date for Wells Fargo experience in the application to reflect 'Present'."
                }
            ]
        }
    }
}
```

## Project Structure

```text
src/
├── controllers/    # API Request handlers
├── routes/         # Express route definitions
├── utils/          # Core logic (OCR, PDF, AI Analysis)
├── schema/         # Zod schemas for structured output
└── server.ts       # Entry point
```
