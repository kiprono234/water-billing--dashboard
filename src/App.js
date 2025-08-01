import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import WaterUsageChart from './components/WaterUsageChart';
import InvoiceStatusChart from './components/InvoiceStatusChart';
import CustomerBillingTable from './components/CustomerBillingTable';
import MeterInputForm from './components/MeterInputForm';
import LoginForm from './components/LoginForm';
import './App.scss';

const M3_PRICE = 150;

const initialReadings = [
  { date: '2025-07-01', reading: 12345 },
  { date: '2025-06-01', reading: 12200 },
];

const initialBilling = initialReadings.slice(1).map((r, idx) => ({
  name: '', 
  date: r.date,
  amount: (r.reading - initialReadings[idx].reading) * M3_PRICE,
  status: 'Paid',
  paymentMethod: 'Mobile Money',
}));

const App = () => {
  const [user, setUser] = useState(null);
  const [readings, setReadings] = useState(initialReadings);
  const [billingTable, setBillingTable] = useState(initialBilling);

  
  useEffect(() => {
    // Add user name to billing table
    if (user && billingTable.length && !billingTable[0].name) {
      setBillingTable(billingTable.map(row => ({ ...row, name: user })));
    }
    // Only run when user changes
    // eslint-disable-next-line
  }, [user]); // ignore exhaustive-deps warning for billingTable

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  // Calculate's the total consumption and billing
  const totalConsumption =
    readings.length > 1
      ? readings[readings.length - 1].reading - readings[0].reading
      : 0;
  const amountBilled = totalConsumption * M3_PRICE;

  // Prepare's  data for the water usage chart
  const usageData = readings.slice(1).map((r, idx) => ({
    month: new Date(r.date).toLocaleString('default', { month: 'short' }),
    value: r.reading - readings[idx].reading,
  }));

  // Count's paid/unpaid invoices for charts/summary
  const paidCount = billingTable.filter(row => row.status === 'Paid').length;
  const unpaidCount = billingTable.filter(row => row.status === 'Unpaid').length;

  // Handle's new reading input, now accepts status & payment method
  const handleNewReading = (reading, date, status, paymentMethod) => {
    setReadings(prev => [
      ...prev,
      { date, reading }
    ]);
    // Calculate's  amount and add a billing row
    const prevReading = readings[readings.length - 1];
    const amount = (reading - prevReading.reading) * M3_PRICE;
    setBillingTable(prev => [
      ...prev,
      {
        name: user,
        date,
        amount,
        status,
        paymentMethod: status === 'Paid' ? paymentMethod : ''
      }
    ]);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="dashboard-container">
        <DashboardHeader />
        <MeterInputForm
          onSubmit={handleNewReading}
          lastReading={readings[readings.length - 1].reading}
        />
        <SummaryCards
          totalConsumption={totalConsumption}
          amountBilled={amountBilled}
          customers={1}
          unpaidInvoices={unpaidCount}
        />
        <div className="charts-row">
          <WaterUsageChart usageData={usageData} />
          <InvoiceStatusChart paid={paidCount} unpaid={unpaidCount} />
        </div>
        <CustomerBillingTable rows={billingTable} />
      </div>
    </div>
  );
};

export default App;