import React, { useState } from 'react';
import './LoginForm.scss';

const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (name) onLogin({ name });
  };
  return (
    <div className="login-card">
      <h2>Water Billing System Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default LoginForm;