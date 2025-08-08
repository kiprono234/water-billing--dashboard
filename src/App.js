import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import WaterUsageChart from './components/WaterUsageChart';
import InvoiceStatusChart from './components/InvoiceStatusChart';
import CustomerBillingTable from './components/CustomerBillingTable';
import MeterReadingCalculator from './components/MeterReadingCalculator';
import {
  getStoredBillings, setStoredBillings,
  getStoredUsageData, setStoredUsageData,
  getStoredUsers, setStoredUsers
} from './utils/persistence';
import './App.scss';

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [billings, setBillings] = useState([]);
  const [usageData, setUsageData] = useState([]);

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getStoredUsers();
      const fetchedBillings = await getStoredBillings();
      const fetchedUsageData = await getStoredUsageData();
      setUsers(fetchedUsers);
      setBillings(fetchedBillings);
      setUsageData(fetchedUsageData);
    };
    fetchData();
  }, []);

  // Dashboard calculations
  const totalInvoices = billings.length;
  const paidInvoices = billings.filter(b => b.status === 'Paid').length;
  const unpaidInvoices = billings.filter(b => b.status === 'Unpaid').length;
  const paidPercent = totalInvoices ? Math.round((paidInvoices / totalInvoices) * 100) : 0;
  const unpaidPercent = totalInvoices ? Math.round((unpaidInvoices / totalInvoices) * 100) : 0;
  const totalConsumption = billings.reduce((acc, cur) => acc + cur.reading, 0);
  const amountBilled = billings.reduce((acc, cur) => acc + cur.amount, 0);
  const customers = new Set(billings.map(b => b.name)).size;

  // Handle login and persist if new
  const handleLogin = async ({ name }) => {
    const existingUser = users.find(u => u.name === name);
    if (!existingUser) {
      const newUser = { name };
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const updatedUsers = await getStoredUsers();
      setUsers(updatedUsers);
    }
    setUser({ name });
  };

  const handleLogout = () => setUser(null);

  const handleAddMeterReading = async ({ month, reading, amount, payNow, date, year }) => {
    const dateObj = date ? new Date(date) : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-GB');

    const newBilling = {
      name: user.name,
      date: formattedDate,
      month,
      year: year || dateObj.getFullYear(),
      reading: parseFloat(reading),
      amount,
      status: payNow ? "Paid" : "Unpaid"
    };

    // Save to API
    await fetch('http://localhost:3001/billings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBilling)
    });

    const updatedBillings = await getStoredBillings();
    setBillings(updatedBillings);

    const monthShort = month.slice(0, 3);
    const existingUsage = usageData.find(u => u.month === monthShort);
    let updatedUsageData;

    if (existingUsage) {
      updatedUsageData = usageData.map(u =>
        u.month === monthShort
          ? { ...u, value: u.value + parseFloat(reading) }
          : u
      );
      await fetch(`http://localhost:3001/usageData/${existingUsage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: existingUsage.value + parseFloat(reading) })
      });
    } else {
      const newUsage = { month: monthShort, value: parseFloat(reading) };
      await fetch('http://localhost:3001/usageData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsage)
      });
      updatedUsageData = await getStoredUsageData();
    }

    setUsageData(updatedUsageData);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="dashboard-container" style={{ marginLeft: 210 }}>
        <DashboardHeader />
        <SummaryCards
          totalConsumption={totalConsumption}
          amountBilled={amountBilled}
          customers={customers}
          unpaidInvoices={unpaidInvoices}
        />
        <div className="charts-row">
          <WaterUsageChart usageData={usageData} />
          <InvoiceStatusChart paidPercent={paidPercent} unpaidPercent={unpaidPercent} />
        </div>
        <div className="table-row">
          <CustomerBillingTable rows={billings} />
        </div>
        <MeterReadingCalculator
          onAddMeterReading={handleAddMeterReading}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default App;
