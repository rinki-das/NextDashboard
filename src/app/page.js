// src/app/page.js

/** @jsxImportSource @emotion/react */
/** @jsxRuntime classic */
"use client";

import React, { useState } from 'react';
import Sidebar from './pages/Sidebar'; // Adjusted import path for Sidebar
import MainPage from './pages/MainPage'; // Adjusted import path for MainPage
import AddTask from './pages/AddTask'; // Adjusted import path for AddTask
import SmartInsights from './pages/SmartInsights'; // Import the SmartInsights component

const DashboardPage = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectPage = (page) => {
    setSelectedPage(page);
    setIsSidebarOpen(true); // Ensure sidebar remains open when a page is selected
  };

  return (
    <div className={`flex ${isSidebarOpen ? '' : 'sidebarClosed'}`}>
      <Sidebar onSelect={handleSelectPage} isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main
        className="flex-1 p-6 transition-margin duration-300"
        css={{ marginLeft: isSidebarOpen ? '0' : '' }}
      >
        {/* Render MainPage as default when no page is selected */}
        {selectedPage === '' && <MainPage isSidebarOpen={isSidebarOpen} />}
        {selectedPage === 'Smart Insights' && <SmartInsights />}
        {selectedPage === 'Task' && <AddTask isSidebarOpen={isSidebarOpen} />}
      </main>
    </div>
  );
};

export default DashboardPage;
