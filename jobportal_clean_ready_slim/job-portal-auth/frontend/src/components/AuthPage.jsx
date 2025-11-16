import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthPage.jsx
 * Tailwind-based auth UI (split-screen). Matches your provided design:
 * - Left image/info
 * - Right auth card with role toggle, form (email/password), remember/forgot, button
 * - Social buttons below the form (Google, GitHub) that open backend OAuth endpoints
 * - Dark/Light mode toggle (persisted to localStorage)
 *
 * Notes:
 * - Uses VITE_API_URL from your frontend .env (e.g. VITE_API_URL=http://localhost:5000/api)
 * - POST to `${BASE}/auth/login` and `${BASE}/auth/register`
 * - Saves token to localStorage under 'jobportal_token'
 * - Does not modify backend; OAuth buttons open `${BASE}/auth/oauth/google` etc. (placeholders)
 */

export default function AuthPage() {
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  // UI state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [role, setRole] = useState("jobseeker"); // 'jobseeker' or 'employer'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Apply theme on root
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const openOAuth = (provider) => {
    // These endpoints assume your backend will handle OAuth flow.
    // Example backend endpoints:
    // `${BASE}/auth/oauth/google` and `${BASE}/auth/oauth/github`
    // They should redirect to the provider and then back to your client with token.
    const url = `${BASE}/auth/oauth/${provider}`;
    // Open in new window for OAuth flow
    window.open(url, "_blank", "width=600,height=700");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!email || !password) {
      setMessage({ type: "error", text: "Please fill email and password." });
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const res = await fetch(`${BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          // backend expects role on register; we send role always (backend can ignore on login)
          role: role === "jobseeker" ? "Job Seeker" : "Employer",
          remember,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const m = data?.message || "Server error";
        setMessage({ type: "error", text: m });
        setLoading(false);
        return;
      }

      // Expecting token returned: data.token
      if (data?.token) {
        localStorage.setItem("jobportal_token", data.token);
      }

      setMessage({
        type: "success",
        text: data.message || (mode === "login" ? "Logged in" : "Registered"),
      });

      // On register, navigate to dashboard if backend also returned token
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: image + text (hidden on small screens) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&w=1600&q=80')",
        }}
      >
        <div className="p-16 self-end text-white">
          <h2 className="text-4xl font-bold drop-shadow-lg">
            Find Your Next Opportunity, Faster
          </h2>
          <p className="mt-4 max-w-md text-gray-200 drop-shadow-sm">
            Connect with top recruiters and apply to curated jobs — built for
            students and professionals.
          </p>
        </div>
      </div>

      {/* Right: auth card */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-[#071029]">
        <div className="w-full max-w-xl">
          {/* header row with small logo + theme toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* simple logo */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">
                JP
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Sign in to your account
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Not a member?{" "}
                  <span className="text-indigo-400">
                    Start a 14 day free trial
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0L6.64 5.22a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm8 6a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM15.78 4.22a1 1 0 010 1.42L14.36 6.64a1 1 0 11-1.42-1.42l1.42-1.42a1 1 0 011.42 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0L6.64 5.22a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm8 6a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM15.78 4.22a1 1 0 010 1.42L14.36 6.64a1 1 0 11-1.42-1.42l1.42-1.42a1 1 0 011.42 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* card */}
          <div className="bg-white dark:bg-[#0b1220] rounded-xl shadow-lg p-8">
            {/* Role toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#081025] p-1 rounded-lg mb-6">
              <button
                onClick={() => setRole("jobseeker")}
                className={`flex-1 py-2 rounded-lg font-medium text-sm ${
                  role === "jobseeker"
                    ? "bg-white dark:bg-[#071429] text-indigo-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Job Seeker
              </button>
              <button
                onClick={() => setRole("employer")}
                className={`flex-1 py-2 rounded-lg font-medium text-sm ${
                  role === "employer"
                    ? "bg-white dark:bg-[#071429] text-indigo-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Employer
              </button>
            </div>

            {/* FORM FIELDS (top) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#061122] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#061122] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                  />
                  Remember me
                </label>
                <a
                  className="text-indigo-500 hover:underline text-sm"
                  href="#forgot"
                >
                  Forgot password?
                </a>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    message.type === "error"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition"
              >
                {mode === "login"
                  ? "Sign in"
                  : loading
                  ? "Creating..."
                  : "Create account"}
              </button>
            </form>

            {/* divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="px-4 text-gray-500 dark:text-gray-400">
                Or continue with
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Social buttons (below form) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => openOAuth("google")}
                className="flex items-center gap-3 justify-center py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071429] hover:bg-gray-50 dark:hover:bg-[#08182a]"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-100">
                  Google
                </span>
              </button>

              <button
                onClick={() => openOAuth("github")}
                className="flex items-center gap-3 justify-center py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071429] hover:bg-gray-50 dark:hover:bg-[#08182a]"
              >
                <img
                  src="https://www.svgrepo.com/show/349474/github-alt.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-100">
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
