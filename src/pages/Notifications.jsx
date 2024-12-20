import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  const [notifications, setNotifications] = useState({
    sms: true,
    email: false
  });

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };
  
  const handleToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="notifications-page">
      {/* Header */}
      <div className="notifications-header">
        <div className="back-buttn" onClick={() => handleNavigate('/profile')}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>

        </div>
        <span>Notifications</span>
      </div>

      {/* Notifications Settings Container */}
      <div className="notifications-container">
        <div className="notifications-card">
          <h2>Where you'll receive notifications</h2>
          
          {/* SMS Toggle */}
          <div className="notification-item">
            <div className="notification-left">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8885 11.7778C10.8885 11.1641 11.386 10.6666 11.9996 10.6666H24.4441C25.0577 10.6666 25.5552 11.1641 25.5552 11.7778V20.6666C25.5552 21.2803 25.0577 21.7778 24.4441 21.7778H14.6318C13.8893 21.7778 13.1869 22.1153 12.7231 22.6952L10.8885 24.9883V11.7778ZM11.9996 9.33331C10.6496 9.33331 9.55518 10.4277 9.55518 11.7778V25.3685C9.55518 26.5028 10.9836 27.0039 11.6922 26.1181L13.7642 23.5281C13.9751 23.2645 14.2943 23.1111 14.6318 23.1111H24.4441C25.7941 23.1111 26.8885 22.0167 26.8885 20.6666V11.7778C26.8885 10.4277 25.7941 9.33331 24.4441 9.33331H11.9996ZM13.1106 14.4444C13.1106 14.0762 13.409 13.7778 13.7772 13.7778L19.1106 13.7778C19.4788 13.7778 19.7772 14.0762 19.7772 14.4444C19.7772 14.8126 19.4788 15.1111 19.1106 15.1111L13.7772 15.1111C13.409 15.1111 13.1106 14.8126 13.1106 14.4444ZM13.1106 18C13.1106 17.6318 13.409 17.3333 13.7772 17.3333H22.6661C23.0343 17.3333 23.3328 17.6318 23.3328 18C23.3328 18.3682 23.0343 18.6667 22.6661 18.6667H13.7772C13.409 18.6667 13.1106 18.3682 13.1106 18Z" fill="#292927"/>
</svg>

              <span>SMS</span>
            </div>
            <div className={`toggle-switch ${notifications.sms ? 'active' : ''}`} onClick={() => handleToggle('sms')}>
              <div className="toggle-slider"></div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          {/* Email Toggle */}
          <div className="notification-item">
            <div className="notification-left">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.4795 8.86576C18.7054 8.40129 17.7383 8.40129 16.9642 8.86576L9.85305 13.1324C9.11677 13.5742 8.66626 14.3699 8.66626 15.2285V24.8886C8.66626 26.2387 9.76068 27.3331 11.1107 27.3331H25.3329C26.683 27.3331 27.7774 26.2387 27.7774 24.8886V15.2285C27.7774 14.3699 27.3269 13.5742 26.5906 13.1324L19.4795 8.86576ZM17.6502 10.0091C18.002 9.79796 18.4416 9.79796 18.7935 10.0091L25.9046 14.2758C26.2393 14.4766 26.444 14.8382 26.444 15.2285V24.8886C26.444 25.5023 25.9466 25.9997 25.3329 25.9997H11.1107C10.4971 25.9997 9.99959 25.5023 9.99959 24.8886V15.2285C9.99959 14.8382 10.2044 14.4766 10.539 14.2758L17.6502 10.0091ZM14.1598 17.2317C13.8582 17.0205 13.4425 17.0939 13.2314 17.3955C13.0202 17.6972 13.0936 18.1128 13.3952 18.324L17.8397 21.4351C18.0692 21.5958 18.3747 21.5958 18.6043 21.4351L23.0487 18.324C23.3504 18.1128 23.4237 17.6972 23.2126 17.3955C23.0014 17.0939 22.5858 17.0205 22.2841 17.2317L18.222 20.0752L14.1598 17.2317Z" fill="#292927"/>
</svg>

              <span>Email</span>
            </div>
            <div className={`toggle-switch ${notifications.email ? 'active' : ''}`} onClick={() => handleToggle('email')}>
              <div className="toggle-slider"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-notifications">
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

export default Notifications;