// src/pages/Register.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [role, setRole] = useState("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Light/Dark mode logic
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const openOAuth = (provider) => {
    window.open(`${BASE}/auth/oauth/${provider}`, "_blank", "width=600,height=700");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!email || !password) {
      setMsg({ type: "error", text: "Please fill all fields." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: role === "jobseeker" ? "Job Seeker" : "Employer",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data?.message || "Registration failed" });
        setLoading(false);
        return;
      }

      if (data?.token) {
        localStorage.setItem("jobportal_token", data.token);
      }

      setMsg({ type: "success", text: data?.message || "Registered successfully!" });

      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=1600&q=80')",
        }}
      />

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Create an Account
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Join as a job seeker or employer
              </p>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>

          {/* White Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

            {/* Role Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#081025] p-1 rounded-lg mb-6">
              <button
                onClick={() => setRole("jobseeker")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  role === "jobseeker"
                    ? "bg-white dark:bg-[#071429] text-indigo-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Job Seeker
              </button>

              <button
                onClick={() => setRole("employer")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  role === "employer"
                    ? "bg-white dark:bg-[#071429] text-indigo-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Employer
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-300"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Alerts */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 text-white rounded-md font-semibold"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="px-4 text-slate-500 dark:text-slate-400">
                Or continue with
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Google */}
              <button
                onClick={() => openOAuth("google")}
                className="flex items-center gap-3 justify-center py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071429] hover:bg-slate-50 dark:hover:bg-[#08182a]"
              >
                <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.5-34.1-4.6-50.3H272.1v95.2h147.1c-6.4 34.7-25 64.1-53.5 83.6v68h86.4c50.6-46.6 81.4-115.4 81.4-196.5z"/>
                  <path fill="#34a853" d="M272.1 544.3c72.6 0 133.6-24 178.1-65.4l-86.4-68c-24 16.1-55 25.7-91.7 25.7-70.5 0-130.3-47.6-151.7-111.5h-89.7v69.9c44.9 89 138.7 149.3 241.3 149.3z"/>
                  <path fill="#fbbc04" d="M120.4 325.1c-10.7-31.9-10.7-66.8 0-98.7V156.5h-89.7c-39 76-39 165.2 0 241.3l89.7-72.7z"/>
                  <path fill="#ea4335" d="M272.1 108.3c38.9-.6 76.2 14 104.6 40.2l78.3-78.3C405.3 26.4 344.3 0 272.1 0 169.5 0 75.7 60.4 30.8 149.3l89.7 69.9c21.4-63.8 81.2-111.5 151.6-111.5z"/>
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-100">Google</span>
              </button>

              {/* GitHub */}
              <button
                onClick={() => openOAuth("github")}
                className="flex items-center gap-3 justify-center py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071429] hover:bg-slate-50 dark:hover:bg-[#08182a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.44-3.88-1.44-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.85 1.19 3.1 0 4.44-2.71 5.42-5.29 5.7.41.36.77 1.07.77 2.17 0 1.57-.01 2.83-.01 3.21 0 .31.21.66.79.55C20.71 21.4 24 17.08 24 12 24 5.73 18.77.5 12 .5z"/>
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-100">GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
