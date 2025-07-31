import React from 'react';
import { motion } from 'framer-motion';
import './SummaryCards.scss';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.5 }
  })
};

const SummaryCards = ({ totalConsumption, amountBilled, customers, unpaidInvoices }) => {
  const cards = [
    {
      icon: '💧',
      aria: 'water',
      label: 'Total Consumption',
      value: `${totalConsumption} m³`
    },
    {
      icon: '💲',
      aria: 'money',
      label: 'Amount Billed',
      value: `KSh ${amountBilled.toLocaleString()}`
    },
    {
      icon: '👥',
      aria: 'customers',
      label: 'Customers',
      value: customers
    },
    {
      icon: '⚠️',
      aria: 'warning',
      label: 'Unpaid Invoices',
      value: unpaidInvoices
    }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <motion.div
          className="summary-card"
          key={card.label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <span role="img" aria-label={card.aria} className="card-icon">{card.icon}</span>
          <div>
            <div className="summary-card-label">{card.label}</div>
            <div className="summary-card-value">{card.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;