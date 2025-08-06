import React, { useState } from 'react';
import './MeterReadingCalculator.scss';

const RATE_PER_M3 = 150;
const MONTHS = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];

const MeterReadingCalculator = ({ onAddMeterReading, user, onLogin, onLogout }) => {
  const [month, setMonth] = useState('');
  const [reading, setReading] = useState('');
  const [payNow, setPayNow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loginName, setLoginName] = useState('');

  const total = reading ? parseFloat(reading) * RATE_PER_M3 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddMeterReading && month && reading) {
      onAddMeterReading({
        month,
        reading,
        amount: total,
        payNow,
      });
      setSubmitted(true);
      setMonth('');
      setReading('');
      setPayNow(false);
      setTimeout(() => setSubmitted(false), 2000); // Reset submission after 2s
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginName.trim() && onLogin) {
      onLogin({ name: loginName.trim() });
      setLoginName('');
    }
  };

  if (!user) {
    // Show login form only in Meter Reading section
    return (
      <div className="meter-calculator-card">
        <h2>Meter Reading & Bill Calculator</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="loginName">Please log in to input your meter readings:</label>
            <input
              type="text"
              id="loginName"
              placeholder="Enter your name"
              value={loginName}
              onChange={e => setLoginName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="pay-btn">Log In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="meter-calculator-card">
      <h2>Meter Reading & Bill Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>User Name:</label>
          <input type="text" disabled value={user.name} />
          <button type="button" style={{marginLeft:12}} onClick={onLogout}>Logout</button>
        </div>
        <div className="input-group">
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="meterReading">Meter Reading (m³):</label>
          <input
            type="number"
            id="meterReading"
            value={reading}
            onChange={e => setReading(e.target.value.replace(/[^\d.]/g, ''))}
            min="0"
            placeholder="Enter meter reading"
            required
          />
        </div>
        <div className="input-group">
          <label>Payment Option:</label>
          <div>
            <label>
              <input type="radio" name="payNow" checked={payNow} onChange={() => setPayNow(true)} />
              Pay Now
            </label>
            <label style={{marginLeft:12}}>
              <input type="radio" name="payNow" checked={!payNow} onChange={() => setPayNow(false)} />
              Pay Later
            </label>
          </div>
        </div>
        <div className="result">
          {reading && (
            <span>
              Total Bill: <b>KSh {total.toLocaleString()}</b>
            </span>
          )}
        </div>
        <button 
          type="submit" 
          className="pay-btn" 
          disabled={!month || !reading || submitted}
        >
          {submitted ? 'Submitted!' : 'Confirm'}
        </button>
      </form>
      {submitted && (
        <div className="confirmation">
          <span>
            Thank you, {user.name}! Reading for {month} was submitted. Status: <b>{payNow ? "Paid" : "Unpaid"}</b>
          </span>
        </div>
      )}
    </div>
  );
};

export default MeterReadingCalculator;