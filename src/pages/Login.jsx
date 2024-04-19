import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from 'react-google-login';
import './login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const recaptchaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLoginSuccess = async (googleData) => {
    // Handle successful Google login
    console.log('Google Login successful', googleData);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google login
    console.error('Google Login Error:', error);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const token = await recaptchaRef.current.executeAsync();
      // Now you can send the token to your server for verification
      const formData = new FormData(e.target);
      formData.append('recaptchaToken', token);

      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
      } else {
        // Handle login failure
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' name='username' placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' name='password' placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className="remember-forgot">
          <label><input type='checkbox' name='rememberMe' />Remember me</label>
        </div>
        <div className="captcha-container" style={{ marginBottom: '20px' }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LcUlm8pAAAAAPTM3LlbDxQY9Q4nUrRTQOOPBqnI"
            // Other props
          />
        </div>
        <button type='submit'>Login</button>
        <div className="or-line">
          <span className="line"></span>
          <span className="or">or</span>
          <span className="line"></span>
        </div>
        <div className="google-login-container">
          <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="register-link">
          <p>Don't have an account? <a href='/Register'>Register here</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
