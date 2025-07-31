import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './WaterUsageChart.scss';

const WaterUsageChart = ({ usageData }) => (
  <div className="water-usage-card">
    <div className="water-usage-title">Water Usage</div>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={usageData} margin={{ top: 16, right: 24, left: -20, bottom: 8 }}>
        <CartesianGrid stroke="#e0e6ed" vertical={false} />
        <XAxis dataKey="month" fontSize={13} />
        <YAxis fontSize={13} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3f8efc" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WaterUsageChart;