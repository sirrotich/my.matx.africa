import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../utils/auth';
import { toast } from 'react-toastify';
import '../styles/EditEmail.css';
import EditEmailVerifyOtp from './EditEmailVerifyOtp';
import DeleteEmail from './DeleteEmail';

const EditEmail = ({ onClose, onUpdate, currentUserInfo }) => {
  const navigate = useNavigate();
  const [contactNewEmailInfo, setContactNewEmailInfo] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [activeNav, setActiveNav] = useState('/profile');
  const [showEditEmailVerifyOtp, setShowEditEmailVerifyOtp] = useState(false);
  const [showDeleteEmail, setShowDeleteEmail] = useState(false);


  const validateInput = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    setContactNewEmailInfo(value);
    setIsValid(validateInput(value));
  };

  const handleSubmit = async () => {
    if (!isValid) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const userId = getUserId();
      const response = await fetch('https://apis.gasmat.africa/users/request-update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          new_email: contactNewEmailInfo,
          channel: 'web'
        })
      });

      if (response.ok) {
        setShowEditEmailVerifyOtp(true);
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const handleEmailUpdateVerifyOtp = (newEmailInfo) => {
    setEmailInfo(prev => ({
      ...prev,
      email: newEmailInfo.email || prev.email
    }));
    setShowEmailName(false);
  };



  const handleDelete = async () => {
    try {
      const userId = getUserId();
      const response = await fetch('https://apis.gasmat.africa/users/delete-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        onUpdate({ ...currentUserInfo, phone: null });
        onClose();
      } else {
        throw new Error('Failed to delete email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete email. Please try again.');
    }
  };

  if (showDeleteEmail) {
    return (
      <DeleteEmail
        onClose={() => setShowDeleteEmail(false)}
        email={currentUserInfo?.email}
        onDelete={handleDelete}
      />
    );
  }



  if (showEditEmailVerifyOtp) {
    return (
      <EditEmailVerifyOtp 
        onClose={() => setShowEditEmailVerifyOtp(false)} 
        onUpdate={onUpdate}
        newEmail={contactNewEmailInfo}
        currentUserInfo={currentUserInfo}
      />
    );
  }

  return (
    <div className="edit-email-container">
      {/* Header */}
      <div className="edit-email-header">
      <div className="back-buttn" onClick={handleBack}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>
        </div>
        <span>Email</span>
      </div>

      {/* Form Container */}
      <div className="edit-email-form-container">
        <div className="edit-email-form">
        
        <div className="edit-email-text">
            {currentUserInfo?.email ? (
              <span>Enter a new email to replace: <span style={{ fontWeight: 700 }}>{currentUserInfo.email}</span></span>
            ) : (
              <span>Add your email for notifications and login.</span>
            )}
        </div>

        <div className="email-input-group">
            <input
              type="text"
              onChange={handleInputChange}
              value={contactNewEmailInfo}
            />
        </div>

        <div className="edit-email-verify-text">
            <span>A verification code will be sent to the above email</span>
        </div>
        <div onClick={() => setShowEditEmailVerifyOtp(true)} style={{ cursor: 'pointer' }}>

        <button 
            className={`update-email-button ${!isValid || isLoading ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Sending...' : 'Next'} 
            <span className="arrow-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.8619 7.19528C14.6016 7.45563 14.6016 7.87774 14.8619 8.13809L17.2794 10.5556H4.22221C3.85402 10.5556 3.55554 10.854 3.55554 11.2222C3.55554 11.5904 3.85402 11.8889 4.22221 11.8889H17.2794L14.8619 14.3064C14.6016 14.5667 14.6016 14.9888 14.8619 15.2492C15.1223 15.5095 15.5444 15.5095 15.8047 15.2492L19.3603 11.6936C19.6206 11.4333 19.6206 11.0112 19.3603 10.7508L15.8047 7.19528C15.5444 6.93493 15.1223 6.93493 14.8619 7.19528Z" fill="#FAFAF9"/>
              </svg>
            </span>
          </button>
          </div>
        </div>
        {currentUserInfo?.email && (
          <button 
            onClick={() => setShowDeleteEmail(true)}
            className={`delete-email ${isValid || isLoading ? 'disabled' : ''}`}
          >
            Delete your email
          </button>
        )}
      </div>


   

         {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-edit-email">
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
          <div 
                    id="grid-icon" 
                >         <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6489 8.9795V0.00756836H15.7628L11.6573 8.04862L7.55022 0.00756836H0.664124V8.9795H3.57903V2.93854H5.77087L10.0187 11.2562L6.03292 19.0597H3.68579L3.57903 12.5989L0.664124 12.6493L0.819411 21.9923H7.81228L11.6573 14.4639L15.5023 21.9923H22.4936L22.6489 12.6493L19.734 12.5989L19.6272 19.0597H17.2801L13.2943 11.2562L17.5421 2.93854H19.734V8.9795H22.6489Z" fill="#292927"/>
                </svg>
                
                
        </div>

        <div 
                    className={`nav-item ${activeNav === '/notifications' ? 'active' : ''}`} 
                    id="grid-icon" 
                    onClick={() => handleNavigate('/notifications')}
                >         <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5039 1.15259C9.8492 1.15259 8.27197 1.85415 7.11632 3.08684C5.96208 4.31803 5.32071 5.97893 5.32071 7.70221C5.32071 11.0279 4.65326 13.1168 4.022 14.3512C3.70571 14.9698 3.39549 15.3798 3.17536 15.6277C3.06512 15.7518 2.97698 15.8358 2.92129 15.8853C2.89344 15.91 2.87366 15.9262 2.86327 15.9345L2.85528 15.9407C2.61613 16.1148 2.51502 16.4227 2.60517 16.7051C2.6961 16.9898 2.96072 17.1831 3.25964 17.1831H19.7482C20.0471 17.1831 20.3117 16.9898 20.4027 16.7051C20.4928 16.4227 20.3917 16.1148 20.1526 15.9407L20.1446 15.9345C20.1342 15.9262 20.1144 15.91 20.0865 15.8853C20.0309 15.8358 19.9427 15.7518 19.8325 15.6277C19.6123 15.3798 19.3021 14.9698 18.9858 14.3512C18.3546 13.1168 17.6871 11.0279 17.6871 7.70221C17.6871 5.97893 17.0458 4.31803 15.8915 3.08684C14.7359 1.85415 13.1586 1.15259 11.5039 1.15259ZM17.7625 14.9768C17.9253 15.2952 18.0892 15.5713 18.2469 15.8091H4.76089C4.9186 15.5713 5.08257 15.2952 5.24537 14.9768C5.98816 13.5243 6.69476 11.2162 6.69476 7.70221C6.69476 6.31577 7.21151 4.99432 8.11874 4.02661C9.02456 3.0604 10.2433 2.52663 11.5039 2.52663C12.7646 2.52663 13.9833 3.0604 14.8891 4.02661C15.7963 4.99432 16.3131 6.31577 16.3131 7.70221C16.3131 11.2162 17.0197 13.5243 17.7625 14.9768ZM10.5136 18.8996C10.3232 18.5714 9.90278 18.4596 9.57457 18.65C9.24636 18.8404 9.13464 19.2608 9.32503 19.589C9.54647 19.9708 9.86431 20.2876 10.2467 20.5079C10.6291 20.7282 11.0627 20.8441 11.504 20.8441C11.9453 20.8441 12.3789 20.7282 12.7613 20.5079C13.1438 20.2876 13.4616 19.9708 13.683 19.589C13.8734 19.2608 13.7617 18.8404 13.4335 18.65C13.1053 18.4596 12.6849 18.5714 12.4945 18.8996C12.3938 19.0731 12.2494 19.2171 12.0755 19.3172C11.9017 19.4174 11.7046 19.4701 11.504 19.4701C11.3034 19.4701 11.1064 19.4174 10.9325 19.3172C10.7587 19.2171 10.6142 19.0731 10.5136 18.8996Z" fill="#292927"/>
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

export default EditEmail;
