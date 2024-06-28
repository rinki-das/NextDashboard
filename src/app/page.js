// src/app/page.js
/** @jsxImportSource @emotion/react */
/** @jsxRuntime classic */
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar';
import Task from './pages/Task';

// Dynamically import page components
const Process = dynamic(() => import('../app/pages/Process'));
const SmartInsights = dynamic(() => import('./pages/SmartInsights'));

const DashboardPage = () => {
  const [selectedPage, setSelectedPage] = useState('Task');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex ${isSidebarOpen ? '' : 'sidebarClosed'}`}>
      <Sidebar onSelect={setSelectedPage} isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main
        className="flex-1 p-6 transition-margin duration-300"
        css={{ marginLeft: isSidebarOpen ? '-1rem' : '' }}
      >
        <Task isSidebarOpen={isSidebarOpen} />
      </main>
    </div>
  );
};

export default DashboardPage;
