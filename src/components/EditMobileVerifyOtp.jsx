import React, { useState, useRef, useEffect } from 'react';
import { getUserId, getCachedUserInfo } from '../utils/auth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/EditMobileVerifyOtp.css';

const EditMobileVerifyOtp = ({ onClose, onUpdate, newPhoneNumber }) => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  const [isVerifying, setIsVerifying] = useState(false);

  const { contactNewMobileInfo, loginMethod } = location.state || {};

  const inputRefs = useRef([]);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCountdownActive, setIsCountdownActive] = useState(loginMethod === 'mobile');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    // Check if any OTP digit is entered
    const hasAnyDigit = otp.some(digit => digit !== '');
  }, [otp]);

  useEffect(() => {
    let timer;
    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
    return () => clearInterval(timer);
  }, [countdown, isCountdownActive]);

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
    // Auto submit when all digits are entered
    if (index === 5 && value && newOtp.every(digit => digit !== '')) {
      handleNext(newOtp);
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



  const handleNext = async (otpArray = otp) => {
    const otpString = otpArray.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter a valid verification code');
      return;
    }

    setIsVerifying(true);
    try {
      const userId = getUserId();
      const response = await fetch('https://apis.gasmat.africa/users/verify-update-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          user_id: userId,
          new_phone_number: newPhoneNumber,
          otp: otpString,
          channel: 'web'
        })
      });

      if (response.ok) {
        // Update cached user info
        const cachedInfo = JSON.parse(localStorage.getItem('cached_user_info') || '{}');
        localStorage.setItem('cached_user_info', JSON.stringify({
          ...cachedInfo,
          phone: newPhoneNumber
        }));

        toast.success('Phone number updated successfully');
        onUpdate({ phone: newPhoneNumber });
        onClose(); // This will return to parent
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to verify code. Please try again.');
      // Clear OTP fields on error
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (isResending || isCountdownActive) return;
    setIsResending(true);

    try {
      const userId = getUserId();
      const response = await fetch('https://apis.gasmat.africa/users/request-update-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          user_id: userId,
          new_phone_number: newPhoneNumber,
          channel: 'web'
        })
      });

      if (response.ok) {
        toast.success('New verification code sent');
        setCountdown(60);
        setIsCountdownActive(true);
        setOtp(['', '', '', '', '', '']);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        throw new Error('Failed to resend code');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to resend code. Please try again.');
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
      return `A login code has been sent to ${contactNewMobileInfo}`;
    } else {
      return (
        <>
          A login code SMS has been sent to <span style={{ fontWeight: 700 }}>{newPhoneNumber}</span>
        </>
      );
    }
  };

  const handleSubmit = () => {
    onUpdate({ mobile });
    onClose();
  };

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="edit-mobile-verify-otp-container">
      {/* Header */}
      <div className="edit-mobile-verify-otp-header">
      <div className="back-buttn" onClick={handleBack}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>
        </div>
        <span>Verification Code</span>
      </div>

      {/* Form Container */}
      <div className="verify-new-mobile-form-container">
        <h1 className="verify-new-mobile-title">Verify your mobile number</h1>
        <p className="new-mobile-otp-sent-message">
          {renderContactMessage()}
        </p>
        <div className="new-mobile-otp-input-container" onPaste={handlePaste}>
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
        <p className="new-mobile-resend-code-text">
          {renderResendCode()}
        </p>
        <button
          className={`new-mobile-send-code-button ${otp.join('').length !== 6 || isVerifying ? 'disabled' : ''}`}
          onClick={() => handleNext()}
          disabled={otp.join('').length !== 6 || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Update'}
        </button>
      
      </div>

         {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-edit-mobile-verify-otp">
          <div className={`nav-item ${activeNav === '/' ? 'active' : ''}`} onClick={() => handleNavigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.66463 7.32901C1.29415 7.51425 1.14398 7.96476 1.32922 8.33524C1.51446 8.70572 1.96497 8.85589 2.33545 8.67065L12 3.83835L21.6646 8.67065C22.0351 8.85589 22.4856 8.70572 22.6709 8.33524C22.8561 7.96476 22.7059 7.51425 22.3355 7.32901L12.6038 2.46317C12.2237 2.27314 11.7764 2.27314 11.3963 2.46317L1.66463 7.32901ZM4.75003 11C4.75003 10.5858 4.41424 10.25 4.00003 10.25C3.58582 10.25 3.25003 10.5858 3.25003 11V19C3.25003 20.5188 4.48125 21.75 6.00003 21.75H18C19.5188 21.75 20.75 20.5188 20.75 19V11C20.75 10.5858 20.4142 10.25 20 10.25C19.5858 10.25 19.25 10.5858 19.25 11V19C19.25 19.6903 18.6904 20.25 18 20.25H6.00003C5.30967 20.25 4.75003 19.6903 4.75003 19V11Z" fill="#292927"/>
</svg>

          </div>
          
          <div className={`nav-item ${activeNav === '/analytics' ? 'active' : ''}`} onClick={() => handleNavigate('/analytics')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 20.25V3.75H20.25V20.25H3.75ZM3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM16.75 8C16.75 7.58579 16.4142 7.25 16 7.25C15.5858 7.25 15.25 7.58579 15.25 8V16C15.25 16.4142 15.5858 16.75 16 16.75C16.4142 16.75 16.75 16.4142 16.75 16V8ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V11ZM8 12.25C8.41421 12.25 8.75 12.5858 8.75 13V16C8.75 16.4142 8.41421 16.75 8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V13C7.25 12.5858 7.58579 12.25 8 12.25Z" fill="#292927"/>
</svg>

          </div>
          
          <div className={`nav-item ${activeNav === '/profile' ? 'active' : ''}`} onClick={() => handleNavigate('/profile')}>
            <div className="profile-icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 8C8.75 6.20507 10.2051 4.75 12 4.75C13.7949 4.75 15.25 6.20507 15.25 8C15.25 9.79493 13.7949 11.25 12 11.25C10.2051 11.25 8.75 9.79493 8.75 8ZM14.8583 11.7941C16.0073 10.9271 16.75 9.55031 16.75 8C16.75 5.37665 14.6234 3.25 12 3.25C9.37665 3.25 7.25 5.37665 7.25 8C7.25 9.55031 7.99271 10.9271 9.14172 11.7941C6.27612 12.9317 4.25 15.7293 4.25 19V20C4.25 20.4142 4.58579 20.75 5 20.75C5.41421 20.75 5.75 20.4142 5.75 20V19C5.75 15.5482 8.54822 12.75 12 12.75C15.4518 12.75 18.25 15.5482 18.25 19V20C18.25 20.4142 18.5858 20.75 19 20.75C19.4142 20.75 19.75 20.4142 19.75 20V19C19.75 15.7293 17.7239 12.9317 14.8583 11.7941Z" fill="#292927"/>
</svg>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMobileVerifyOtp;
