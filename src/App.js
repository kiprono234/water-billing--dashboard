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

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [billings, setBillings] = useState([]);
  const [usageData, setUsageData] = useState([]);

  // Load on mount
  useEffect(() => {
    setUsers(getStoredUsers());
    setBillings(getStoredBillings());
    setUsageData(getStoredUsageData());
  }, []);

  // Persist changes
  useEffect(() => { setStoredUsers(users); }, [users]);
  useEffect(() => { setStoredBillings(billings); }, [billings]);
  useEffect(() => { setStoredUsageData(usageData); }, [usageData]);

  // Dashboard calculations
  const totalInvoices = billings.length;
  const paidInvoices = billings.filter(b => b.status === 'Paid').length;
  const unpaidInvoices = billings.filter(b => b.status === 'Unpaid').length;
  const paidPercent = totalInvoices ? Math.round((paidInvoices / totalInvoices) * 100) : 0;
  const unpaidPercent = totalInvoices ? Math.round((unpaidInvoices / totalInvoices) * 100) : 0;
  const totalConsumption = billings.reduce((acc, cur) => acc + cur.reading, 0);
  const amountBilled = billings.reduce((acc, cur) => acc + cur.amount, 0);
  const customers = new Set(billings.map(b => b.name)).size;

  const handleLogin = ({ name }) => {
    let newUsers = users;
    if (!users.find(u => u.name === name)) {
      newUsers = [...users, { name }];
      setUsers(newUsers);
    }
    setUser({ name });
  };

  const handleLogout = () => setUser(null);

  const handleAddMeterReading = ({ month, reading, amount, payNow }) => {
    const year = new Date().getFullYear();
    const monthIndex = MONTHS.indexOf(month) + 1;
    const formattedDate = `01/${monthIndex.toString().padStart(2, '0')}/${year}`;
    const newBilling = {
      name: user.name,
      date: formattedDate,
      month,
      reading: parseFloat(reading),
      amount,
      status: payNow ? "Paid" : "Unpaid"
    };
    setBillings(prev => [...prev, newBilling]);
    setUsageData(prev => {
      const monthShort = month.slice(0, 3);
      const found = prev.find(u => u.month === monthShort);
      if (found) {
        return prev.map(u =>
          u.month === monthShort
            ? { ...u, value: u.value + parseFloat(reading) }
            : u
        );
      } else {
        return [
          ...prev,
          { month: monthShort, value: parseFloat(reading) }
        ];
      }
    });
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
}

export default App;