import React from 'react';
import './CustomerBillingTable.scss';

const billingRows = [
  { name: "Lupita Mwangi", date: "10/04/2024", amount: 5600, status: "Paid" },
  { name: "Samuel Odhiambo", date: "05/04/2024", amount: 7450, status: "Paid" },
  { name: "Aisha Kiprop", date: "28/03/2024", amount: 3200, status: "Paid" },
  { name: "Brian Otieno", date: "22/03/2024", amount: 6810, status: "Unpaid" },
];

const formatAmount = (num) => `Ksh ${num.toLocaleString()}`;

const CustomerBillingTable = ({ rows = billingRows }) => (
  <div className="customer-billing-table-card">
    <div className="customer-billing-title">Customer Billing</div>
    <table className="customer-billing-table">
      <thead>
        <tr>
          <th>Customer Billing</th>
          <th>Billing Date</th>
          <th>Amount Billed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>{formatAmount(row.amount)}</td>
            <td>
              <span className={`status-badge ${row.status === 'Paid' ? 'paid' : 'unpaid'}`}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerBillingTable;