import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, getCachedUserInfo} from '../utils/auth';
import '../styles/AccountInfo.css';
import EditName from '../components/EditName';
import EditMobile from '../components/EditMobile';
import EditEmail from '../components/EditEmail';


const POLLING_INTERVAL = 1000; // Poll every 10 seconds
const API_BASE_URL = 'https://apis.gasmat.africa';


const AccountInfo = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('/profile');
  const [showEditName, setShowEditName] = useState(false);
  const [showEditMobile, setShowEditMobile] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);


  // Initialize with cached data immediately
  const [userInfo, setUserInfo] = useState(getCachedUserInfo() || {
    fullName: '',
    preferredName: '',
    email: '',
    phone: ''
  });

  // Function to fetch user details
  const fetchUserDetails = useCallback(async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        console.error('No user ID found');
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      const updatedInfo = {
        fullName: data.fullname || '',
        email: data.email || '',
        phone: data.mobile || data.phone_number || '',
        preferredName: data.nickname || '',
        lastModified: data.updated_at || new Date().toISOString()
      };

      // Compare with current data to avoid unnecessary updates
      if (JSON.stringify(updatedInfo) !== JSON.stringify(userInfo)) {
        setUserInfo(updatedInfo);
        localStorage.setItem("cached_user_info", JSON.stringify(updatedInfo));
        setLastUpdated(new Date().toISOString());
      }

      return true;
    } catch (err) {
      console.error('Error fetching user details:', err);
      return false;
    }
  }, [userInfo]);

  // Setup polling
  useEffect(() => {
    let pollInterval;

    const startPolling = () => {
      // Initial fetch
      fetchUserDetails();

      // Setup polling
      pollInterval = setInterval(() => {
        fetchUserDetails();
      }, POLLING_INTERVAL);
    };

    startPolling();

    // Cleanup
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [fetchUserDetails]);

  // Setup visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUserDetails();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchUserDetails]);

  // Handle updates
  const handleUpdate = async (type, newData) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        // Force immediate refresh after update
        await fetchUserDetails();
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleNameUpdate = async (newNameInfo) => {
    await handleUpdate('name', newNameInfo);
    setShowEditName(false);
  };

  const handleMobileUpdate = async (newMobileInfo) => {
    await handleUpdate('mobile', newMobileInfo);
    setShowEditMobile(false);
  };

  const handleEmailUpdate = async (newEmailInfo) => {
    await handleUpdate('email', newEmailInfo);
    setShowEditEmail(false);
  };

  // Render edit components
  if (showEditName) {
    return <EditName onClose={() => setShowEditName(false)} onUpdate={handleNameUpdate} currentUserInfo={userInfo} />;
  }

  if (showEditMobile) {
    return <EditMobile onClose={() => setShowEditMobile(false)} onUpdate={handleMobileUpdate} currentUserInfo={userInfo} />;
  }

  if (showEditEmail) {
    return <EditEmail onClose={() => setShowEditEmail(false)} onUpdate={handleEmailUpdate} currentUserInfo={userInfo} />;
  }

 
  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };







  return (
    <div className="account-info-page">
      {/* Header */}
      <div className="account-header">
        <div className="back-buttn" onClick={() => navigate('/profile')}>
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81406 7.35009C8.08235 7.61839 8.08235 8.05339 7.81406 8.32169L5.32275 10.813H18.7786C19.1581 10.813 19.4657 11.1206 19.4657 11.5C19.4657 11.8794 19.1581 12.187 18.7786 12.187H5.32275L7.81406 14.6783C8.08235 14.9466 8.08235 15.3816 7.81406 15.6499C7.54576 15.9182 7.11076 15.9182 6.84246 15.6499L3.17834 11.9858C2.91004 11.7175 2.91004 11.2825 3.17834 11.0142L6.84246 7.35009C7.11076 7.08179 7.54576 7.08179 7.81406 7.35009Z" fill="#292927"/>
</svg>

        </div>
        <span>Account Info</span>
      </div>

      {/* Info Cards Container */}
      <div className="info-container">
        {/* Name Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.22223 7.55557C5.22223 5.96008 6.51563 4.66668 8.11112 4.66668C9.70661 4.66668 11 5.96008 11 7.55557C11 9.15106 9.70661 10.4445 8.11112 10.4445C6.51563 10.4445 5.22223 9.15106 5.22223 7.55557ZM8.11112 11.7778C10.443 11.7778 12.3333 9.88743 12.3333 7.55557C12.3333 5.2237 10.443 3.33334 8.11112 3.33334C5.77925 3.33334 3.8889 5.2237 3.8889 7.55557C3.8889 8.93362 4.54908 10.1575 5.57042 10.9281C3.02323 11.9393 1.22223 14.426 1.22223 17.3333V18.2222C1.22223 18.5904 1.52071 18.8889 1.8889 18.8889C2.25709 18.8889 2.55556 18.5904 2.55556 18.2222V17.3333C2.55556 14.2651 5.04287 11.7778 8.11112 11.7778ZM16.7784 10.9411C15.9435 10.0243 14.501 10.0243 13.666 10.9411C13.5114 11.1109 13.289 11.203 13.0596 11.1923C11.8209 11.1344 10.8009 12.1544 10.8588 13.3931C10.8695 13.6225 10.7774 13.8448 10.6076 13.9995C9.69078 14.8345 9.69078 16.277 10.6076 17.1119C10.7774 17.2666 10.8695 17.4889 10.8588 17.7184C10.8009 18.957 11.8209 19.9771 13.0596 19.9192C13.289 19.9085 13.5114 20.0005 13.666 20.1704C14.501 21.0872 15.9435 21.0872 16.7784 20.1704C16.9331 20.0005 17.1554 19.9085 17.3849 19.9192C18.6235 19.9771 19.6436 18.957 19.5857 17.7184C19.575 17.4889 19.667 17.2666 19.8369 17.1119C20.7537 16.277 20.7537 14.8345 19.8369 13.9995C19.667 13.8448 19.575 13.6225 19.5857 13.3931C19.6436 12.1544 18.6235 11.1344 17.3849 11.1923C17.1554 11.203 16.9331 11.1109 16.7784 10.9411ZM14.6518 11.8388C14.9579 11.5028 15.4866 11.5028 15.7926 11.8388C16.2146 12.3022 16.8211 12.5534 17.4471 12.5242C17.9011 12.5029 18.275 12.8768 18.2538 13.3308C18.2245 13.9569 18.4758 14.5633 18.9391 14.9853C19.2752 15.2913 19.2752 15.8201 18.9391 16.1261C18.4758 16.5481 18.2245 17.1546 18.2538 17.7806C18.275 18.2346 17.9011 18.6085 17.4471 18.5873C16.8211 18.558 16.2146 18.8093 15.7926 19.2726C15.4866 19.6087 14.9579 19.6087 14.6518 19.2726C14.2298 18.8093 13.6234 18.558 12.9973 18.5873C12.5433 18.6085 12.1694 18.2346 12.1907 17.7806C12.2199 17.1546 11.9687 16.5481 11.5054 16.1261C11.1693 15.8201 11.1693 15.2913 11.5054 14.9853C11.9687 14.5633 12.2199 13.9569 12.1907 13.3308C12.1694 12.8768 12.5433 12.5029 12.9973 12.5242C13.6234 12.5534 14.2298 12.3022 14.6518 11.8388ZM13.2963 15.0842C13.5566 14.8238 13.9787 14.8238 14.2391 15.0842L14.7374 15.5825L16.2054 14.1145C16.4657 13.8541 16.8878 13.8541 17.1482 14.1145C17.4085 14.3748 17.4085 14.7969 17.1482 15.0573L15.2088 16.9967C14.9484 17.257 14.5263 17.257 14.266 16.9967L13.2963 16.027C13.0359 15.7666 13.0359 15.3445 13.2963 15.0842Z" fill="#292927"/>
</svg>

            <div className="info-text">
              <span className="label">Name</span>
              <span className="value">{userInfo.fullName}</span>

            </div>
          </div>
          <div onClick={() => setShowEditName(true)} style={{ cursor: 'pointer' }}>
            <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M25.4042 9.63923L29.804 14.039C30.0643 14.2994 30.0643 14.7215 29.804 14.9818L22.3062 22.4796C22.0145 22.7713 21.6188 22.9352 21.2062 22.9352L17.1747 22.9352C16.8065 22.9352 16.508 22.6368 16.508 22.2686L16.508 18.237C16.508 17.8244 16.6719 17.4288 16.9636 17.137L24.4614 9.63923C24.7217 9.37888 25.1439 9.37888 25.4042 9.63923ZM26.8184 16.0818L28.3898 14.5104L24.9328 11.0534L23.3615 12.6248L26.8184 16.0818ZM25.8756 17.0246L22.4186 13.5676L17.9064 18.0798C17.8647 18.1215 17.8413 18.178 17.8413 18.237L17.8413 21.6019L21.2062 21.6019C21.2652 21.6019 21.3217 21.5785 21.3634 21.5368L25.8756 17.0246ZM14.2216 25.4444C13.8534 25.4444 13.5549 25.7429 13.5549 26.1111C13.5549 26.4793 13.8534 26.7778 14.2216 26.7778H30.2216C30.5898 26.7778 30.8882 26.4793 30.8882 26.1111C30.8882 25.7429 30.5898 25.4444 30.2216 25.4444H14.2216Z" fill="#292927"/>
            </svg>
          </div>
        </div>

        {/* Mobile Number Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.72321 1.44424L7.05736 1.44424C7.33503 1.44424 7.58362 1.61634 7.68136 1.87623L8.97508 5.31614C9.0179 5.43 9.02875 5.55341 9.00646 5.673L8.35821 9.1503C9.15498 11.0241 10.4711 12.2833 12.6539 13.4128L16.0894 12.7471C16.2114 12.7235 16.3375 12.7344 16.4536 12.7786L19.9041 14.0935C20.1625 14.192 20.3333 14.4398 20.3333 14.7164L20.3333 17.9024C20.3334 19.3473 19.0603 20.5199 17.5712 20.1959C14.8568 19.6053 9.82817 18.1041 6.30639 14.5823C2.93293 11.2089 1.80267 6.54871 1.42219 4.02975C1.2051 2.59244 2.35781 1.44424 3.72321 1.44424ZM6.59583 2.77758L3.72321 2.77758C3.08408 2.77758 2.65829 3.28587 2.74057 3.83061C3.10749 6.25978 4.18093 10.5712 7.2492 13.6395C10.4922 16.8825 15.2067 18.3169 17.8546 18.893C18.4362 19.0196 19 18.5767 19 17.9024L19 15.1758L16.1564 14.0922L12.6824 14.7654C12.5379 14.7934 12.3881 14.7728 12.2565 14.7067C9.68385 13.4155 8.01368 11.8846 7.0477 9.46962C7.00077 9.3523 6.98815 9.22406 7.01131 9.09984L7.66163 5.61145L6.59583 2.77758Z" fill="#292927"/>
</svg>
            <div className="info-text">
              <span className="label">Mobile Number</span>
              <span className="value">{userInfo.phone}</span>
            </div>
          </div>
          <div onClick={() => setShowEditMobile(true)} style={{ cursor: 'pointer' }}>
            <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M25.4042 9.63923L29.804 14.039C30.0643 14.2994 30.0643 14.7215 29.804 14.9818L22.3062 22.4796C22.0145 22.7713 21.6188 22.9352 21.2062 22.9352L17.1747 22.9352C16.8065 22.9352 16.508 22.6368 16.508 22.2686L16.508 18.237C16.508 17.8244 16.6719 17.4288 16.9636 17.137L24.4614 9.63923C24.7217 9.37888 25.1439 9.37888 25.4042 9.63923ZM26.8184 16.0818L28.3898 14.5104L24.9328 11.0534L23.3615 12.6248L26.8184 16.0818ZM25.8756 17.0246L22.4186 13.5676L17.9064 18.0798C17.8647 18.1215 17.8413 18.178 17.8413 18.237L17.8413 21.6019L21.2062 21.6019C21.2652 21.6019 21.3217 21.5785 21.3634 21.5368L25.8756 17.0246ZM14.2216 25.4444C13.8534 25.4444 13.5549 25.7429 13.5549 26.1111C13.5549 26.4793 13.8534 26.7778 14.2216 26.7778H30.2216C30.5898 26.7778 30.8882 26.4793 30.8882 26.1111C30.8882 25.7429 30.5898 25.4444 30.2216 25.4444H14.2216Z" fill="#292927"/>
            </svg>
          </div>

        </div>

        {/* Email Card */}
        <div className="info-card">
          <div className="info-left">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0354 1.97639C11.2613 1.51193 10.2942 1.51193 9.52013 1.97639L2.40902 6.24306C1.67274 6.68483 1.22223 7.48051 1.22223 8.33916V17.9993C1.22223 19.3493 2.31664 20.4437 3.66667 20.4437H17.8889C19.2389 20.4437 20.3333 19.3493 20.3333 17.9993V8.33916C20.3333 7.48051 19.8828 6.68483 19.1466 6.24306L12.0354 1.97639ZM10.2061 3.11972C10.558 2.9086 10.9976 2.9086 11.3494 3.11972L18.4606 7.38638C18.7952 7.58719 19 7.94886 19 8.33916V17.9993C19 18.6129 18.5025 19.1104 17.8889 19.1104H3.66667C3.05302 19.1104 2.55556 18.6129 2.55556 17.9993V8.33916C2.55556 7.94886 2.76034 7.58719 3.09501 7.38638L10.2061 3.11972ZM6.71549 10.3423C6.41386 10.1312 5.99817 10.2045 5.78703 10.5062C5.57588 10.8078 5.64924 11.2235 5.95087 11.4346L10.3953 14.5457C10.6249 14.7064 10.9304 14.7064 11.1599 14.5457L15.6044 11.4346C15.906 11.2235 15.9794 10.8078 15.7682 10.5062C15.5571 10.2045 15.1414 10.1312 14.8398 10.3423L10.7776 13.1858L6.71549 10.3423Z" fill="#292927"/>
</svg>
            <div className="info-text">
              <span className="label">Email</span>
              <span className="value">{userInfo.email}</span>

            </div>
          </div>
          <div onClick={() => setShowEditEmail(true)} style={{ cursor: 'pointer' }}>

          <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.4042 9.63923L29.804 14.039C30.0643 14.2994 30.0643 14.7215 29.804 14.9818L22.3062 22.4796C22.0145 22.7713 21.6188 22.9352 21.2062 22.9352L17.1747 22.9352C16.8065 22.9352 16.508 22.6368 16.508 22.2686L16.508 18.237C16.508 17.8244 16.6719 17.4288 16.9636 17.137L24.4614 9.63923C24.7217 9.37888 25.1439 9.37888 25.4042 9.63923ZM26.8184 16.0818L28.3898 14.5104L24.9328 11.0534L23.3615 12.6248L26.8184 16.0818ZM25.8756 17.0246L22.4186 13.5676L17.9064 18.0798C17.8647 18.1215 17.8413 18.178 17.8413 18.237L17.8413 21.6019L21.2062 21.6019C21.2652 21.6019 21.3217 21.5785 21.3634 21.5368L25.8756 17.0246ZM14.2216 25.4444C13.8534 25.4444 13.5549 25.7429 13.5549 26.1111C13.5549 26.4793 13.8534 26.7778 14.2216 26.7778H30.2216C30.5898 26.7778 30.8882 26.4793 30.8882 26.1111C30.8882 25.7429 30.5898 25.4444 30.2216 25.4444H14.2216Z" fill="#292927"/>
</svg>
</div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="navigation-account">
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

export default AccountInfo;