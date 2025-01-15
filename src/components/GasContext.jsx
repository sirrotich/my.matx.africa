import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';

const GasContext = createContext();
const POLLING_INTERVAL = 500;
const API_BASE_URL = 'https://apis.gasmat.africa';

const fetchUserLocations = async (userId, signal) => {
  if (!userId) return null;
  
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${API_BASE_URL}/assign-devices/user/${userId}`, 
      {
        signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          // Add a random header to prevent caching
          'X-Request-ID': `${userId}-${timestamp}-${Math.random()}`
        },
        // Disable browser caching
        cache: 'no-store'
      }
    );
    
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      return null;
    }
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const GasProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  
  // Use ref to track current user ID to detect changes
  const currentUserIdRef = useRef(localStorage.getItem('user_id'));
  
  // Function to reset all state
  const resetState = useCallback(() => {
    setLocations([]);
    setSelectedLocation(null);
    setError(null);
    setLastFetchTime(null);
  }, []);

  // Check for user changes
  const checkUserChange = useCallback(() => {
    const newUserId = localStorage.getItem('user_id');
    if (newUserId !== currentUserIdRef.current) {
      console.log('User changed, resetting state...', {
        old: currentUserIdRef.current,
        new: newUserId
      });
      currentUserIdRef.current = newUserId;
      resetState();
      return true;
    }
    return false;
  }, [resetState]);

  // Optimized fetch function
  const loadLocations = useCallback(async (signal) => {
    // Check for user change before each fetch
    if (checkUserChange()) {
      return; // Don't proceed with fetch if user changed
    }

    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const data = await fetchUserLocations(userId, signal);
      if (!data) return;

      // Force update if user just changed
      const shouldForceUpdate = checkUserChange();
      
      // Compare data only if no force update
      const hasChanges = shouldForceUpdate || 
        JSON.stringify(data) !== JSON.stringify(locations);
      
      if (hasChanges) {
        setLocations(data);
        setLastFetchTime(Date.now());
        
        if (data.length > 0 && !selectedLocation) {
          setSelectedLocation(data[0]);
        }
      }

      setError(null);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
        setLocations([]);
        
        if (error.message.includes('User ID not found')) {
          window.location.href = '/login';
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [locations, selectedLocation, checkUserChange]);

  // Setup polling with aggressive checking
  useEffect(() => {
    const controller = new AbortController();
    let timeoutId;

    const pollData = async () => {
      // Check user before starting poll
      if (checkUserChange()) {
        await loadLocations(controller.signal);
      } else {
        await loadLocations(controller.signal);
      }
      
      if (!controller.signal.aborted) {
        timeoutId = setTimeout(pollData, POLLING_INTERVAL);
      }
    };

    // Start polling if we have a user
    if (currentUserIdRef.current) {
      pollData();
    }

    return () => {
      controller.abort();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loadLocations, checkUserChange]);

  // Add interval to regularly check for user changes
  useEffect(() => {
    const checkInterval = setInterval(() => {
      checkUserChange();
    }, 1000); // Check every second

    return () => clearInterval(checkInterval);
  }, [checkUserChange]);

  // WebSocket connection with aggressive user checking
  useEffect(() => {
    let ws;
    let reconnectTimeout;
    
    const connectWebSocket = () => {
      // Check user before connecting
      if (checkUserChange()) {
        return;
      }

      const userId = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('auth_token');
      
      if (!userId || !authToken) return;

      try {
        const timestamp = new Date().getTime();
        ws = new WebSocket(
          `wss://apis.gasmat.africa/ws/assign-devices/user/${userId}?token=${authToken}&t=${timestamp}`
        );
        
        ws.onmessage = (event) => {
          // Check user before processing message
          if (!checkUserChange()) {
            const data = JSON.parse(event.data);
            setLocations(data);
            setLastFetchTime(Date.now());
          }
        };

        ws.onerror = () => {
          ws.close();
        };

        ws.onclose = () => {
          reconnectTimeout = setTimeout(connectWebSocket, 5000);
        };
      } catch (error) {
        console.error('WebSocket connection failed:', error);
      }
    };

    if (currentUserIdRef.current) {
      connectWebSocket();
    }

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [checkUserChange]);

  const contextValue = useMemo(() => ({
    locations,
    selectedLocation,
    setSelectedLocation,
    isLoading,
    error,
    lastFetchTime,
    refreshLocations: () => {
      // Force refresh locations and check user
      checkUserChange();
      return loadLocations();
    },
  }), [locations, selectedLocation, isLoading, error, lastFetchTime, loadLocations, checkUserChange]);

  return (
    <GasContext.Provider value={contextValue}>
      {children}
    </GasContext.Provider>
  );
};

export const useGas = () => {
  const context = useContext(GasContext);
  if (!context) {
    throw new Error('useGas must be used within a GasProvider');
  }
  return context;
};