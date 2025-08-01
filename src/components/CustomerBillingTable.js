import React from 'react';
import './CustomerBillingTable.scss';

const CustomerBillingTable = ({ rows }) => (
  <div className="customer-billing-table-card">
    <div className="customer-billing-title">Customer Billing</div>
    <table className="customer-billing-table">
      <thead>
        <tr>
          <th>Customer Billing</th>
          <th>Billing Date</th>
          <th>Amount Billed</th>
          <th>Status</th>
          <th>Payment Method</th>
          <th>Month</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>Ksh {row.amount.toLocaleString()}</td>
            <td>
              <span className={`status-badge ${row.status === 'Paid' ? 'paid' : 'unpaid'}`}>
                {row.status}
              </span>
            </td>
            <td>{row.paymentMethod || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerBillingTable;