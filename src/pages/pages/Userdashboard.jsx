import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import './userdashboard.css';

const Userdashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logged out');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          User Dashboard
        </div>
        <ul className="sidebar-menu">
          <li><MdDashboard /><a href="#">Dashboard</a></li>
          <li><IoLogOut /><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
      <div className="main-content">
        {/* Your main content goes here */}
        <div>
          <h2>Welcome to Your Dashboard</h2>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
