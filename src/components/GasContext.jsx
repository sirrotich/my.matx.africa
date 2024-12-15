    // GasContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const GasContext = createContext();

export const GasProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`https://apis.gasmat.africa/assign-devices/user/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocations(data);
        if (data.length > 0) {
          setSelectedLocation(data[0]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    fetchLocations();
  }, []);

  return (
    <GasContext.Provider value={{ locations, selectedLocation, setSelectedLocation }}>
      {children}
    </GasContext.Provider>
  );
};

export const useGas = () => useContext(GasContext);