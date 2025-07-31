import React, { useState } from 'react';

const getMonths = () => [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MeterInputForm = ({ onSubmit, lastReading }) => {
  const [reading, setReading] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [paid, setPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReading = parseInt(reading, 10);

    if (
      !isNaN(newReading) &&
      newReading > lastReading &&
      month &&
      year &&
      paid
    ) {
      const monthIdx = getMonths().indexOf(month) + 1;
      const date = `${year}-${monthIdx.toString().padStart(2, '0')}-01`;
      onSubmit(newReading, date, paid, paid === 'Paid' ? paymentMethod : '');
      // reset
      setReading('');
      setMonth('');
      setYear(new Date().getFullYear());
      setPaid('');
      setPaymentMethod('');
    } else {
      alert('Please fill all required fields.');
    }
  };

  const years = [];
  for (let y = new Date().getFullYear() - 5; y <= new Date().getFullYear() + 1; y++) years.push(y);

  return (
    <form onSubmit={handleSubmit} style={{ margin: '32px 40px 0 40px', display: 'flex', gap: 12, alignItems: 'center' }}>
      <input
        type="number"
        min={lastReading + 1}
        value={reading}
        onChange={e => setReading(e.target.value)}
        placeholder={`Enter new meter reading (last: ${lastReading})`}
        required
        style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', width: 200 }}
      />
      <select
        value={month}
        onChange={e => setMonth(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', minWidth: 120 }}
      >
        <option value="">Select Month</option>
        {getMonths().map(m => <option value={m} key={m}>{m}</option>)}
      </select>
      <select
        value={year}
        onChange={e => setYear(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', minWidth: 80 }}
      >
        {years.map(y => <option value={y} key={y}>{y}</option>)}
      </select>
      <div>
        <label>
          <input
            type="radio"
            name="paid"
            value="Paid"
            checked={paid === 'Paid'}
            onChange={() => setPaid('Paid')}
          /> Paid
        </label>
        <label style={{ marginLeft: 8 }}>
          <input
            type="radio"
            name="paid"
            value="Unpaid"
            checked={paid === 'Unpaid'}
            onChange={() => setPaid('Unpaid')}
          /> Unpaid
        </label>
      </div>
      {paid === 'Paid' && (
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', minWidth: 120 }}
        >
          <option value="">Select Payment Method</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Cash">Cash</option>
        </select>
      )}
      <button type="submit" style={{
        background: '#3f8efc', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px'
      }}>
        Submit Reading
      </button>
    </form>
  );
};

export default MeterInputForm;