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
// import Userdashboard from './pages/Userdashboard';
import { gapi } from 'gapi-script';

function App() {
  return (
    <Router>
      <div>
        <div className="login-container">
          <Routes>
            <Route path="/" element={<Letterhead />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/another" element={<Another />} />
          {/* <Route path="/userdashboard" element={<Userdashboard/>} /> */}
        </Routes>
      </div>
    </Router>
  );
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "565407833235-tqv9nd8efn1v8gosqmr2vndh4nkbfgli.apps.googleusercontent.com",
      plugin_name: "chat"
    });
  });
}

export default App;


