import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Letterhead from './pages/Letterhead';
import Main from './pages/Main';
import Another from './pages/Another';
import './App.css';
import Userdashboard from './pages/Userdashboard';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="login-container">
          <Routes>
            <Route path="/letterhead" element={<Letterhead />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/another" element={<Another />} />
          <Route path="/userdashboard" element={<Userdashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
