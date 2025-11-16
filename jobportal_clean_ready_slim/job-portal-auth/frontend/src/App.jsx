// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Dashboard() {
  const token = localStorage.getItem("jobportal_token");
  if (!token) return <Navigate to="/login" />;
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Dashboard
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          You are logged in. Token stored in <code>jobportal_token</code>.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => {
            localStorage.removeItem("jobportal_token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
