import React, { useState } from 'react';
import './Sidebar.scss';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <span className="icon">&#8962;</span> },
  { key: 'usage', label: 'Usage', icon: <span className="icon">&#128202;</span> },
  { key: 'customers', label: 'Customers', icon: <span className="icon">&#128101;</span> },
  { key: '', label: 'Bill Complaints', icon: <span className="icon">&#9881;</span> },
];

const Sidebar = ({ activeSection = 'dashboard', setActiveSection }) => {
  const [active, setActive] = useState(activeSection);

  const handleNav = (key) => {
    setActive(key);
    if (setActiveSection) setActiveSection(key);
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {navItems.map(item => (
            <li
              key={item.key}
              className={active === item.key ? 'active' : ''}
              onClick={() => handleNav(item.key)}
            >
              {item.icon}
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;