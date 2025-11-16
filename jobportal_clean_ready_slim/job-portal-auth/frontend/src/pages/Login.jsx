// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // optional; if not using axios, you can replace with fetch

export default function Login() {
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!email || !password) {
      setMsg({ type: "error", text: "Please enter email and password." });
      return;
    }
    setLoading(true);
    try {
      // use axios wrapper if you created src/api.js
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ type: "error", text: data?.message || "Login failed" });
        setLoading(false);
        return;
      }
      if (data?.token) localStorage.setItem("jobportal_token", data.token);
      setMsg({ type: "success", text: data?.message || "Logged in" });
      navigate("/dashboard");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  // Opens OAuth endpoint in new window — backend must implement
  const handleOAuth = (provider) => {
    window.open(
      `${BASE}/auth/oauth/${provider}`,
      "_blank",
      "width=600,height=700"
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=1600&q=80')",
        }}
      >
        {/* empty left for style B */}
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Sign in to your account
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Not a member?{" "}
                <Link className="text-indigo-600" to="/register">
                  Start a 14 day free trial
                </Link>
              </p>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0L6.64 5.22a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-slate-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1z" />
                </svg>
              )}
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Remember me
                </label>
                <a className="text-indigo-600" href="#forgot">
                  Forgot password?
                </a>
              </div>

              {msg && (
                <div
                  className={`p-3 rounded ${
                    msg.type === "error"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full py-3 mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 text-white rounded-md font-semibold"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Or continue with */}
            <div className="mt-6 flex items-center">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="px-3 text-slate-500 dark:text-slate-400">
                Or continue with
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuth("google")}
                className="flex items-center justify-center gap-3 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {/* google inline svg */}
                <svg width="18" height="18" viewBox="0 0 533.5 544.3">
                  <path
                    fill="#4285f4"
                    d="M533.5 278.4c0-17.4-1.5-34.1-4.6-50.3H272.1v95.2h147.1c-6.4 34.7-25 64.1-53.5 83.6v68h86.4c50.6-46.6 81.4-115.4 81.4-196.5z"
                  />
                  <path
                    fill="#34a853"
                    d="M272.1 544.3c72.6 0 133.6-24 178.1-65.4l-86.4-68c-24 16.1-55 25.7-91.7 25.7-70.5 0-130.3-47.6-151.7-111.5h-89.7v69.9c44.9 89 138.7 149.3 241.3 149.3z"
                  />
                  <path
                    fill="#fbbc04"
                    d="M120.4 325.1c-10.7-31.9-10.7-66.8 0-98.7V156.5h-89.7c-39 76-39 165.2 0 241.3l89.7-72.7z"
                  />
                  <path
                    fill="#ea4335"
                    d="M272.1 108.3c38.9-.6 76.2 14 104.6 40.2l78.3-78.3C405.3 26.4 344.3 0 272.1 0 169.5 0 75.7 60.4 30.8 149.3l89.7 69.9c21.4-63.8 81.2-111.5 151.6-111.5z"
                  />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-100">
                  Google
                </span>
              </button>

              <button
                onClick={() => handleOAuth("github")}
                className="flex items-center justify-center gap-3 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {/* github svg */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-slate-700 dark:text-slate-100"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.44-3.88-1.44-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.85 1.19 3.1 0 4.44-2.71 5.42-5.29 5.7.41.36.77 1.07.77 2.17 0 1.57-.01 2.83-.01 3.21 0 .31.21.66.79.55C20.71 21.4 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"></path>
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-100">
                  GitHub
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
