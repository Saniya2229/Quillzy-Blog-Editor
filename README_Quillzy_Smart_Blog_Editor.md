# 🚀 Quillzy -- Smart AI Blog Editor

A production-ready Notion-style blog editor built with **React, Lexical,
Zustand, FastAPI, and MongoDB**.

This project was developed as part of a Full Stack System Design
Assignment focusing on:

-   ✅ System Architecture (HLD)
-   ✅ State Management (Zustand)
-   ✅ Rich Text Editing (Lexical)
-   ✅ Debounced Auto-Save (DSA Logic)
-   ✅ AI Integration (Summary & Grammar Fix)
-   ✅ JWT Authentication
-   ✅ Clean, Minimal UI (Tailwind CSS)

------------------------------------------------------------------------

# 🌍 Live Demo

> Replace these links with your real deployed URLs

-   🔗 Frontend (Vercel/Netlify): https://your-frontend-demo-link.com\
-   🔗 Backend API (Render/Railway): https://your-backend-demo-link.com

------------------------------------------------------------------------

# 🏗️ System Architecture

The application follows a clean Full-Stack architecture:

Frontend (React + Lexical + Zustand) ↓ FastAPI Backend (JWT + REST APIs)
↓ MongoDB Atlas (Document-based storage)

Architecture Diagram:

![Architecture Diagram](./screenshots/architecture.png)

------------------------------------------------------------------------

# 🛠️ Tech Stack

## Frontend

-   React.js (Vite)
-   Lexical (Rich Text Editor Framework)
-   Zustand (Global State Management)
-   Tailwind CSS (UI Design)
-   Axios (API calls)

## Backend

-   FastAPI (Python)
-   JWT Authentication
-   MongoDB (Document-based storage)

## AI Integration

-   Gemini / OpenAI API
-   Backend proxy for secure key usage

------------------------------------------------------------------------

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone https://github.com/your-username/smart-blog-editor.git\
cd smart-editor

------------------------------------------------------------------------

## 2️⃣ Backend Setup

cd backend

Create `.env` file:

MONGODB_URL=your_mongodb_connection_string\
JWT_SECRET=your_secret_key\
GEMINI_API_KEY=your_api_key

Install dependencies:

pip install -r requirements.txt

Run server:

uvicorn main:app --reload

Backend runs on:\
http://localhost:8000

------------------------------------------------------------------------

## 3️⃣ Frontend Setup

cd smart-editor

Install dependencies:

npm install

Run development server:

npm run dev

Frontend runs on:\
http://localhost:5173

------------------------------------------------------------------------

# 🧠 Auto-Save Logic (Debouncing Algorithm)

## Problem

We must avoid spamming the API on every keystroke.

## Solution: Custom Debounce Implementation

When the user types:

1.  A 2000ms timer starts.
2.  If the user types again, timer resets.
3.  If user stops typing for 2 seconds → Save triggers.
4.  First save = POST (create draft)
5.  Subsequent saves = PATCH (update draft)

### Why Debouncing?

-   Prevents excessive API calls
-   Reduces server load
-   Improves performance
-   Provides near real-time saving experience

This is implemented using a custom `useDebounce` hook wrapping
`performSave()`.

------------------------------------------------------------------------

# 🗄️ Database Schema Design

## Why MongoDB?

Lexical stores content as structured JSON.\
MongoDB allows storing this JSON directly without transformation.

## Post Schema

{ \_id: ObjectId, content: JSON, // Lexical state plain_text: String, //
Extracted for search & AI title: String, word_count: Number, status:
"draft" \| "published", user_email: String, created_at: Date,
updated_at: Date, published_at: Date }

## Why Store Both JSON and Plain Text?

  Field        Purpose
  ------------ ----------------------------------
  content      Reload editor without data loss
  plain_text   AI processing & search
  status       Draft vs Published state machine
  timestamps   Sorting & version tracking

This ensures scalability and clean system design.

------------------------------------------------------------------------

# 📁 Project Structure

smart-editor/ │ ├── backend/ │ ├── routes/ │ ├── main.py │ ├──
database.py │ ├── src/ │ ├── components/ │ │ ├── Editor/ │ │ ├──
AuthPage.jsx │ ├── store/ │ ├── hooks/ │ ├── services/ │ └── App.jsx │
├── ARCHITECTURE.md └── README.md

------------------------------------------------------------------------

# 📸 Application Walkthrough

## Step 1: Sign Up

Create a new account using email and password.

![Sign Up](./screenshots/signup.png)

------------------------------------------------------------------------

## Step 2: Sign In

Login using JWT authentication.

![Sign In](./screenshots/signin.png)

------------------------------------------------------------------------

## Step 3: Editor Page

Lexical rich text editor with formatting, stats, and drafts.

![Editor](./screenshots/editor.png)

------------------------------------------------------------------------

## Step 4: Fix Grammar (AI)

Send content to AI and receive improved grammar.

![Fix Grammar](./screenshots/fix-grammar.png)

------------------------------------------------------------------------

## Step 5: Summarize (AI)

Generate a concise summary of blog content.

![Summarize](./screenshots/summarize.png)

------------------------------------------------------------------------

## Step 6: Preview Mode

Switch to preview layout (Classic / Bento / Card / Magazine).

![Preview](./screenshots/preview.png)

------------------------------------------------------------------------

## Step 7: Database (MongoDB)

Stored Lexical JSON + metadata.

![Database](./screenshots/database.png)

------------------------------------------------------------------------

# 🔐 Authentication Flow

-   JWT issued at login
-   Stored in localStorage
-   Axios interceptor attaches Bearer token
-   Backend validates token on protected routes
-   Token verification on app load

------------------------------------------------------------------------

# 📡 API Endpoints

POST /api/auth/signup\
POST /api/auth/login\
GET /api/auth/me

POST /api/posts/\
PATCH /api/posts/{id}\
POST /api/posts/{id}/publish\
GET /api/posts/

POST /api/ai/generate\
POST /api/ai/fix-grammar

------------------------------------------------------------------------

# 🎯 Key Highlights

-   Notion-style editor using Lexical
-   Custom Debounced Auto-Save (DSA)
-   AI Summary + Grammar Fix
-   JWT Authentication
-   Clean Tailwind UI
-   MongoDB JSON storage
-   Production-ready structure

------------------------------------------------------------------------

# 👩‍💻 Author

Saniya Musa Hakim\
Frontend Developer \| AI & Data Science Background

------------------------------------------------------------------------

# 📌 Final Notes

This project demonstrates:

-   High-Level System Design
-   Low-Level Component Architecture
-   Efficient State Management
-   Clean Code Practices
-   Real-world Production Thinking
