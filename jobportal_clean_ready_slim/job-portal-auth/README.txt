# Job Portal 

## Structure
frontend/ -> React + Vite app (with all dependencies and vite.config.js fixed)
backend/ -> Express + MongoDB backend

## Run Backend
cd backend
npm install
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemon
npm run dev

## Run Frontend
cd frontend
npm install
npm install axios react-router-dom
npm install -D tailwindcss
npx tailwindcss init -p
npm run dev

Open http://localhost:5173
