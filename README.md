# 🧠 AI-Powered Resume Analyzer & Interview Prep Platform

An intelligent full stack platform that analyzes resumes against job descriptions and generates personalized interview preparation reports — including technical questions, behavioral questions, skill gap analysis, and a day-wise preparation plan.

---

## 🚀 Features

- 📄 **Resume Parsing** — Extracts text from uploaded PDF resumes
- 🤖 **AI-Powered Analysis** — Uses Google Gemini API to generate detailed interview reports
- 🎯 **Match Score** — Rates how well the candidate's profile matches the job description
- ❓ **Technical & Behavioral Questions** — With intention and how-to-answer guidance
- 🔍 **Skill Gap Analysis** — Identifies missing skills with severity levels
- 📅 **Day-wise Preparation Plan** — Personalized study plan to crack the interview
- 📝 **AI Resume Generator** — Generates an ATS-friendly, job-tailored resume as a PDF
- 🔐 **JWT Authentication** — Secure protected routes with middleware

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| AI | Google Gemini API (`@google/genai`) |
| PDF Parsing | `pdf-parse` |
| PDF Generation | Puppeteer |
| Auth | JWT |
| Validation | Zod |

---

## 📁 Project Structure

# 🚀 AI Interview Intelligence System

An advanced AI-powered career platform built with the **MERN Stack** and **Google Gemini 1.5**. This application bridges the gap between candidates and recruiters by providing deep analysis of resumes against specific job descriptions.

## 📁 Project Structure

```text
Backend/
├── src/
│   ├── config/             # Database & Environment configurations
│   │   └── database.js
│   ├── controllers/        # Request handling logic
│   │   ├── auth.controller.js
│   │   └── interview.controller.js
│   ├── middlewares/        # Auth and File upload (Multer) logic
│   │   ├── auth.middleware.js
│   │   └── file.middleware.js
│   ├── models/             # Mongoose Schemas
│   │   ├── blacklist.model.js
│   │   ├── interviewReport.model.js
│   │   └── user.model.js
│   ├── routes/             # API Endpoints
│   │   ├── auth.routes.js
│   │   └── interview.routes.js
│   ├── services/           # External API Logic (Gemini/Puppeteer)
│   │   └── ai.service.js
│   └── app.js              # Express app entry point
├── .env                    # Secret environment variables
├── .gitignore              # Files ignored by Git
└── package.json            # Dependencies & Scripts

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

### 4. Start the server

```bash
npm start
```

---

## 📬 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Interview
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/interview/` | Generate interview report (multipart/form-data) |
| GET | `/api/interview/` | Get all interview reports of logged-in user |
| GET | `/api/interview/:interviewId` | Get a specific interview report |
| GET | `/api/interview/:interviewId/resume` | Download AI-generated resume PDF |

### Request Body for `POST /api/interview/`
| Field | Type | Description |
|---|---|---|
| `resume` | File (PDF) | Candidate's resume |
| `selfDescription` | Text | Brief self-introduction |
| `jobDescription` | Text | Target job description |

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port to run the server on |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key from [Google AI Studio](https://aistudio.google.com) |

---

## 📌 Notes

- Google Gemini free tier has daily rate limits. If you hit a `429` or `503` error, generate a new API key or enable billing at [Google AI Studio](https://aistudio.google.com).
- Make sure Google Chrome is installed at `C:\Program Files\Google\Chrome\Application\chrome.exe` for Puppeteer PDF generation, or update the path in `ai.service.js`.

---

## 🙌 Author

**Aman Shukla**  
[GitHub](https://github.com/nameisshukla) • [LinkedIn](https://hosturl.info/WUZ8qO)
