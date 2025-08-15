import React, { useState } from 'react';
import './Sidebar.scss';

const navItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <span className="icon">&#8962;</span>,
    hasSubmenu: true
  },
  { key: 'usage', label: 'Usage', icon: <span className="icon">&#128202;</span> },
  { key: 'customers', label: 'Customers', icon: <span className="icon">&#128101;</span> },
  { key: 'billComplaints', label: 'Bill Complaints', icon: <span className="icon">&#9881;</span> },
];

const Sidebar = ({ activeSection = 'dashboard', setActiveSection, onOpenComplaint }) => {
  const [active, setActive] = useState(activeSection);
  const [showDashboardSubmenu, setShowDashboardSubmenu] = useState(false);

  const handleNav = (key, hasSubmenu) => {
    setActive(key);
    if (setActiveSection) setActiveSection(key);
    if (key === 'dashboard' && hasSubmenu) {
      setShowDashboardSubmenu(prev => !prev);
    } else {
      setShowDashboardSubmenu(false);
      if (key === 'billComplaints' && typeof onOpenComplaint === 'function') {
        onOpenComplaint();
      }
    }
  };

  const handleDashboardChoice = (dashboardKey) => {
    setActive(dashboardKey);
    setShowDashboardSubmenu(false);
    if (setActiveSection) setActiveSection(dashboardKey);
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {navItems.map(item => (
            <li
              key={item.key}
              className={
                active === item.key ||
                (showDashboardSubmenu && item.key === 'dashboard') ||
                (active === 'userDashboard' && item.key === 'dashboard') ||
                (active === 'adminDashboard' && item.key === 'dashboard')
                  ? 'active' : ''
              }
              onClick={() => handleNav(item.key, item.hasSubmenu)}
            >
              {item.icon}
              <span className="label">{item.label}</span>
              {item.key === 'dashboard' && showDashboardSubmenu && (
                <ul className="dashboard-submenu">
                  <li
                    className={active === 'userDashboard' ? 'active' : ''}
                    onClick={e => {
                      e.stopPropagation();
                      handleDashboardChoice('userDashboard');
                    }}
                  >
                    User Dashboard
                  </li>
                  <li
                    className={active === 'adminDashboard' ? 'active' : ''}
                    onClick={e => {
                      e.stopPropagation();
                      handleDashboardChoice('adminDashboard');
                    }}
                  >
                    Admin Dashboard
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;