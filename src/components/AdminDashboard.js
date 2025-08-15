import React from "react";

export default function AdminDashboard({ billings, users, onLogout }) {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout} style={{ float: "right" }}>Log out</button>
      <p>Total Users: {users.length}</p>
      <p>Total Billings: {billings.length}</p>
      {/* Add more admin analytics/features as needed */}
    </div>
  );
}