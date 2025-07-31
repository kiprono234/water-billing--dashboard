import React, { useState } from 'react';
import './Sidebar.scss';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <span className="icon">&#8962;</span> },
  { key: 'usage', label: 'Usage', icon: <span className="icon">&#128202;</span> },
  { key: 'customers', label: 'Customers', icon: <span className="icon">&#128101;</span> },
  { key: 'settings', label: 'Settings', icon: <span className="icon">&#9881;</span> },
];

const Sidebar = ({ activeSection, setActiveSection }) => (
  <aside className="sidebar">
    <nav>
      <ul>
        {navItems.map(item => (
          <li
            key={item.key}
            className={activeSection === item.key ? 'active' : ''}
            onClick={() => setActiveSection(item.key)}
          >
            {item.icon}
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;