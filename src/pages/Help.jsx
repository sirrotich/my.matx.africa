import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, getCachedUserInfo} from '../utils/auth';
import '../styles/Help.css';

import ContactUs from '../components/ContactUs';
import Feedback from '../components/Feedback';

const Help = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  const [showContactUs, setShowContactUs] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);


 
  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  if (showContactUs) {
    return (
      <ContactUs
        onClose={() => setShowContactUs(false)}
      />
    );
  }

  if (showFeedback) {
    return (
      <Feedback
        onClose={() => setShowFeedback(false)}
      />
    );
  }




  return (
    <div className="help-page">
      {/* Header */}
      <div className="help-header">
        <div className="back-buttn" onClick={() => navigate('/profile')}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>

        </div>
        <span>Help & Feedback</span>
      </div>

      {/* Info Cards Container */}
      <div className="info-container">
        {/* Name Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81453 1.25H4.06361C2.52753 1.25 1.23073 2.54172 1.47497 4.15869C1.903 6.99252 3.17455 12.2352 6.96968 16.0303C10.9317 19.9923 16.5889 21.6811 19.6426 22.3456C21.3178 22.7101 22.75 21.391 22.75 19.7655L22.75 16.1812C22.75 15.87 22.5578 15.5912 22.2671 15.4804L18.3853 14.0012C18.2547 13.9514 18.1128 13.9391 17.9756 13.9657L14.1106 14.7146C11.6549 13.4439 10.1743 12.0273 9.27798 9.91931L10.0073 6.00735C10.0323 5.87281 10.0201 5.73398 9.97196 5.60588L8.51652 1.73599C8.40656 1.44361 8.1269 1.25 7.81453 1.25ZM4.06361 2.75L7.29531 2.75L8.49433 5.9381L7.76272 9.86255C7.73667 10.0023 7.75086 10.1466 7.80366 10.2785C8.89039 12.9954 10.7693 14.7176 13.6636 16.1703C13.8116 16.2446 13.9801 16.2678 14.1427 16.2363L18.051 15.479L21.25 16.698L21.25 19.7655C21.25 20.524 20.6158 21.0222 19.9615 20.8799C16.9825 20.2317 11.6787 18.6181 8.03034 14.9697C4.57854 11.5179 3.37092 6.66748 2.95814 3.93467C2.86558 3.32183 3.34459 2.75 4.06361 2.75ZM19.5303 1.46967L22.5303 4.46967C22.8232 4.76256 22.8232 5.23744 22.5303 5.53033L19.5303 8.53033C19.2374 8.82322 18.7626 8.82322 18.4697 8.53033C18.1768 8.23744 18.1768 7.76256 18.4697 7.46967L20.1893 5.75H16C15.5858 5.75 15.25 5.41421 15.25 5C15.25 4.58579 15.5858 4.25 16 4.25H20.1893L18.4697 2.53033C18.1768 2.23744 18.1768 1.76256 18.4697 1.46967C18.7626 1.17678 19.2374 1.17678 19.5303 1.46967Z" fill="#292927"/>
</svg>


            <div className="info-text">
              <span className="label">Call Us</span>
              <span className="value">0111 45 00 45</span>

            </div>
          </div>
          <div  style={{ cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9697 7.46967C15.6768 7.76256 15.6768 8.23744 15.9697 8.53033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L15.9697 15.4697C15.6768 15.7626 15.6768 16.2374 15.9697 16.5303C16.2626 16.8232 16.7374 16.8232 17.0303 16.5303L21.0303 12.5303C21.3232 12.2374 21.3232 11.7626 21.0303 11.4697L17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967Z" fill="#292927"/>
</svg>

          </div>
        </div>

        {/* Mobile Number Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM10.3446 7.60313C10.0001 7.89541 9.75 8.34102 9.75 9.00001C9.75 9.41422 9.41421 9.75001 9 9.75001C8.58579 9.75001 8.25 9.41422 8.25 9.00001C8.25 7.90898 8.68736 7.04209 9.37414 6.45937C10.0446 5.89048 10.9119 5.625 11.75 5.625C12.5882 5.625 13.4554 5.89049 14.1259 6.45938C14.8126 7.0421 15.25 7.90899 15.25 9.00001C15.25 9.76589 15.0538 10.3495 14.7334 10.8301C14.4642 11.234 14.1143 11.5462 13.839 11.7919L13.839 11.7919L13.8385 11.7923L13.8366 11.794C13.8074 11.8201 13.779 11.8454 13.7517 11.87C13.4445 12.1464 13.213 12.3743 13.0433 12.6741C12.881 12.9609 12.75 13.3616 12.75 13.9999C12.75 14.4142 12.4142 14.7499 12 14.7499C11.5858 14.7499 11.25 14.4142 11.25 13.9999C11.25 13.1383 11.4315 12.4765 11.7379 11.9352C12.037 11.4069 12.4305 11.041 12.7483 10.755L12.8205 10.6901C13.1207 10.4204 13.3276 10.2347 13.4853 9.99803C13.6337 9.77553 13.75 9.48414 13.75 9.00001C13.75 8.34103 13.4999 7.89542 13.1554 7.60314C12.7946 7.29702 12.2868 7.125 11.75 7.125C11.2131 7.125 10.7054 7.29702 10.3446 7.60313ZM12.5675 18.5008C12.8446 18.1929 12.8196 17.7187 12.5117 17.4416C12.2038 17.1645 11.7296 17.1894 11.4525 17.4973L11.4425 17.5084C11.1654 17.8163 11.1904 18.2905 11.4983 18.5676C11.8062 18.8447 12.2804 18.8197 12.5575 18.5119L12.5675 18.5008Z" fill="#292927"/>
</svg>

            <div className="info-text">
              <span className="label">Contact Us</span>
              <span className="value">Tell us how we can help</span>
            </div>
          </div>
          <div onClick={() => setShowContactUs(true)} style={{ cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9697 7.46967C15.6768 7.76256 15.6768 8.23744 15.9697 8.53033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L15.9697 15.4697C15.6768 15.7626 15.6768 16.2374 15.9697 16.5303C16.2626 16.8232 16.7374 16.8232 17.0303 16.5303L21.0303 12.5303C21.3232 12.2374 21.3232 11.7626 21.0303 11.4697L17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967Z" fill="#292927"/>
</svg>

          </div>

        </div>

        {/* Email Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2.25C2.85442 2.25 2.25 2.85442 2.25 3.6V17.4C2.25 18.1456 2.85442 18.75 3.6 18.75H7.67595L11.0169 22.2998C11.55 22.8661 12.45 22.8661 12.9831 22.2998L16.3241 18.75H20.4C21.1456 18.75 21.75 18.1456 21.75 17.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM3.75 17.25V3.75H20.25V17.25H16.2592C15.887 17.25 15.5313 17.4037 15.2762 17.6748L12 21.1557L8.72383 17.6748C8.46871 17.4037 8.11299 17.25 7.74076 17.25H3.75ZM12.6561 6.63672C12.524 6.39809 12.2728 6.25 12 6.25C11.7272 6.25 11.476 6.39809 11.3439 6.63672L10.0228 9.02279L7.63672 10.3439C7.39809 10.476 7.25 10.7272 7.25 11C7.25 11.2728 7.39809 11.524 7.63672 11.6561L10.0228 12.9772L11.3439 15.3633C11.476 15.6019 11.7272 15.75 12 15.75C12.2728 15.75 12.524 15.6019 12.6561 15.3633L13.9772 12.9772L16.3633 11.6561C16.6019 11.524 16.75 11.2728 16.75 11C16.75 10.7272 16.6019 10.476 16.3633 10.3439L13.9772 9.02279L12.6561 6.63672ZM11.2307 9.93785L12 8.54839L12.7693 9.93785C12.8375 10.061 12.939 10.1625 13.0622 10.2307L14.4516 11L13.0622 11.7693C12.939 11.8375 12.8375 11.939 12.7693 12.0622L12 13.4516L11.2307 12.0622C11.1625 11.939 11.061 11.8375 10.9378 11.7693L9.54839 11L10.9378 10.2307C11.061 10.1625 11.1625 10.061 11.2307 9.93785Z" fill="#292927"/>
</svg>

            <div className="info-text">
              <span className="label">Feedback</span>
              <span className="value">Help us make matX better</span>

            </div>
          </div>
          <div onClick={() => setShowFeedback(true)} style={{ cursor: 'pointer' }}>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9697 7.46967C15.6768 7.76256 15.6768 8.23744 15.9697 8.53033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L15.9697 15.4697C15.6768 15.7626 15.6768 16.2374 15.9697 16.5303C16.2626 16.8232 16.7374 16.8232 17.0303 16.5303L21.0303 12.5303C21.3232 12.2374 21.3232 11.7626 21.0303 11.4697L17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967Z" fill="#292927"/>
</svg>

</div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-help">
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

export default Help;