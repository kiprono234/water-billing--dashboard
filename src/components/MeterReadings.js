import React from 'react';

const dummyReadings = {
  'Kevin': [
    { date: '2025-07-01', reading: 10 },
    { date: '2025-06-01', reading: 7 },
    { date: '2025-05-01', reading: 2 },
  ],
  'Mary': [
    { date: '2025-07-01', reading: 5 },
    { date: '2025-06-01', reading: 2 },
  ],
};

const PRICE_PER_M3 = 150;

const MeterReadings = ({ username }) => {
  const readings = dummyReadings[username.toLowerCase()] || [];

  // Calculate consumption and amount for each period (skip first, as no previous reading)
  const rows = readings.slice(1).map((r, i) => {
    const prev = readings[i];
    const consumption = r.reading - prev.reading;
    const amount = consumption * PRICE_PER_M3;
    return {
      date: r.date,
      reading: r.reading,
      consumption,
      amount,
    };
  });

  return (
    <div style={{ padding: 40 }}>
      <h2>Your Meter Readings</h2>
      {rows.length === 0 ? (
        <p>No readings found for this user.</p>
      ) : (
        <table style={{ width: '400px', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reading</th>
              <th>Consumption (m³)</th>
              <th>Amount Billed (KSh)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.date}</td>
                <td>{row.reading}</td>
                <td>{row.consumption}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeterReadings;