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

## Project Structure

```text
src/
├── controllers/    # API Request handlers
├── routes/         # Express route definitions
├── utils/          # Core logic (OCR, PDF, AI Analysis)
├── schema/         # Zod schemas for structured output
└── server.ts       # Entry point
```
