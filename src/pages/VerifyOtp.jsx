import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import '../styles/VerifyOtp.css';
const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
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
    const handleNext = async () => {
        const otpString = otp.join('');
        console.log(`OTP Entered: ${otpString}`);
        if (otpString.length === 6) {
            try {
                const response = await axios.post(`http://apis.gasmat.africa/users/verify-otp`, { email, otp: otpString });
                
                // Handle successful OTP verification
                const { access_token, user_info } = response.data;
                
                // Save user_id and access_token in local storage
                localStorage.setItem('user_id', user_info.user_id);
                localStorage.setItem('access_token', access_token);
                
                toast.success('OTP verified successfully!'); // Success notification
                navigate('/home'); // Navigate to home or wherever needed
            } catch (error) {
                console.error('Error verifying OTP:', error);
                toast.error('Failed to verify OTP. Please try again.'); // Error notification
            }
        } else {
            toast.error('Please enter a valid OTP.'); // Invalid OTP notification
        }
    };
    const isNextButtonDisabled = otp.filter(val => val !== '').length < 6;
    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="login-title">Verify your identity</h1>
                <p className="otp-sent-message">
                    An authentication code has been sent to {email}
                </p>
                <div className="otp-input-container">
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
                            placeholder="--"
                            maxLength="1"
                            ref={(el) => inputRefs.current[index] = el}
                        />
                    ))}
                </div>
                <p className="resend-code-text">
                    I didn’t receive code? <span className="resend-link">Resend Code</span>
                </p>
                <button
                    className={`send-code-button ${isNextButtonDisabled ? 'disabled' : ''}`}
                    onClick={handleNext}
                    disabled={isNextButtonDisabled}
                >
                    Next <span className="arrow-icon">→</span>
                </button>
                {/* <div className="footer-text">
                    <div>By Signing In, you agree to our?</div>
                    <div className="terms-text">Terms and Conditions</div>
                </div> */}
            </div>
        </div>
    );
};
export default VerifyOtp;
