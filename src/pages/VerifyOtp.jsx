import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import '../styles/VerifyOtp.css';
const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();

  const { contactInfo, loginMethod } = location.state || {};  // Destructure contactInfo and loginMethod
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
        console.log(`OTP Entered: ${otpString}`);
        if (otpString.length === 6) {
            try {
                const response = await axios.post(`https://apis.gasmat.africa/users/verify-otp`, { [loginMethod]: contactInfo, otp: otpString });
                
                // Handle successful OTP verification
                const { access_token, user_info } = response.data;
                
                // Save user_id and access_token in local storage
                localStorage.setItem('user_id', user_info.user_id);
                localStorage.setItem('access_token', access_token);
                
                toast.success('OTP verified successfully!'); // Success notification
                navigate('/'); // Navigate to home or wherever needed
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
        <div className="verify-page">
            <div className="verify-form-container">
                <h1 className="verify-title">Verify your identity</h1>
                <p className="otp-sent-message">
                {loginMethod === 'email'
                    ? `An authentication code has been sent to ${contactInfo}`
                    : `An authentication code SMS has been sent to ${contactInfo}`}
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
                    Login <span className="arrow-icon">→</span>
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
