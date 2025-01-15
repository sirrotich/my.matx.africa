import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGas } from './GasContext';

const DynamicGasDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState('auto');
  const buttonRef = useRef(null);
  const { locations, selectedLocation, setSelectedLocation } = useGas();
  const location = useLocation();
  
  const isAnalyticsPage = location.pathname === '/analytics';
  const isMonthlyPage = location.pathname.includes('/months/');

  useEffect(() => {
    if (buttonRef.current) {
      // Get the width of the button including padding
      setDropdownWidth(Math.max(buttonRef.current.offsetWidth, 92));
    }
  }, [selectedLocation]);

  const toggleDropdown = () => {
    if (locations.length > 1) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  const dropdownLocations = locations.filter(loc => loc.matx_id !== selectedLocation?.matx_id);

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
      width: 'fit-content',
      cursor: locations.length > 1 ? 'pointer' : 'default',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      fontSize: '11px',
      fontFamily: 'Bai Jamjuree',
      fontWeight: '600',
      lineHeight: '17.23px',
      letterSpacing: '-0.02em',
      textAlign: 'left',
      position: 'relative',
      zIndex: 2,
      padding: '4px 16px',
      whiteSpace: 'nowrap'
    };

    const baseDropdownStyles = {
      position: 'absolute',
      top: '0',
      right: 0,
      paddingTop: '25px',
      borderRadius: '15px',
      width: `${dropdownWidth}px`,
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      border: '1px solid #004A4C'
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
          whiteSpace: 'nowrap'
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
        whiteSpace: 'nowrap'
      },
      chevron: '#292927'
    };
  };

  const styles = getStyles();

  const showDropdownButton = dropdownLocations.length > 0;

  return (
    <div style={styles.container}>
      <button ref={buttonRef} onClick={toggleDropdown} style={styles.button}>
        <span style={styles.text}>
          {selectedLocation?.name}
        </span>
        {showDropdownButton && (
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
                d="M4.61953 7.68343C4.85321 7.44976 5.23207 7.44976 5.46574 7.68343L9.82952 12.0472L14.1933 7.68343C14.427 7.44976 14.8058 7.44976 15.0395 7.68343C15.2732 7.91711 15.2732 8.29596 15.0395 8.52964L10.2526 13.3165C10.019 13.5502 9.64009 13.5502 9.40642 13.3165L4.61953 8.52964C4.38586 8.29596 4.38586 7.91711 4.61953 7.68343Z"
                fill={styles.chevron}
              />
            </svg>
          </div>
        )}
      </button>

      {isOpen && showDropdownButton && (
        <div style={styles.dropdown}>
          {dropdownLocations.map((location) => (
            <button
              key={location.matx_id}
              onClick={() => handleSelect(location)}
              style={{
                ...styles.dropdownItem,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isAnalyticsPage || isMonthlyPage ? '#E5E5E5' : '#292927';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
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