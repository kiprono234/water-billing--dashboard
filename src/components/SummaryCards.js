import React from 'react';
import './SummaryCards.scss';

const SummaryCards = ({ totalConsumption, amountBilled, customers, unpaidInvoices }) => {
  const cards = [
    {
      icon: '💧💧 💧',
      aria: 'water',
      label: 'Total Consumption',
      value: `${totalConsumption.toLocaleString()} m³`
    },
    {
      icon: '💴 💴 💴',
      aria: 'money',
      label: 'Amount Billed',
      value: `KSh ${amountBilled.toLocaleString()}`
    },
    {
      icon: '🧑‍💼 🧑‍💼 🧑‍🔧 🧑‍🤝‍🧑 ',
      aria: 'customers',
      label: 'Customers',
      value: customers.toLocaleString()
    },
    {
      icon: '🔔 🔔 🔔',
      aria: 'warning',
      label: 'Unpaid Invoices',
      value: unpaidInvoices.toLocaleString()
    }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <div className="summary-card" key={card.label}>
          <span role="img" aria-label={card.aria} className="card-icon">{card.icon}</span>
          <div>
            <div className="summary-card-label">{card.label}</div>
            <div className="summary-card-value">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;