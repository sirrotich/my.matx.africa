import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/VerifyOtp.css';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contactInfo, loginMethod, email, phone_number } = location.state || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isBackDisabled, setIsBackDisabled] = useState(false);

  const inputRefs = useRef([]);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountdownActive, setIsCountdownActive] = useState(loginMethod === 'mobile');

  useEffect(() => {
    // Check if any OTP digit is entered
    const hasAnyDigit = otp.some(digit => digit !== '');
    setIsBackDisabled(hasAnyDigit);
  }, [otp]);

  const handleBack = () => {
    if (!isBackDisabled) {
      navigate(-1);
    }
  };


  useEffect(() => {
    let timer;
    if (loginMethod === 'mobile' && isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }

    return () => clearInterval(timer);
  }, [countdown, isCountdownActive, loginMethod]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp([...newOtp, '', '', '', '', ''].slice(0, 6));
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit;
        }
      });
      if (inputRefs.current[pastedData.length - 1]) {
        inputRefs.current[pastedData.length - 1].focus();
      }
    }
  };

  const handleNext = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      const requestBody = {
        email: loginMethod === 'email' ? contactInfo : '',
        phone_number: loginMethod === 'mobile' ? contactInfo : '',
        otp: otpString,
        channel: 'web'
      };

      try {
        const response = await axios.post('https://apis.gasmat.africa/users/verify-otp', requestBody);
        const { access_token, user_info } = response.data;

        localStorage.setItem('user_id', user_info.user_id);
        localStorage.setItem('access_token', access_token);

        toast.success('OTP verified successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Failed to verify OTP. Please try again.');
      }
    } else {
      toast.error('Please enter a valid OTP.');
    }
  };

  const handleResendCode = async () => {
    if (loginMethod === 'mobile' && (isResending || isCountdownActive)) return;
    setIsResending(true);

    const requestBody = {
      email: loginMethod === 'email' ? contactInfo : '',
      phone_number: loginMethod === 'mobile' ? contactInfo : '',
      user_type: 'customer',
      channel: 'web'
    };

    try {
      await axios.post('https://apis.gasmat.africa/users/authenticate', requestBody);
      toast.success(`New OTP sent successfully to ${contactInfo}`);
      if (loginMethod === 'mobile') {
        setCountdown(60);
        setIsCountdownActive(true);
      }
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const isNextButtonDisabled = otp.filter(val => val !== '').length < 6;

  const renderResendCode = () => {
    if (loginMethod === 'mobile') {
      return isCountdownActive ? (
        `Resend code in ${formatTime(countdown)}`
      ) : (
        <>
          I didn't receive code?{' '}
          <span 
            className="resend-link" 
            onClick={handleResendCode}
            style={{ 
              cursor: isResending ? 'not-allowed' : 'pointer',
              opacity: isResending ? 0.7 : 1 
            }}
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </span>
        </>
      );
    } else {
      return (
        <>
          I didn't receive code?{' '}
          <span 
            className="resend-link" 
            onClick={handleResendCode}
            style={{ 
              cursor: isResending ? 'not-allowed' : 'pointer',
              opacity: isResending ? 0.7 : 1 
            }}
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </span>
        </>
      );
    }
  };

  const renderContactMessage = () => {
    if (loginMethod === 'email') {
      return `A login code has been sent to ${contactInfo}`;
    } else {
      return (
        <>
          A login code SMS has been sent to <span style={{ fontWeight: 700 }}>{contactInfo}</span>
        </>
      );
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-form-container">
        <h1 className="verify-title">Verify your login code</h1>
        <p className="otp-sent-message">
          {renderContactMessage()}
        </p>
        <div className="otp-input-container" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue)) {
                  handleOtpChange(inputValue, index);
                }
              }}
              placeholder="-"
              maxLength="1"
              ref={(el) => inputRefs.current[index] = el}
            />
          ))}
        </div>
        <p className="resend-code-text">
          {renderResendCode()}
        </p>
        <button
          className={`send-code-button ${isNextButtonDisabled ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={isNextButtonDisabled}
        >
          Login <span className="arrow-icon">→</span>
        </button>
        <button
          className={`back-button ${isBackDisabled ? 'disabled' : ''}`}
          onClick={handleBack}
          disabled={isBackDisabled}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
