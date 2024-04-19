import React, { useState, useEffect } from 'react';
import './Register.css'; // Import the CSS file
import { FaUser, FaLock } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    gmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isAllValidated, setIsAllValidated] = useState(false);
  

  useEffect(() => {
    const validateForm = () => {
      let errors = {};
      let formIsValid = true;

      // Username validation (optional)
      // Gmail validation
      if (!formData.gmail || !formData.gmail.includes('@gmail.com')) {
        errors.gmail = 'Please enter a valid Gmail address.';
        formIsValid = false;
      }

      // Password validation
      if (!formData.password) {
        errors.password = 'Please enter a password.';
        formIsValid = false;
      }

      setErrors(errors);
      setIsFormValid(formIsValid);

      // Calculate password strength (optional)
      setPasswordStrength(calculatePasswordStrength(formData.password));
    };

    validateForm();
  }, [formData]);

  useEffect(() => {
    // Check if all validations are met
    setIsAllValidated(isFormValid && isConfirmPasswordValid);
  }, [isFormValid, isConfirmPasswordValid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'confirmPassword') {
      setIsConfirmPasswordValid(formData.confirmPassword === formData.password);
    }
  };

  const calculatePasswordStrength = (password) => {
    // Simple password strength calculation (optional)
    if (password.length < 8) {
      return 'Weak';
    } else if (password.length < 12) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log('Form data:', formData);
  };
  

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className='input-box'>
          <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleInputChange} required/>
          <FaUser className='icon'/>
        </div>
        <div className="validation-box">
          {/* Username error message */}
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        
        <div className='input-box Gmail'>
          <input type='text' name='gmail' placeholder='Gmail' value={formData.gmail} onChange={handleInputChange} required/>
          <BiLogoGmail className='icon'/>
        </div>
        <div className="validation-box">
          {/* Gmail error message */}
          {errors.gmail && <span className="error">{errors.gmail}</span>}
        </div>

        <div className='input-box password'>
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} required/>
          <FaLock className='icon'/>
          <div className='password-strength'>{passwordStrength}</div>
          <div className='password-validation'>
            <span className={isAllValidated ? 'check-mark' : 'check-mark disabled'}>
              {isAllValidated ? '\u2714' : ''}
            </span>
            <div className='validation-box'>
              {/* Password validation error message */}
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>
          </div>
        </div>

        <div className='input-box confirm-password-input-box'>
          <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleInputChange} onBlur={handleBlur} required/>
          <RiLockPasswordFill className='icon'/>  
          <div className="confirm-password-validation">
            <span className={isConfirmPasswordValid ? 'valid' : 'invalid'}>
              {isConfirmPasswordValid ? 'Passwords match' : 'Passwords do not match'}
            </span>
          </div>
        </div>

        <button type='submit' disabled={!isFormValid}>Register</button>
      </form>
      <div className='password-input-space'></div> {/* Space below password input */}
    </div>
  );
};

export default Register;


