// src/components/Sidebar.jsx

import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { FiChevronRight, FiChevronLeft, FiGrid, FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi';

const Sidebar = ({ onSelect, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(); // Call the onToggle function passed as prop
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <button onClick={toggleSidebar} className={styles.sidebarToggle}>
        {isOpen ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      <div className={styles.sidebarContent}>
        {isOpen ? (
          <>
            <div className={styles.sidebarLogo}>
              <img src="/img1.jpg" alt="Logo" className={styles.logoImage} />
            </div>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarItem} onClick={() => onSelect('Task')}>
                <div className={styles.sidebarIconContainer}>
                  <FiGrid className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Task</span>
                </div>
              </li>
              <li className={styles.sidebarItem} onClick={() => onSelect('Process')}>
                <div className={styles.sidebarIconContainer}>
                  <FiBarChart2 className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Process</span>
                </div>
              </li>
              <li className={styles.sidebarItem} onClick={() => onSelect('Smart Insights')}>
                <div className={styles.sidebarIconContainer}>
                  <FiFileText className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Reports</span>
                </div>
              </li>
              <li className={styles.sidebarItem} onClick={() => onSelect('Settings')}>
                <div className={styles.sidebarIconContainer}>
                  <FiSettings className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Settings</span>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarItem} onClick={() => onSelect('Task')}>
              <div className={styles.sidebarIconContainer}>
                <FiGrid className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => onSelect('Process')}>
              <div className={styles.sidebarIconContainer}>
                <FiBarChart2 className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => onSelect('Smart Insights')}>
              <div className={styles.sidebarIconContainer}>
                <FiFileText className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => onSelect('Settings')}>
              <div className={styles.sidebarIconContainer}>
                <FiSettings className={styles.sidebarIcon} />
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
