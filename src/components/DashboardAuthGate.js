import React, { useState } from "react";

export default function DashboardAuthGate({ type, onLogin, onLogout, user, admin, children }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // User dashboard: show content if logged in as user
  if (type === "user" && user) return (
    <div>
      <button onClick={onLogout} style={{ float: "right" }}>Log out</button>
      {children}
    </div>
  );

  // Admin dashboard: show content if logged in as admin
  if (type === "admin" && admin) return (
    <div>
      <button onClick={onLogout} style={{ float: "right" }}>Log out</button>
      {children}
    </div>
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (type === "user") {
      if (!input.trim()) return setError("Enter your name to login");
      setError("");
      onLogin(input.trim());
    } else if (type === "admin") {
      if (input === "admin" && password === "admin123") {
        setError("");
        onLogin();
      } else {
        setError("Invalid admin credentials");
      }
    }
  };

  return (
    <div className="auth-gate">
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        {type === "user" ? (
          <>
            <h2>User Dashboard Login</h2>
            <input
              type="text"
              placeholder="Enter your user name"
              value={input}
              onChange={e => setInput(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <h2>Admin Dashboard Login</h2>
            <input
              type="text"
              placeholder="Admin Username"
              value={input}
              onChange={e => setInput(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">Log in</button>
        {error && <div style={{ color: "red", marginTop: "1em" }}>{error}</div>}
      </form>
    </div>
  );
}