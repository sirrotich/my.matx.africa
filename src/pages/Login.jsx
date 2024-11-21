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
      if (error.response && error.response.status === 400) {
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
          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10201 5.75828C2.10201 5.28079 2.4891 4.8937 2.9666 4.8937H14.0333C14.5108 4.8937 14.8978 5.28079 14.8978 5.75828V12.675C14.8978 13.1524 14.5108 13.5395 14.0333 13.5395H2.9666C2.4891 13.5395 2.10201 13.1524 2.10201 12.675V5.75828ZM2.9666 3.8562C1.91611 3.8562 1.06451 4.70779 1.06451 5.75828V12.675C1.06451 13.7254 1.91611 14.577 2.9666 14.577H14.0333C15.0838 14.577 15.9353 13.7254 15.9353 12.675V5.75828C15.9353 4.70779 15.0838 3.8562 14.0333 3.8562H2.9666ZM5.3391 6.71666C5.10439 6.55237 4.78093 6.60945 4.61664 6.84416C4.45234 7.07887 4.50942 7.40232 4.74413 7.56662L8.20246 9.98745C8.38108 10.1125 8.61881 10.1125 8.79743 9.98745L12.2558 7.56662C12.4905 7.40232 12.5476 7.07887 12.3833 6.84416C12.219 6.60945 11.8955 6.55237 11.6608 6.71666L8.49994 8.92926L5.3391 6.71666Z" fill="#292927"/>
</svg>

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