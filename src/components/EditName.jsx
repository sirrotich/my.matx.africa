import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditName.css';
import { getUserId } from '../utils/auth';
import DeleteName from './DeleteName';


const EditName = ({ onClose, onUpdate, currentUserInfo }) => {
  const navigate = useNavigate();
  // Initialize with current values
  const [fullName, setFullName] = useState(currentUserInfo?.fullName || '');
  const [preferredName, setPreferredName] = useState(currentUserInfo?.preferredName || '');
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeNav, setActiveNav] = useState('/profile');
  const [showDeleteName, setShowDeleteName] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      const userId = getUserId();
      const accessToken = localStorage.getItem('access_token');

      // Prepare update payload maintaining existing values if fields are empty
      const updatePayload = {
        user_id: userId,
        fullname: fullName.trim() || currentUserInfo?.fullName || '',
        nickname: preferredName.trim() || currentUserInfo?.preferredName || ''
      };

      const response = await fetch('https://apis.gasmat.africa/users/updateInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(updatePayload)
      });

      if (response.ok) {
        // Update local state and cache
        const updatedInfo = {
          fullName: updatePayload.fullname,
          preferredName: updatePayload.nickname
        };
        
        // Update cached user info
        const cachedInfo = JSON.parse(localStorage.getItem('cached_user_info') || '{}');
        localStorage.setItem('cached_user_info', JSON.stringify({
          ...cachedInfo,
          ...updatedInfo
        }));

        onUpdate(updatedInfo);
        onClose();
      } else {
        throw new Error('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Failed to update name. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const userId = getUserId();
      const response = await fetch('https://apis.gasmat.africa/users/delete-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        onUpdate({ ...currentUserInfo, fullName: null });
        onClose();
      } else {
        throw new Error('Failed to delete name');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete name. Please try again.');
    }
  };

  if (showDeleteName) {
    return (
      <DeleteName
        onClose={() => setShowDeleteName(false)}
        email={currentUserInfo?.fullName}
        onDelete={handleDelete}
      />
    );
  }


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

  return (
    <div className="edit-name-container">
      {/* Header */}
      <div className="edit-name-header">
      <div className="back-buttn" onClick={handleBack}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>
        </div>
        <span>Name</span>
      </div>

      {/* Form Container */}
      <div className="edit-name-form-container">
        <div className="edit-name-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Preferred Name or Nick Name</label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
            />
          </div>

          <button 
            className="update-button" 
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>


        {currentUserInfo?.fullName && (
          <button 
            onClick={() => setShowDeleteName(true)}
            className='delete-name'
          >
            Delete the above details
          </button>
        )}
      </div>

         {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-edit-name">
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

export default EditName;
