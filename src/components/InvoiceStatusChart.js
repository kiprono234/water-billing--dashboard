import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './InvoiceStatusChart.scss';

const COLORS = ['#3f8efc', '#f6a623'];

const InvoiceStatusChart = ({ paidPercent =0 , unpaidPercent =0  }) => {
  const data = [
    { name: 'Paid', value: paidPercent },
    { name: 'Unpaid', value: unpaidPercent },
  ];
   
  
  return (
    <div className="invoice-status-card">
      <div className="invoice-status-title">Invoice Status</div>
      <ResponsiveContainer width="100%" height={210}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={78}
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
        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f8efc' }}>{paidPercent}%</span>
      </div>
      <div className="invoice-status-legend">
        <div>
          <span className="dot paid" /> Paid <span className="number">{paidPercent}%</span>
        </div>
        <div>
          <span className="dot unpaid" /> Unpaid <span className="number">{unpaidPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatusChart;