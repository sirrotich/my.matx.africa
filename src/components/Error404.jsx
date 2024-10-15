import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Error404.css';

const Error404 = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <div className="error-image">
          <svg viewBox="0 0 100 100" className="iot-icon">
            {/* IoT/Gas Device SVG Illustration */}
            <circle cx="50" cy="50" r="45" stroke="#008CBA" strokeWidth="2" fill="transparent" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#008CBA" strokeWidth="2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#008CBA" strokeWidth="2" />
            <circle cx="50" cy="50" r="10" fill="#008CBA" />
          </svg>
        </div>
        <h1>404 - Device Not Found</h1>
        <p>Oops! The gas device you're looking for seems to be offline or out of range.</p>
        <Link to="/" className="home-button">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Error404;
