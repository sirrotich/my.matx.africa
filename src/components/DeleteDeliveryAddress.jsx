// DeleteDeliveryAddress.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteDeliveryAddress.css';

const DeleteDeliveryAddress = ({ onClose, address, onDelete }) => {
  const [deleteText, setDeleteText] = useState('');
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');

  const handleDelete = () => {
    if (deleteText.toLowerCase() === 'delete') {
      onDelete(address.delivery_address_id);
    }
  };


  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  return (
    <div className="delete-mobile-container">
      <div className="delete-mobile-header">
        <div className="back-buttn" onClick={onClose}>
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z"
              fill="#292927"
            />
          </svg>
        </div>
        <span>Delivery Addresses</span>
      </div>

      <div className="delete-mobile-form-container">
        <div className="delete-mobile-form">
          <div className="delete-mobile-text">
          <span>To confirm, you want to delete your delivery address to </span>
            <span style={{ fontWeight: 700 }}>
              {address?.street}, {address?.apartment}, {address?.house_number}. 
            </span>
            <span> Type 'Delete' in the box below.</span>
          </div>

          <div className="delete-mobile-input-group">
            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="Type 'Delete' to confirm"
              className="w-full"
            />
          </div>

          <button
            onClick={handleDelete}
            disabled={deleteText.toLowerCase() !== 'delete'}
            className="delete-confirm-button"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-delete-mobile">
          <div
            className={`nav-item ${activeNav === '/' ? 'active' : ''}`}
            onClick={() => handleNavigate('/')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path for home icon */}
            </svg>
          </div>

          <div
            className={`nav-item ${activeNav === '/analytics' ? 'active' : ''}`}
            onClick={() => handleNavigate('/analytics')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path for analytics icon */}
            </svg>
          </div>

          {/* Additional navigation items as needed */}
        </div>
      </div>
    </div>
  );
};

export default DeleteDeliveryAddress;
