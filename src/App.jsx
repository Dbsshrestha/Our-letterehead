import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Header2 from './Components/Header2/Header2';
import Login from './pages/Login';
import Register from './pages/Register';
import Letterhead from './pages/Letterhead';
import Main from './pages/Main';
import Another from './pages/Another';
import './App.css';
//import Userdashboard from './pages/Userdashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'; 
//import { gapi } from 'gapi-script';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

function AppContent() {
  const location = useLocation();
  return (
    <>
      {['/another', '/main'].includes(location.pathname) ? <Header2 /> : <Header />}
      <div className="login-container">
        <Routes>
          <Route path="/" element={<Letterhead />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/another" element={<Another />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </>
  );
}

/* gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: "565407833235-tqv9nd8efn1v8gosqmr2vndh4nkbfgli.apps.googleusercontent.com",
    plugin_name: "chat"
  });
});
 */
export default App;
