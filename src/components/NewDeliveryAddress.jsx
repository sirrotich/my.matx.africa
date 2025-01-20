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

    const [formData, setFormData] = useState({
        street: isEditing ? editingAddress.street : '',
        general_location_id: isEditing ? editingAddress.general_location_id : '',
        general_location_name: isEditing ? editingAddress.general_location_name : '',
        apartment: isEditing ? editingAddress.apartment : '',
        house_number: isEditing ? editingAddress.house_number : '',
        matx_id: isEditing ? editingAddress.matx_id : '',
        matx_name: isEditing ? editingAddress.matx_name : '',
    });

    useEffect(() => {
        const fetchData = async () => {
        const userId = localStorage.getItem('user_id');
        
        // Only proceed with the API calls if userId exists
        if (userId) {
            try {
            const [locationsRes, matxRes] = await Promise.all([
                fetch('https://apis.gasmat.africa/addresses/All_locations'),
                fetch(`https://apis.gasmat.africa/assign-devices/user/${userId}`),
            ]);
            const locationsData = await locationsRes.json();
            const matxData = await matxRes.json();
            
            setLocations(locationsData);
            setMatxDevices(Array.isArray(matxData) ? matxData : []);
            } catch (error) {
            console.error('Error fetching data:', error);
            setMatxDevices([]);
            }
        } else {
            console.log('User ID not found in localStorage');
            // You might want to redirect to login or handle this case
        }
        };
        
        fetchData();
    }, []);
    

        const filteredLocations = locations.filter((loc) =>
            loc.location.toLowerCase().includes(locationSearch.toLowerCase())
        );

    // Update the filtering logic with a null check
        const filteredMatxDevices = Array.isArray(matxDevices) 
            ? matxDevices.filter((device) => device.name.toLowerCase().includes(matxSearch.toLowerCase()))
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

    const handleMatxSelect = (device) => {
        setFormData({
        ...formData,
        matx_id: device.matx_id,
        matx_name: device.name
        });
        setMatxSearch('');
        setShowMatxDropdown(false);
    };


    // Update the handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        

        try {
            if (isEditing) {
                const response = await fetch(`https://apis.gasmat.africa/addresses/update_delivery_address/${editingAddress.delivery_address_id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        street: formData.street,
                        apartment: formData.apartment,
                        house_number: formData.house_number,
                        general_location_id: formData.general_location_id,
                        matx_id: formData.matx_id,
                    })
                });

                if (response.ok) {
                    onUpdate();
                    onClose();
                }
            } else {
                const userId = localStorage.getItem('user_id');
                const payload = {
                    matx_id: formData.matx_id,
                    user_id: userId,
                    general_location_id: formData.general_location_id,
                    street: formData.street,
                    apartment: formData.apartment,
                    house_number: formData.house_number
                };

                const response = await fetch('https://apis.gasmat.africa/addresses/delivery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Failed to save address');
                }
            }
        } catch (error) {
            console.error('Error saving/updating address:', error);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="new-address-container">
        <form ref={formRef} onSubmit={handleSubmit} className="address-form">
            <div className="input-group">
            <label>Street/Road/Way*</label>
            <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="-"
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
                    value={formData.general_location_name || locationSearch}
                    onChange={(e) => {
                        setLocationSearch(e.target.value);
                        setFormData({ ...formData, general_location_name: e.target.value });
                        setShowLocationDropdown(true);
                    }}
                    placeholder="Search location..."
                    className="search-input"
                    />
                    <div className="options-list">
                    {filteredLocations.map((loc) => (
                        <div
                        key={loc.general_location_id}
                        className="option"
                        onClick={() => {
                            setFormData({
                            ...formData,
                            general_location_id: loc.general_location_id,
                            general_location_name: loc.location,
                            });
                            setShowLocationDropdown(false);
                        }}
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
            />
            </div>

            <div className="input-group">
            <label>House Number*</label>
            <input
                type="text"
                value={formData.house_number}
                onChange={(e) => setFormData({ ...formData, house_number: e.target.value })}
                placeholder="-"
            />
            </div>

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
                    {filteredMatxDevices.map((device) => (
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
                    ))}
                    </div>
                </div>
                )}
            </div>
            </div>

            <button 
            type="submit" 
            className="save-button"
            disabled={loading || !formData.street || !formData.general_location_id || 
                    !formData.apartment || !formData.house_number || !formData.matx_id}
            >
                        {isEditing ? 'Update Address' : 'Save Address'}
                        </button>
        </form>
        </div>
    );
    };

    export default NewDeliveryAddress;
