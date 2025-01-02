import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

const GasContext = createContext();
const POLLING_INTERVAL = 500; // 500ms polling interval
const API_BASE_URL = 'https://apis.gasmat.africa';

// Optimized API call with AbortController for cleanup
const fetchUserLocations = async (userId, signal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assign-devices/user/${userId}`, {
      signal,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      // Handle abortion silently
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

  // Optimized fetch function with timestamp comparison
  const loadLocations = useCallback(async (signal) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const data = await fetchUserLocations(userId, signal);
      if (!data) return; // Request was aborted

      // Compare with existing data to avoid unnecessary updates
      const hasChanges = JSON.stringify(data) !== JSON.stringify(locations);
      
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
      }
    } finally {
      setIsLoading(false);
    }
  }, [locations, selectedLocation]);

  // Setup polling with cleanup
  useEffect(() => {
    const controller = new AbortController();
    let timeoutId;

    const pollData = async () => {
      await loadLocations(controller.signal);
      if (!controller.signal.aborted) {
        timeoutId = setTimeout(pollData, POLLING_INTERVAL);
      }
    };

    // Initial load
    pollData();

    // Cleanup function
    return () => {
      controller.abort();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loadLocations]);

  // Setup visibility change handler for background tab optimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadLocations();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadLocations]);

  // Attempt WebSocket connection if available
  useEffect(() => {
    let ws;
    const userId = localStorage.getItem('user_id');

    const connectWebSocket = () => {
      try {
        ws = new WebSocket(`wss://apis.gasmat.africa/ws/locations/${userId}`);
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setLocations(data);
          setLastFetchTime(Date.now());
        };

        ws.onerror = () => {
          // Fallback to polling on WebSocket error
          ws.close();
        };

        ws.onclose = () => {
          // Attempt to reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000);
        };
      } catch (error) {
        console.error('WebSocket connection failed:', error);
      }
    };

    // Try WebSocket first
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const contextValue = useMemo(() => ({
    locations,
    selectedLocation,
    setSelectedLocation,
    isLoading,
    error,
    lastFetchTime,
    refreshLocations: () => loadLocations(),
  }), [locations, selectedLocation, isLoading, error, lastFetchTime, loadLocations]);

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
