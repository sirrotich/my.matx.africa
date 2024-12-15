import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGas } from './GasContext';

const DynamicGasDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locations, selectedLocation, setSelectedLocation } = useGas();
  const location = useLocation();
  
  // Check if we're on analytics or monthly consumption page
  const isAnalyticsPage = location.pathname === '/analytics';
  const isMonthlyPage = location.pathname.includes('/months/');

  const toggleDropdown = () => {
    if (locations.length > 1) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  const getStyles = () => {
    const baseButtonStyles = {
      height: '31px',
      borderRadius: '349px',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      minWidth: '92px',
      cursor: locations.length > 1 ? 'pointer' : 'default',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      fontSize: '11px',
      fontFamily: 'Bai Jamjuree',
      fontWeight: '600',
      lineHeight: '17.23px',
      letterSpacing: '-0.02em',
      textAlign: 'left',
      position: 'relative',
      zIndex: 1000,
      padding: '4px 16px'
    };

    const baseDropdownStyles = {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '2px',
      borderRadius: '15px',
      minWidth: '92px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 9999
    };

    const containerStyles = {
      position: 'relative',
      display: 'inline-block',
      zIndex: isOpen ? 9999 : 1000
    };

    if (isAnalyticsPage || isMonthlyPage) {
      return {
        container: containerStyles,
        button: {
          ...baseButtonStyles,
          backgroundColor: '#004A4C',
          color: '#FFFFFF',
        },
        text: {
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'Bai Jamjuree',
        },
        dropdown: {
          ...baseDropdownStyles,
          backgroundColor: '#FFFFFF',
        },
        dropdownItem: {
          width: '100%',
          padding: '8px 16px',
          border: 'none',
          background: 'none',
          color: '#004A4C',
          fontSize: '10.65px',
          fontFamily: 'Bai Jamjuree',
          textAlign: 'left',
          cursor: 'pointer',
          lineHeight: '10px',
          fontWeight: 500,
        },
        chevron: '#FFFFFF'
      };
    }

    return {
      container: containerStyles,
      button: {
        ...baseButtonStyles,
        backgroundColor: '#EBEBE6',
      },
      text: {
        color: '#292927',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Bai Jamjuree',
      },
      dropdown: {
        ...baseDropdownStyles,
        backgroundColor: '#151513',
      },
      dropdownItem: {
        width: '100%',
        padding: '8px 16px',
        border: 'none',
        background: 'none',
        color: '#FFFFFF',
        fontSize: '10.65px',
        fontFamily: 'Bai Jamjuree',
        textAlign: 'left',
        cursor: 'pointer',
        lineHeight: '10px',
        fontWeight: 500,
      },
      chevron: '#292927'
    };
  };

  const styles = getStyles();

  return (
    <div style={styles.container}>
      <button onClick={toggleDropdown} style={styles.button}>
        <span style={styles.text}>
          {selectedLocation?.name}
        </span>
        {locations.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg 
              width="20" 
              height="21" 
              viewBox="0 0 20 21" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transition: 'transform 0.2s ease',
              }}
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M4.61953 13.3165C4.85321 13.5502 5.23207 13.5502 5.46574 13.3165L9.82952 8.95275L14.1933 13.3165C14.427 13.5502 14.8058 13.5502 15.0395 13.3165C15.2732 13.0829 15.2732 12.704 15.0395 12.4703L10.2526 7.68343C10.019 7.44976 9.64009 7.44976 9.40642 7.68343L4.61953 12.4703C4.38586 12.704 4.38586 13.0829 4.61953 13.3165Z" 
                fill={styles.chevron}
              />
            </svg>
          </div>
        )}
      </button>

      {isOpen && locations.length > 1 && (
        <div style={styles.dropdown}>
          {locations.map((location) => (
            <button
              key={location.matx_id}
              onClick={() => handleSelect(location)}
              style={{
                ...styles.dropdownItem,
                backgroundColor: location.name === selectedLocation?.name 
                  ? (isAnalyticsPage || isMonthlyPage ? '#E5E5E5' : '#292927')
                  : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isAnalyticsPage || isMonthlyPage ? '#E5E5E5' : '#292927';
              }}
              onMouseLeave={(e) => {
                if (location.name !== selectedLocation?.name) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {location.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicGasDropdown;