import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/NewDeliveryAddress.css';

const NewDeliveryAddress = ({ isEditing, editingAddress, onClose, onUpdate }) => {
  const [locations, setLocations] = useState([]);
  const [matxDevices, setMatxDevices] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');
  const [matxSearch, setMatxSearch] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMatxDropdown, setShowMatxDropdown] = useState(false);
  const formRef = useRef(null);
  const userId = localStorage.getItem('user_id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form data with editing values if available
  const [formData, setFormData] = useState({
    street: isEditing ? editingAddress?.street || '' : '',
    general_location_id: isEditing ? editingAddress?.general_location_id || '' : '',
    general_location_name: isEditing ? editingAddress?.general_location || '' : '',
    apartment: isEditing ? editingAddress?.apartment || '' : '',
    house_number: isEditing ? editingAddress?.house_number || '' : '',
    matx_id: isEditing ? editingAddress?.matx_id || '' : '',
    matx_name: isEditing ? editingAddress?.matx_name || '' : ''
  });

  // Debugging: Log initial form data and editing address
  useEffect(() => {
    if (isEditing) {
      console.log('Editing Address:', editingAddress);
      console.log('Initial Form Data:', formData);
    }
  }, [isEditing, editingAddress]);

  const isFormValid = () => {
    if (isEditing) return true;
    
    return (
      formData.street.trim() !== '' &&
      formData.general_location_id !== '' &&
      formData.apartment.trim() !== '' &&
      formData.house_number.trim() !== '' &&
      formData.matx_id !== ''
    );
  };

  const hasChanges = () => {
    if (!isEditing) return true;
    
    const trimmedFormData = {
      street: formData.street.trim(),
      apartment: formData.apartment.trim(),
      house_number: formData.house_number.trim(),
      general_location_id: formData.general_location_id

    };
    
    const trimmedEditingData = {
      street: editingAddress.street.trim(),
      apartment: editingAddress.apartment.trim(),
      house_number: editingAddress.house_number.trim(),
      general_location_id: editingAddress.general_location_id

    };
    
    return (
      trimmedFormData.street !== trimmedEditingData.street ||
      trimmedFormData.general_location_id !== trimmedEditingData.general_location_id ||
      trimmedFormData.apartment !== trimmedEditingData.apartment ||
      trimmedFormData.house_number !== trimmedEditingData.house_number
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        // Fetch locations
        const locationsRes = await fetch('https://apis.gasmat.africa/addresses/All_locations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const locationsData = await locationsRes.json();
        setLocations(locationsData);

        // Only fetch MatX devices if not editing
        if (!isEditing) {
          // Fetch all user's addresses first
          const addressesRes = await fetch(`https://apis.gasmat.africa/addresses/user_addresses/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const addressesData = await addressesRes.json();
          
          // Get array of matx_names that are already linked
          const linkedMatxNames = Array.isArray(addressesData) 
            ? addressesData.map(address => address.matx_name)
            : [];

          // Then fetch all available MatX devices
          const matxRes = await fetch(`https://apis.gasmat.africa/assign-devices/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const matxData = await matxRes.json();

          // Filter out devices that are already linked by name
          const availableDevices = Array.isArray(matxData) 
            ? matxData.filter(device => !linkedMatxNames.includes(device.name))
            : [];
            
          setMatxDevices(availableDevices);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, isEditing]);

  const filteredLocations = locations.filter((loc) =>
    loc.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredMatxDevices = Array.isArray(matxDevices) 
    ? matxDevices.filter((device) => 
        device.name.toLowerCase().includes(matxSearch.toLowerCase()))
    : [];

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      general_location_id: location.general_location_id,
      general_location_name: location.location
    });
    setLocationSearch('');
    setShowLocationDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEditing && !isFormValid()) return;
    
    if (isEditing && !hasChanges()) {
      onClose();
      return;
    }
    
    setLoading(true);

    try {
      if (isEditing) {
        // Prepare update data
        const updateData = {
          street: formData.street.trim(),
          apartment: formData.apartment.trim(),
          house_number: formData.house_number.trim(),
          general_location_id: formData.general_location_id || editingAddress.general_location_id,
          matx_id: editingAddress.matx_id,
          user_id: userId // Added user_id to update request
        };

        console.log('Updating address with:', updateData);
        
        const response = await fetch(`https://apis.gasmat.africa/addresses/update_delivery_address/${editingAddress.delivery_address_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });

        const responseData = await response.json();
        console.log('Update response:', responseData);

        if (!response.ok) {
          console.error('Failed to update address:', responseData);
        }

        // Even if there's an error, proceed with navigation
        await onUpdate();
        onClose();
      } else {
        const response = await fetch('https://apis.gasmat.africa/addresses/delivery', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            matx_id: formData.matx_id,
            user_id: userId,
            general_location_id: formData.general_location_id,
            street: formData.street.trim(),
            apartment: formData.apartment.trim(),
            house_number: formData.house_number.trim()
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save address');
        }

        await onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Error saving/updating address:', error);
      if (!isEditing) {
        setError('An error occurred. Please try again.');
      } else {
        await onUpdate();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-address-container">
      <form ref={formRef} onSubmit={handleSubmit} className="address-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <label>Street/Road/Way*</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="-"
            required
          />
        </div>

        <div className="input-group">
          <label>General Location*</label>
          <div className="select-content" style={{ marginLeft: '-177px'}}>
            <div
              className="select-display"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              {formData.general_location_name || 'Choose your general location'}
              <ChevronDown className="select-icon" style={{ marginLeft: '-200px'}}/>
            </div>
            {showLocationDropdown && (
              <div className="select-dropdown">
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search location..."
                  className="search-input"
                />
                <div className="options-list">
                  {filteredLocations.map((loc) => (
                    <div
                      key={loc.general_location_id}
                      className="option"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc.location}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="input-group">
          <label>Estate/Apartment/Building*</label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
            placeholder="-"
            required
          />
        </div>

        <div className="input-group">
          <label>House Number*</label>
          <input
            type="text"
            value={formData.house_number}
            onChange={(e) => setFormData({ ...formData, house_number: e.target.value })}
            placeholder="-"
            required
          />
        </div>

        {!isEditing && (
          <div className="input-group">
            <label>Link matX to the address*</label>
            <div className="select-content" style={{ marginLeft: '-200px'}}>
              <div
                className="select-display"
                onClick={() => setShowMatxDropdown(!showMatxDropdown)}
              >
                {formData.matx_name || 'Choose matX device'}
                <ChevronDown className="select-icon" style={{ marginLeft: '-200px'}} />
              </div>
              {showMatxDropdown && (
                <div className="select-dropdown">
                  <div className="options-list">
                    {filteredMatxDevices.length > 0 ? (
                      filteredMatxDevices.map((device) => (
                        <div
                          key={device.matx_id}
                          className="option"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              matx_id: device.matx_id,
                              matx_name: device.name,
                            });
                            setShowMatxDropdown(false);
                          }}
                        >
                          {device.name}
                        </div>
                      ))
                    ) : (
                      <div className="no-devices">No available devices to link</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="save-button"
          disabled={!isEditing && !isFormValid()}
        >
          {loading ? 'Please wait...' : (isEditing ? 'Update Address' : 'Save Address')}
        </button>
      </form>
    </div>
  );
};

export default NewDeliveryAddress;
