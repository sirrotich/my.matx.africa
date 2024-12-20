import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditMobile.css';
import EditMobileVerifyOtp from './EditMobileVerifyOtp';

const EditMobile = ({ onClose, onUpdate }) => {
  const navigate = useNavigate();
  const [contactNewMobileInfo, setContactNewMobileInfo] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [activeNav, setActiveNav] = useState('/profile');
  const [showEditMobileVerifyOtp, setShowEditMobileVerifyOtp] = useState(false);


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
    const formatted = formatPhoneNumber(value);
    // Only validate 07... or 01... format
    const phoneRegex = /^0[17]\d{8}$/;
    return phoneRegex.test(formatted);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d\s+]/g, '');
    setContactNewMobileInfo(value);
    setIsValid(validateInput(value));
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

  const handleMobileUpdateVerifyOtp = (newMobileInfo) => {
    setMobileInfo(prev => ({
      ...prev,
      mobile: newMobileInfo.fullName || prev.mobile
    }));
    setShowMobileName(false);
  };

  if (showEditMobileVerifyOtp) {
    return <EditMobileVerifyOtp onClose={() => setShowEditMobileVerifyOtp(false)} onUpdate={handleMobileUpdateVerifyOtp} />;
  }

  return (
    <div className="edit-mobile-container">
      {/* Header */}
      <div className="edit-mobile-header">
      <div className="back-buttn" onClick={handleBack}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>
        </div>
        <span>Mobile Number</span>
      </div>

      {/* Form Container */}
      <div className="edit-mobile-form-container">
        <div className="edit-mobile-form">
        
        <div className="edit-mobile-text">
            <span>Please enter the new mobile number you’d like to update to…</span>
        </div>

        <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={contactNewMobileInfo}
            />
        </div>

        <div className="edit-mobile-verify-text">
            <span>A verification code will be sent to the above number</span>
        </div>
        <div onClick={() => setShowEditMobileVerifyOtp(true)} style={{ cursor: 'pointer' }}>

          <button className="update-button" onClick={handleSubmit}>
          Next <span className="arrow-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8619 7.19528C14.6016 7.45563 14.6016 7.87774 14.8619 8.13809L17.2794 10.5556H4.22221C3.85402 10.5556 3.55554 10.854 3.55554 11.2222C3.55554 11.5904 3.85402 11.8889 4.22221 11.8889H17.2794L14.8619 14.3064C14.6016 14.5667 14.6016 14.9888 14.8619 15.2492C15.1223 15.5095 15.5444 15.5095 15.8047 15.2492L19.3603 11.6936C19.6206 11.4333 19.6206 11.0112 19.3603 10.7508L15.8047 7.19528C15.5444 6.93493 15.1223 6.93493 14.8619 7.19528Z" fill="#FAFAF9"/>
</svg>
</span>
          </button>
          </div>
        </div>
      </div>

         {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-edit-mobile">
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

export default EditMobile;