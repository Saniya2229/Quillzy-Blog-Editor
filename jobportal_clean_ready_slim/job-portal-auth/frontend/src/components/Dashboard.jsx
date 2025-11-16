import React from "react";

export default function Dashboard() {
  const token = localStorage.getItem("jobportal_token");
  const handleLogout = () => {
    localStorage.removeItem("jobportal_token");
    window.location.href = "/";
  };
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>
        You are logged in. Token:{" "}
        <code style={{ wordBreak: "break-all" }}>{token}</code>
      </p>
      <button
        onClick={handleLogout}
        style={{ marginTop: 16, padding: "8px 12px" }}
      >
        Logout
      </button>
    </div>
  );
}
