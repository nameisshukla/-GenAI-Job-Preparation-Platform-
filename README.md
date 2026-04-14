# GenAI Job Preparation Platform

An intelligent, AI-powered interview preparation platform designed to help candidates perform mock interviews, practice potential questions, and generate comprehensive performance reports. Built with modern web technologies, the platform aims to provide a reliable environment for candidates to refine their interview skills.

## 🚀 Features

- **Authentication System:** Secure email and password-based login and registration (JWT).
- **AI Mock Interviews:** Practice with contextual questions powered by Google Gemini AI.
- **Smart Analytics & Reporting:** Automatically generate deep insights and reports based on your interview performance.
- **Modern UI/UX:** Built with React, Vite, Framer Motion, SCSS, and a dynamic glassmorphism aesthetic.
- **Resume Processing:** Support for PDF resume parsing to customize interview flow.

## 💻 Tech Stack

### Frontend
- React 19 & Vite
- Framer Motion (Animations)
- React Router DOM (Routing)
- Axios (API handling)
- SCSS / SASS (Styling)

### Backend
- Node.js & Express
- MongoDB & Mongoose
- Google GenAI SDK (`@google/genai`)
- JSON Web Tokens (JWT) & bcryptjs
- PDF-Parse & Multer (for Resume uploads)

## 🛠️ Local Development Setup

To run this project locally, you will require **Node.js** and **MongoDB**.

### 1. Clone the repository
```bash
git clone https://github.com/nameisshukla/-GenAI-Job-Preparation-Platform-.git
cd -GenAI-Job-Preparation-Platform-
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory using the provided `.env.example` file. You will need your own MongoDB URI, JWT Secret, and Google Gemini API Key.
```bash
# Start the backend server
npm run dev
```

### 3. Frontend Setup
Open a new terminal window or tab.
```bash
cd Frontend
npm install
```
Create a `.env` file in the `Frontend` directory based on `.env.example`.
```bash
# Start the Vite development server
npm run dev
```

## 🌐 Deployment

This application is configured for easy deployment to cloud services:
- **Frontend** can be deployed to Vercel (contains `vercel.json` for SPA routing).
- **Backend** can be deployed to Render or Heroku (contains `start` script and utilizes `process.env.PORT`).

Ensure that the environment variables (e.g. `VITE_API_URL` for the frontend and `CLIENT_URL` for the backend) are updated dynamically within your hosting provider.
