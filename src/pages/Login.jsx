import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('mobile');
  const [contactInfo, setContactInfo] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const formatPhoneNumber = (number) => {
    // Remove all non-digit characters
    let cleaned = number.replace(/\D/g, '');

    // Convert to 0... format for consistency
    if (cleaned.startsWith('254')) {
      cleaned = '0' + cleaned.substring(3);
    }
    return cleaned;
  };

  const validateInput = (value) => {
    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      // Clean and format the number first
      const formatted = formatPhoneNumber(value);
      // Only validate 07... or 01... format
      const phoneRegex = /^0[17]\d{8}$/;
      return phoneRegex.test(formatted);
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    
    if (loginMethod === 'mobile') {
      // Allow +, digits, and spaces in input for user convenience
      value = value.replace(/[^\d\s+]/g, '');
    }
    
    setContactInfo(value);
    setIsValid(validateInput(value));
  };

  const handleSendCode = async () => {
    if (!isValid) {
      toast.error(`Please enter a valid ${loginMethod === 'email' ? 'email address' : 'mobile number'}`);
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    let formattedPhone = contactInfo;
    if (loginMethod === 'mobile') {
      // Format to 0... format first
      formattedPhone = formatPhoneNumber(contactInfo);
    }

    const requestBody = {
      email: loginMethod === 'email' ? contactInfo : '',
      phone_number: loginMethod === 'mobile' ? formattedPhone : '',
      user_type: 'customer',
      channel: 'web'
    };

    try {
      const response = await axios.post('https://apis.gasmat.africa/users/authenticate', requestBody);
      toast.success(`OTP sent successfully to ${formattedPhone}`);
      navigate('/verify-otp', { 
        state: { 
          contactInfo: formattedPhone, // Pass the formatted number
          loginMethod,
          email: requestBody.email,
          phone_number: requestBody.phone_number
        }
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.status === 400 
        ? `${loginMethod === 'email' ? 'Email' : 'Mobile number'} not found` 
        : 'Failed to send OTP. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <div className="toggle-container">
          <button 
            className={`toggle-btn ${loginMethod === 'mobile' ? 'active' : ''}`}
            onClick={() => setLoginMethod('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`toggle-btn ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => setLoginMethod('email')}
          >
            Email
          </button>
        </div>

        <h2 className="welcome-text">Welcome and Login With...</h2>

        <div className="input-container">
          <input
            type={loginMethod === 'email' ? 'email' : 'tel'}
            value={contactInfo}
            onChange={handleInputChange}
            placeholder={loginMethod === 'email' ? 'Your Email' : 'Your Mobile Number'}
          />
          <span className="icon">
            {loginMethod === 'email' ? (
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.6236 2.93584C12.7527 2.41331 11.6648 2.41331 10.7939 2.93584L2.79388 7.73584C1.96556 8.23283 1.45874 9.12797 1.45874 10.0939V20.9616C1.45874 22.4803 2.68996 23.7116 4.20874 23.7116H20.2087C21.7275 23.7116 22.9587 22.4803 22.9587 20.9616V10.0939C22.9587 9.12797 22.4519 8.23283 21.6236 7.73584L13.6236 2.93584ZM11.5656 4.22208C11.9615 3.98457 12.456 3.98457 12.8519 4.22208L20.8519 9.02208C21.2284 9.24798 21.4587 9.65487 21.4587 10.0939V20.9616C21.4587 21.6519 20.8991 22.2116 20.2087 22.2116H4.20874C3.51838 22.2116 2.95874 21.6519 2.95874 20.9616V10.0939C2.95874 9.65487 3.18911 9.24798 3.56562 9.02208L11.5656 4.22208ZM7.63884 12.3475C7.2995 12.11 6.83186 12.1925 6.59432 12.5318C6.35678 12.8712 6.43931 13.3388 6.77865 13.5763L11.7786 17.0763C12.0369 17.2571 12.3806 17.2571 12.6388 17.0763L17.6388 13.5763C17.9782 13.3388 18.0607 12.8712 17.8232 12.5318C17.5856 12.1925 17.118 12.11 16.7786 12.3475L12.2087 15.5464L7.63884 12.3475Z" fill="#292927"/>
              </svg>
            ) : (
              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.87565 2.08667L7.25046 2.08667C7.53151 2.08667 7.78313 2.26087 7.88206 2.52393L9.19156 6.00578C9.23491 6.12103 9.24589 6.24595 9.22333 6.36699L8.56717 9.8867C9.37365 11.7834 10.7058 13.0579 12.9152 14.2012L16.3926 13.5274C16.5161 13.5034 16.6438 13.5145 16.7613 13.5593L20.2538 14.8902C20.5155 14.9899 20.6883 15.2408 20.6883 15.5207L20.6883 18.7456C20.6883 20.2081 19.3997 21.3949 17.8925 21.067C15.1451 20.4692 10.0551 18.9497 6.49033 15.385C3.07573 11.9704 1.93168 7.25339 1.54657 4.7037C1.32682 3.24887 2.4936 2.08667 3.87565 2.08667ZM6.7833 3.43626L3.87565 3.43626C3.22872 3.43626 2.79774 3.95076 2.88103 4.50214C3.25241 6.96093 4.33894 11.325 7.44463 14.4307C10.7272 17.7132 15.4992 19.165 18.1794 19.7482C18.7681 19.8763 19.3388 19.4281 19.3388 18.7456L19.3387 15.9857L16.4605 14.8889L12.9441 15.5703C12.7978 15.5986 12.6462 15.5778 12.513 15.5109C9.90898 14.2039 8.21844 12.6543 7.24068 10.2099C7.19318 10.0912 7.1804 9.96136 7.20384 9.83563L7.86209 6.30469L6.7833 3.43626Z" fill="#292927"/>
              </svg>
            )}
          </span>
        </div>

        <div>
          <button
            className={`login-btn ${!isValid ? 'disabled' : ''}`}
            onClick={handleSendCode}
            disabled={!isValid || isProcessing}
          >
            {isProcessing ? 'Sending...' : 'Get Login Code →'}
          </button>
        </div>

        <div className="agreement-container">
          <div className="agreement-text">
            By logging in, you agree to our
          </div>
          <div className="agreement-links">
            <a href="#" className="agreement-link">Terms of Use</a>
            {' '}and{' '}
            <a href="#" className="agreement-link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
