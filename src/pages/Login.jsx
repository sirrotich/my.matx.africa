import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Function to handle sending the OTP code
  const handleSendCode = async () => {
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Make API request to send the OTP
      const response = await axios.post('https://apis.gasmat.africa/users/login', { email });
      toast.success(`OTP sent successfully to ${email}`); // Success notification
      navigate('/verify-otp', { state: { email } }); // Navigate to verify OTP page
    } catch (error) {
      // Log more detailed error message
      console.error('Error sending code:', error.response ? error.response.data : error.message);
      
      // Check for specific status codes to show user-friendly error messages
      if (error.response && error.response.status === 404) {
        toast.error('Email not found. Please check and try again.');
      } else if (error.response && error.response.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    }
  };

  // Function to validate the email using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change and validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <p className="email-label">Enter your email address</p>

        <div className={`email-input-container ${isFocused ? 'focused' : ''}`}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Your Email"
            required
          />
          <span className="email-icon">
            {/* SVG Icon */}
          </span>
        </div>

        <button
          className={`send-code-button ${!isValidEmail ? 'disabled' : ''}`}
          onClick={handleSendCode}
          disabled={!isValidEmail}
        >
          Send Code <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
