import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './InvoiceStatusChart.scss';

const data = [
  { name: 'Paid', value: 0},
  { name: 'Unpaid', value: 0},
];

const COLORS = ['#3f8efc', '#f6a623'];

const InvoiceStatusChart = () => (
  <div className="invoice-status-card">
    <div className="invoice-status-title">Invoice Status</div>
    <ResponsiveContainer width="100%" height={210}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={72}
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <div className="invoice-status-center">
      <span></span>
    </div>
    <div className="invoice-status-legend">
      <div>
        <span className="dot paid" /> Paid <span className="number">%</span>
      </div>
      <div>
        <span className="dot unpaid" /> Unpaid <span className="number">%</span>
      </div>
    </div>
  </div>
);

export default InvoiceStatusChart;