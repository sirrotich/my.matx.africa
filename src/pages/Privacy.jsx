import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Privacy.css';

const Privacy = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };
  
 

  return (
    <div className="privacy-page">
      {/* Header */}
      <div className="privacy-header">
        <div className="back-buttn" onClick={() => handleNavigate('/about')}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>

        </div>
        <span>Privacy Policy</span>
      </div>

      {/* terms Settings Container */}
      <div className="privacy-container">
        <div className="privacy-content">

        <h2 className="effective-date">Effective Date: <span>18/12/2025</span></h2>
        
        <h className="welcome-text">
        At matX, owned and operated by <strong>GasMat Africa LTD</strong>, we are committed to protecting your privacy and ensuring the safety of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the matX device and matX App, in compliance with the <strong>Kenya Data Protection Act, 2019 (DPA)</strong>.
        </h>

        
        <div className="privacy-section">
            <h3 className="section-title">1. Definitions</h3>
            <div className="definition-item">
              <h className="definition-title">a. matX</h>
              <br></br>
              <h className="definition-text">
                Refers to the matX device and the matX App, as well as their associated services, 
                owned and operated by <strong>GasMat Africa LTD</strong>.matX provides real-time monitoring for electricity and internet outages and tracks gas usage for enhanced convenience and safety.
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
          </div>


          <div className="privacy-section">
            <h3 className="section-title">2. Information We Collect</h3>
            <div className="definition-item">
              <h className="definition-title">a. Personal Information</h>
              <br></br>
              <h className="definition-text">
              <strong>Contact Information:</strong> Phone number or email address for login and communication purposes. You may add an additional contact channel (email or phone number) to your profile, enabling personalized notifications.<br></br>
              Full Name and Preferred Name (Optional): To personalize communication.
                </h>
            </div>
            <div className="definition-item">
              <br></br>
              <h className="definition-text">
              <strong>Payment Information:</strong> Transaction details, payment methods, and billing address. Sensitive information like credit card numbers is handled securely by third-party processors, with matX retaining only necessary details (e.g., the last four digits).
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">b. Gas Usage Data</h>
              <br></br>
              <h className="definition-text">
              matX collects data on gas usage from the matX device to provide real-time monitoring and generate actionable insights.
              </h>
            </div>
            <div className="definition-item">
              <h className="definition-title">c. Outage Monitoring (Electricity and Internet)</h>
              <br></br>
              <h className="definition-text">
              matX monitors real-time electricity and internet outages based on user-reported data and aggregated information from matX users in the same area. No personal data is collected for outage monitoring beyond what is required for notifications.              </h>
            </div>

            <div className="definition-item">
              <h className="definition-title">d. Device and Technical Information</h>
              <br></br>
              <h className="definition-text">
              <strong>Device Data:</strong> matX collects basic technical data to ensure proper device functionality.<br></br>
              <strong>App Usage:</strong> IP address, operating system, device model, and interactions with the matX App.<br></br>
              <strong>Network Information:</strong>  Connection details for analytics and troubleshooting.  <br></br>
    </h>
              </div>
          </div>

          <div className="privacy-section">
            <h3 className="section-title">3. How We Collect Your Information</h3>
            <h className="definition-text">
            <strong>Directly from You:</strong> When you log in, register, update your profile, or interact with matX features.<br></br>
            <strong>Automatically from the Device:</strong> The matX device sends gas usage data to the cloud for analysis and then to the matX App for real-time insights.<br></br>
            <strong>User Reports:</strong> For electricity and internet outages, data is collected from user reports and aggregated information.<br></br>
            <strong>Cookies and Analytics Tools:</strong> Used to improve the user experience, track interactions, and optimize performance.<br></br>
</h>
          </div>

          <div className="privacy-section">
            <h3 className="section-title">4. Use of Information</h3>
            <h className="definition-text">
            Monitor gas usage and generate usage insights for safety and convenience.<br></br>
            Notify you of electricity and internet outages in real time.<br></br>
            Provide personalized notifications through your selected channel (phone, email, or both).<br></br>
            Monitor and optimize matX device and App performance.<br></br>
            Process payments and manage subscriptions securely.<br></br>
            Personalize communications and enhance the user experience.<br></br>
            Ensure security, detect fraudulent activity, and comply with legal requirements.<br></br>
              </h>
          </div>

          <div className="privacy-section">
            <h3 className="section-title">5. Notification Preferences</h3>
            <div className="definition-item">
              <h className="definition-text">
              You can choose your primary notification channel (phone number, email, or both) through your profile settings.<br></br>
              Update your preferences anytime in the matX App.
                            </h>
            </div>
           
          </div>

          <div className="privacy-section">
            <h3 className="section-title">6. Automated Data Collection</h3>
            <h className="definition-text">
            <strong>Cookies and Tracking Technologies:</strong> Used to track user preferences, analyze interactions, and improve services.<br></br>
            <strong>Third-Party Analytics:</strong> Tools like Google Analytics may be used to understand how users interact with matX services. These tools help us improve user experience and provide tailored content.
              </h>
          </div>


          <div className="privacy-section">
            <h3 className="section-title">7. Information Sharing</h3>
            <h className="definition-text">
            <strong>Service Providers:</strong> For hosting, analytics, payment processing, and email/SMS notifications.<br></br>
            <strong>Utility Companies:</strong> For accurate reporting of outages (only aggregated and anonymized data, when applicable).<br></br>
            <strong>Legal Authorities:</strong> When required by law to comply with legal obligations.<br></br>
            <strong>Business Partners:</strong> Under strict confidentiality agreements, for purposes like research or joint offerings. <br>
            </br>       
            </h>
            <br></br>
              <h className="definition-title">We do not sell your personal data for marketing purposes.</h>
            
                    </div>

          <div className="privacy-section">
            <h3 className="section-title">8. Data Security</h3>
            <h className="definition-text">
            <strong>Encryption:</strong> Data is encrypted in transit and at rest.<br></br>
            <strong>Access Controls:</strong> Secure authentication mechanisms and role-based access controls.<br></br>
            <strong>Regular Audits:</strong> Security systems undergo periodic testing and updates.<br></br>
              </h>
          </div>


          <div className="privacy-section">
            <h3 className="section-title">9. Retention of Data</h3>
            <h className="definition-text">
            Data is retained only as long as necessary for the purposes outlined in this policy or as required by law.              </h>
          </div>

          <div className="privacy-section">
            <h3 className="section-title">10. Your Rights</h3>
            <h className="definition-text">
            <strong>Access:</strong> View the personal data we hold about you.
            <strong>Correction:</strong> Rectify inaccurate or incomplete data.
            <strong>Erasure:</strong> Request deletion of your personal data, subject to legal requirements.
            <strong>Objection:</strong> Oppose data processing in certain circumstances.
            <strong> Portability:</strong> Request a copy of your data in a machine-readable format.
            <strong>Withdraw Consent:</strong> Revoke consent for data collection and processing.  
            </h>
                    </div>

          <div className="privacy-section">
            <h3 className="section-title">11. International Data Transfers</h3>
            <h className="definition-text">
            If your data is transferred outside Kenya, we ensure it is processed under equivalent legal safeguards.            </h>
          </div>
          
          <div className="privacy-section">
            <h3 className="section-title">12. Children’s Privacy</h3>
            <h className="definition-text">
            The matX App and device are not intended for children under the age of 18. We do not knowingly collect data from children.
                      </h>
          </div>

          <div className="privacy-section">
            <h3 className="section-title">13. Policy Updates</h3>
            <h className="definition-text">
            We may update this Privacy Policy periodically. Updates will be communicated through the App or email notifications. Continued use of matX services constitutes acceptance of the updated policy.
            </h>
                      </div>


          <div className="privacy-section">
            <h3 className="section-title">14. Complaints</h3>
            <h className="definition-text">
            If you believe your privacy rights have been violated, you may lodge a complaint with the Office of the Data Protection Commissioner (ODPC).<br>
            </br>  
            Contact Us<br></br>          
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

export default Privacy;