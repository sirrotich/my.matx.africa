import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Delivery.css';
import NewDeliveryAddress from '../components/NewDeliveryAddress';
import DeleteDeliveryAddress from '../components/DeleteDeliveryAddress';

const BASE_URL = 'https://apis.gasmat.africa/addresses';
const POLLING_INTERVAL = 3000;

const Delivery = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('user_id');
  const [activeNav, setActiveNav] = useState('/profile');
  const [showDeleteDeliveryAddress, setShowDeleteDeliveryAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showNewDeliveryAddress, setShowNewDeliveryAddress] = useState(false);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/user_addresses/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      const newAddresses = Array.isArray(data) ? data : [];
      setAddresses(prevAddresses => {
        if (JSON.stringify(prevAddresses) !== JSON.stringify(newAddresses)) {
          return newAddresses;
        }
        return prevAddresses;
      });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
    const intervalId = setInterval(fetchAddresses, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [fetchAddresses]);

  const handleEdit = (address) => {
    setEditingAddress({
      delivery_address_id: address.delivery_address_id,
      matx_name: address.matx_name,
      matx_id: address.matx_id,
      street: address.street,
      apartment: address.apartment,
      house_number: address.house_number,
      general_location: address.general_location,
      general_location_id: address.general_location_id
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await fetchAddresses();
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(`${BASE_URL}/delete_delivery_address/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setAddresses(prevAddresses => 
          prevAddresses.filter(addr => addr.delivery_address_id !== addressId)
        );
        setShowDeleteDeliveryAddress(false);
        setSelectedAddress(null);
        fetchAddresses();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleAddAddress = () => {
    setShowNewDeliveryAddress(true);
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleCloseNewAddress = () => {
    setShowNewDeliveryAddress(false);
    fetchAddresses();
  };

  if (showDeleteDeliveryAddress) {
    return (
      <DeleteDeliveryAddress 
        onClose={() => {
          setShowDeleteDeliveryAddress(false);
          setSelectedAddress(null);
        }}
        address={selectedAddress}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="delivery-container">
      <header className="delivery-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.81404 6.84991C8.08234 7.11821 8.08234 7.5532 7.81404 7.8215L5.32274 10.3128H18.7786C19.1581 10.3128 19.4656 10.6204 19.4656 10.9998C19.4656 11.3793 19.1581 11.6868 18.7786 11.6868H5.32274L7.81404 14.1781C8.08234 14.4464 8.08234 14.8814 7.81404 15.1497C7.54574 15.418 7.11075 15.418 6.84245 15.1497L3.17832 11.4856C2.91002 11.2173 2.91002 10.7823 3.17832 10.514L6.84245 6.84991C7.11075 6.58161 7.54574 6.58161 7.81404 6.84991Z" fill="#292927"/>
          </svg>
        </button>
        <span>Delivery Addresses</span>
      </header>

      <div className="delivery-content">
        {isLoading && addresses.length === 0 ? (
          <div className="loading-indicator">Loading addresses...</div>
        ) : showNewDeliveryAddress || addresses.length === 0 ? (
          <NewDeliveryAddress 
            onClose={handleCloseNewAddress}
            onUpdate={fetchAddresses}
          />
        ) : (
          <>
            {isEditing && editingAddress ? (
              <NewDeliveryAddress 
                isEditing={true}
                editingAddress={editingAddress}
                onClose={() => {
                  setIsEditing(false);
                  setEditingAddress(null);
                }}
                onUpdate={handleUpdate}
              />
            ) : (
              <>
                {addresses.map((address) => (
                  <div key={address.delivery_address_id} className="address-card">
                    <h2 className="address-type">{address.matx_name}</h2>
                    <p className="address-details">
                      {address.street}, {address.apartment}, Hse No: {address.house_number}
                    </p>
                    <div className="location">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C7.99594 2.75 4.75 5.99594 4.75 10C4.75 10.9073 5.17155 12.0709 5.90354 13.371C6.6242 14.651 7.59493 15.9758 8.58078 17.1823C9.56431 18.386 10.5499 19.4563 11.2906 20.2264C11.5656 20.5124 11.8063 20.7564 12 20.9499C12.1937 20.7564 12.4344 20.5124 12.7094 20.2264C13.4501 19.4563 14.4357 18.386 15.4192 17.1823C16.4051 15.9758 17.3758 14.651 18.0965 13.371C18.8284 12.0709 19.25 10.9073 19.25 10C19.25 5.99594 16.0041 2.75 12 2.75ZM11.4838 22.5441C11.484 22.5443 11.4841 22.5444 12 22L11.4838 22.5441ZM12.5166 22.5437L12.518 22.5424L12.523 22.5377L12.5414 22.5201L12.611 22.4532C12.6714 22.3948 12.7592 22.3093 12.8706 22.1993C13.0934 21.9794 13.4105 21.6614 13.7906 21.2662C14.5499 20.4767 15.5643 19.3754 16.5808 18.1314C17.5949 16.8902 18.6242 15.4911 19.4035 14.1069C20.1716 12.7428 20.75 11.3018 20.75 10C20.75 5.16751 16.8325 1.25 12 1.25C7.16751 1.25 3.25 5.16751 3.25 10C3.25 11.3018 3.82845 12.7428 4.59646 14.1069C5.3758 15.4911 6.40507 16.8902 7.41922 18.1314C8.43569 19.3754 9.45014 20.4767 10.2094 21.2662C10.5895 21.6614 10.9066 21.9794 11.1294 22.1993C11.2408 22.3093 11.3286 22.3948 11.389 22.4532L11.4586 22.5201L11.477 22.5377L11.4838 22.5441L12 23.0333L12.5166 22.5437ZM12 22L12.5166 22.5437C12.5164 22.5439 12.5159 22.5444 12 22ZM12 8.25C11.0335 8.25 10.25 9.0335 10.25 10C10.25 10.9665 11.0335 11.75 12 11.75C12.9665 11.75 13.75 10.9665 13.75 10C13.75 9.0335 12.9665 8.25 12 8.25Z" fill="#292927"/>
</svg>

                      <span>{address.general_location}</span>
                    </div>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(address)}>
                      Edit
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6161 8.94454C21.6901 7.8706 21.6901 6.1294 20.6161 5.05546L19.2019 3.64124C18.128 2.5673 16.3868 2.5673 15.3128 3.64124L4.21716 14.7369C3.76056 15.1935 3.4792 15.7962 3.42238 16.4394L3.18029 19.1799C3.08444 20.2649 3.99247 21.1729 5.0775 21.0771L7.81791 20.835C8.46114 20.7782 9.06386 20.4968 9.52047 20.0402L20.6161 8.94454ZM19.5555 6.11612C20.0436 6.60427 20.0436 7.39573 19.5555 7.88388L18.6058 8.83354L15.4238 5.65156L16.3735 4.7019C16.8616 4.21375 17.6531 4.21375 18.1412 4.7019L19.5555 6.11612ZM14.3632 6.71222L17.5451 9.8942L8.45981 18.9795C8.25226 19.1871 7.9783 19.315 7.68592 19.3408L4.9455 19.5829C4.7905 19.5966 4.66078 19.4669 4.67447 19.3119L4.91656 16.5714C4.94239 16.2791 5.07028 16.0051 5.27783 15.7976L14.3632 6.71222Z" fill="#FAFAF9"/>
                        </svg>

                        
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowDeleteDeliveryAddress(true);
                        }}
                        className="delete-button"
                      >
                      Delete

                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.375 4C9.375 3.30964 9.93464 2.75 10.625 2.75H13.375C14.0654 2.75 14.625 3.30964 14.625 4V5.25H9.375V4ZM7.875 4V5.25H3C2.58579 5.25 2.25 5.58579 2.25 6C2.25 6.41421 2.58579 6.75 3 6.75H21C21.4142 6.75 21.75 6.41421 21.75 6C21.75 5.58579 21.4142 5.25 21 5.25H16.125V4C16.125 2.48122 14.8938 1.25 13.375 1.25H10.625C9.10622 1.25 7.875 2.48122 7.875 4ZM20.7387 9.13C20.8104 8.72205 20.5378 8.33319 20.1299 8.26146C19.7219 8.18973 19.3331 8.46229 19.2613 8.87025L17.2663 20.2165L17.2663 20.2166C17.1613 20.8143 16.6421 21.2501 16.0353 21.2501H7.96474C7.35792 21.2501 6.83872 20.8143 6.73363 20.2165L4.73867 8.87025C4.66694 8.46229 4.27808 8.18973 3.87013 8.26146C3.46217 8.33318 3.1896 8.72205 3.26133 9.13L5.25629 20.4763C5.48748 21.7912 6.62967 22.7501 7.96474 22.7501H16.0353C17.3703 22.7501 18.5125 21.7912 18.7437 20.4763L18.7437 20.4763L20.7387 9.13Z" fill="#FAFAF9"/>
                        </svg>

                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="add-address-button"
                  onClick={handleAddAddress}
                >
                  Add Delivery Address
                </button>
              </>
            )}
          </>
        )}
      </div>

          {/* Bottom Navigation */}
          <div className="bottom-nav">
        <div className="navigation-profile">
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

export default Delivery;
