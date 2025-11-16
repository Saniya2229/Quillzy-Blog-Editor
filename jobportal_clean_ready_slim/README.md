# Job Portal Authentication System

A full-stack authentication module for a Job Portal system supporting:
- User Registration (Job Seeker / Employer)
- User Login (JWT-based)
- OAuth Login via Google & GitHub
- Secure Password Hashing (bcrypt)
- MongoDB (Mongoose)
- Protected Routes
- Tailwind + React Frontend
- Express + Node.js Backend

---

## 🚀 Folder Structure

```
job-portal-auth/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── .env  (Masked in this repo)
│
└── frontend/
    ├── src/
    ├── public/
    ├── vite.config.js
    └── .env (Frontend)
```

---

## 📦 Backend Dependencies

Run inside **backend** folder:

```
npm install express mongoose cors dotenv bcryptjs jsonwebtoken passport passport-google-oauth20 passport-github2
npm install nodemon --save-dev
```

---

## 🎨 Frontend Dependencies

Run inside **frontend** folder:

```
npm install react react-dom react-router-dom
npm install tailwindcss postcss autoprefixer
npm install lucide-react
npm install axios
```

Initialize Tailwind:

```
npx tailwindcss init -p
```

---

## 🛢 MongoDB Setup

1. Create a MongoDB Atlas cluster  
2. Create database: `jobportal`  
3. Add your connection string in backend `.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster/jobportal
```

4. Whitelist your IP Address (`0.0.0.0/0` during development)

---

## 🔑 OAuth Setup

### Google Cloud Console:
Create:
- GOOGLE_CLIENT_ID  
- GOOGLE_CLIENT_SECRET  

Redirect URL:
```
http://localhost:5000/api/auth/oauth/google/callback
```

### GitHub Developer Settings:
Create:
- GITHUB_CLIENT_ID  
- GITHUB_CLIENT_SECRET  

Redirect URL:
```
http://localhost:5000/api/auth/oauth/github/callback
```

---

## ▶ How to Run Backend

```
cd backend
npm install
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

---

## ▶ How to Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## ✔ Features Ready for Production

- Role-based registration
- Secure JWT tokens
- OAuth login flow
- Login/Logout system
- Dark/Light mode UI
- Fully responsive design

---

## 📌 Notes

- All sensitive keys in `.env` have been masked for GitHub safety.
- Replace `XXXXX` with real values before running locally.
- Keep `.env` files **out of GitHub** in real production.
