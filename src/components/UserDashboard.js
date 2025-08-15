import React from "react";

export default function UserDashboard({ user, billings, onLogout }) {
  return (
    <div>
      <h2>Welcome, {user}</h2>
      <button onClick={onLogout} style={{ float: "right" }}>Log out</button>
      <h3>Your Previous Meter Readings & Bills</h3>
      <table className="user-billings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reading</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {billings.map(b => (
            <tr key={b.date + b.month + b.year}>
              <td>{b.date}</td>
              <td>{b.month}</td>
              <td>{b.year}</td>
              <td>{b.reading}</td>
              <td>{b.amount}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {billings.length === 0 && <div>No billings/reading history yet.</div>}
    </div>
  );
}