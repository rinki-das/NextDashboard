// Sidebar.js

import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { FiChevronRight, FiChevronLeft, FiGrid, FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi';

const Sidebar = ({ onSelect, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Task');
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle();
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setHoveredItem(null);
    onSelect(item);
  };

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <button onClick={toggleSidebar} className={styles.sidebarToggle}>
        {isOpen ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      <div className={styles.sidebarContent}>
        {isOpen ? (
          <>
            <div className={styles.sidebarLogo} onClick={() => handleItemClick('')}>
              <img src="/img1.jpg" alt="Logo" className={styles.logoImage} />
            </div>
            <ul className={styles.sidebarList}>
              <li
                className={`${styles.sidebarItem} ${selectedItem === 'Task' ? styles.active : ''} ${hoveredItem === 'Task' ? styles.hovered : ''}`}
                onClick={() => handleItemClick('Task')}
                onMouseEnter={() => handleItemHover('Task')}
                onMouseLeave={() => handleItemHover(null)}
              >
                <div className={styles.sidebarIconContainer}>
                  <FiGrid className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Task</span>
                </div>
              </li>
              <li
                className={`${styles.sidebarItem} ${selectedItem === 'Process' ? styles.active : ''} ${hoveredItem === 'Process' ? styles.hovered : ''}`}
                onClick={() => handleItemClick('Process')}
                onMouseEnter={() => handleItemHover('Process')}
                onMouseLeave={() => handleItemHover(null)}
              >
                <div className={styles.sidebarIconContainer}>
                  <FiBarChart2 className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Process</span>
                </div>
              </li>
              <li
                className={`${styles.sidebarItem} ${selectedItem === 'Smart Insights' ? styles.active : ''} ${hoveredItem === 'Smart Insights' ? styles.hovered : ''}`}
                onClick={() => handleItemClick('Smart Insights')}
                onMouseEnter={() => handleItemHover('Smart Insights')}
                onMouseLeave={() => handleItemHover(null)}
              >
                <div className={styles.sidebarIconContainer}>
                  <FiFileText className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Reports</span>
                </div>
              </li>
              <li
                className={`${styles.sidebarItem} ${selectedItem === 'Settings' ? styles.active : ''} ${hoveredItem === 'Settings' ? styles.hovered : ''}`}
                onClick={() => handleItemClick('Settings')}
                onMouseEnter={() => handleItemHover('Settings')}
                onMouseLeave={() => handleItemHover(null)}
              >
                <div className={styles.sidebarIconContainer}>
                  <FiSettings className={styles.sidebarIcon} /> <span className={styles.sidebarText}>Settings</span>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarItem} onClick={() => handleItemClick('Task')}>
              <div className={styles.sidebarIconContainer}>
                <FiGrid className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => handleItemClick('Process')}>
              <div className={styles.sidebarIconContainer}>
                <FiBarChart2 className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => handleItemClick('Smart Insights')}>
              <div className={styles.sidebarIconContainer}>
                <FiFileText className={styles.sidebarIcon} />
              </div>
            </li>
            <li className={styles.sidebarItem} onClick={() => handleItemClick('Settings')}>
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
