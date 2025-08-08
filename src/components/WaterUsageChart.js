import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './WaterUsageChart.scss';

const WaterUsageChart = ({ usageData }) => (
  <div className="water-usage-card">
    <div className="water-usage-title">Water Usage (Monthly)</div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={usageData}
        margin={{ top: 12, right: 18, left: 0, bottom: 4 }}
      >
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="month"  
          tickLine={false}
          axisLine={false}
          />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3f8efc"
          strokeWidth={3}
          dot={{ r: 5 }}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WaterUsageChart;