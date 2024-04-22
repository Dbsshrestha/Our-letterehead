import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation hooks
import "./header2.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/Logo.png';
import { GoogleLogout } from 'react-google-login';



const Header = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [isLoggedOut, setIsLoggedOut] = useState(false);


  const handleLogout = () => {
    // Clear user's session or authentication token
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    // Set isLoggedOut state to true to render the GoogleLogout component
    setIsLoggedOut(true);
  };

  const handleGoogleLogoutSuccess = () => {
    // Redirect to the letterhead page after successful Google logout
    navigate('/');
  };

  const handleGoogleLogoutFailure = (error) => {
    console.error('Google Logout Error:', error);
  };
  

  return (
    <div className="white-bg">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src={logo}
              width="70"
              height="65"
              className="d-inline-block align-top"
              alt="Unique LetterHead Logo"
            />
            <span className="ms-2">Unique LetterHead</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/main">Main</Nav.Link>
            <Nav.Link href="/another">Another</Nav.Link>
            <Nav.Link className="logout-link" onClick={handleLogout}>Logout</Nav.Link>
            {isLoggedOut && (
              <GoogleLogout
                clientId="565407833235-tqv9nd8efn1v8gosqmr2vndh4nkbfgli.apps.googleusercontent.com"
                onLogoutSuccess={handleGoogleLogoutSuccess}
                onFailure={handleGoogleLogoutFailure}
              />
            )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
