import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Terms.css';

const Terms = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };
  
 

  return (
    <div className="terms-page">
      {/* Header */}
      <div className="terms-header">
        <div className="back-buttn" onClick={() => handleNavigate('/about')}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>

        </div>
        <span>Terms of use</span>
      </div>

      {/* terms Settings Container */}
      <div className="terms-container">
        <div className="terms-content">

        <h2 className="effective-date">Effective Date: <span>18/12/2025</span></h2>
        
        <h className="welcome-text">
            Welcome to matX, a service owned and operated by <strong>GasMat Africa LTD</strong>. 
            These Terms of Use ("Terms") govern your access to and use of the matX device and matX 
            App. By using matX, you agree to comply with these Terms. If you do not agree, you may 
            not use the services.
        </h>

        
        <div className="terms-section">
            <h3 className="section-title">1. Definitions</h3>
            <div className="definition-item">
              <h className="definition-title">a. matX</h>
              <br></br>
              <h className="definition-text">
                Refers to the matX device and the matX App, as well as their associated services, 
                owned and operated by <strong>GasMat Africa LTD</strong>.
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">b. You, the Customer</h>
              <br></br>
              <h className="definition-text">
                Refers to any individual or entity that uses the matX device, downloads, installs, 
                registers, or interacts with the matX App and its services.
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">c. Services</h>
              <br></br>
              <h className="definition-text">
                Includes all features provided through the matX device and matX App, including gas 
                usage tracking and real-time electricity and internet outage notifications.
              </h>
            </div>
          </div>


          <div className="terms-section">
            <h3 className="section-title">2. Ellgibility</h3>
            <h className="definition-text">
                To use matX, you must be at least 18 years of age and capable of entering into legally binding agreements.
                By using the services, you confirm that the information provided during registration is accurate and up-to-date
              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">3. Account Registration</h3>
            <h className="definition-text">
            <strong>LoginCredentials:</strong>You may use your phone number or email address to log in. A One-Time Password (OTP) will be sent to verify your identity.<br></br>
            <strong>Profile Information:</strong> You can optionally add an additional contact channel (phone or email) and customize notification preferences.
            You are responsible for maintaining the confidentiality of your account and ensuring that your credentials are not shared with others.
              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">4. Permitted Use</h3>
            <h className="definition-text">
            You may use matX solely for personal, non-commercial purposes.<br></br>
            You agree not to misuse the services, including but not limited to:<br></br>
            Attempting to access unauthorized features or systems.<br></br>
            Distributing malware or engaging in harmful activities.<br></br>
            Using the services for unlawful or fraudulent purposes.<br></br>
              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">5. Features and Services</h3>
            <div className="definition-item">
              <h className="definition-title">a. Gas Usage Monitoring</h>
              <br></br>
              <h className="definition-text">
              The matX device tracks and reports gas usage in real time, providing actionable insights for users.
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">b. Electricity and Internet Outage Notifications</h>
              <br></br>
              <h className="definition-text">
              matX aggregates and reports real-time electricity and internet outages based on data collected from user matX devices in the same area..
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">c. Notifications</h>
              <br></br>
              <h className="definition-text">
              Notifications are sent to the contact channels selected in your profile. Users may choose between email, SMS, or both.
              </h>
            </div>
          </div>

          <div className="terms-section">
            <h3 className="section-title">6. User Responsibilities</h3>
            <h className="definition-text">
            Ensure the matX device is installed and used according to the provided instructions.<br></br>
            Keep your account credentials secure and notify matX immediately of any unauthorized access or breach.<br></br>
            Use matX only in compliance with applicable laws and regulations.
              </h>
          </div>


          <div className="terms-section">
            <h3 className="section-title">7. Intellectual Property</h3>
            <h className="definition-text">
            All content, trademarks, logos, and designs associated with matX are the exclusive property of GasMat Africa LTD.<br></br>
            You may not reproduce, distribute, modify, or create derivative works of any materials provided by matX without prior written consent
              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">8. Payment and Subscriptions</h3>
            <h className="definition-text">
            Certain features or services may require a subscription or one-time payment.<br></br>
            All fees are non-refundable unless otherwise stated in applicable laws.<br></br>
            Payments are processed securely through third-party payment processors
              </h>
          </div>


          <div className="terms-section">
            <h3 className="section-title">9. Privacy</h3>
            <h className="definition-text">
            Your use of matX is subject to the terms of our <u><strong onClick={() => handleNavigate('/privacy')} >Privacy Policy</strong></u>. By using matX, you agree to the collection, use, and storage of your information as described in the <u><strong onClick={() => handleNavigate('/privacy')} >Privacy Policy</strong></u>.
              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">10. Limitation of Liability</h3>
            <h className="definition-text">
            GasMat Africa LTD shall not be liable for any indirect, incidental, or consequential damages arising out of your use of matX.<br></br>
            matX is provided 'as is' without warranties of any kind, including fitness for a particular purpose or non-infringement.              </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">11. Suspension and Termination</h3>
            <h className="definition-text">
            We may suspend or terminate your access to matX at any time for violating these Terms or engaging in unlawful activities.<br></br>
            Upon termination, you must cease all use of the matX device and App             </h>
          </div>
          
          <div className="terms-section">
            <h3 className="section-title">12. Updates and Changes</h3>
            <h className="definition-text">
            GasMat Africa LTD reserves the right to modify these Terms at any time. Changes will be communicated through the matX App or via email.<br></br>
            Continued use of the services after changes are made constitutes your acceptance of the updated Terms            </h>
          </div>

          <div className="terms-section">
            <h3 className="section-title">13. Governing Law</h3>
            <h className="definition-text">
            These Terms are governed by and construed in accordance with the laws of Kenya. Any disputes arising under these Terms will be resolved in Kenyan courts.            </h>
          </div>


          <div className="terms-section">
            <h3 className="section-title">14. Contact Us</h3>
            <h className="definition-text">
            For questions, complaints, or support, please contact us:<br></br>
            <strong>GasMat Africa LTD</strong><br></br>
            Ground Floor, Suite 16, <br></br>
            The Mirage, Waiyaki Way, <br></br>
            Nairobi, Kenya     
             </h>
          </div>




        

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-terms">
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

export default Terms;