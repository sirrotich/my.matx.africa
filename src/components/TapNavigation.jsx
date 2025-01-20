import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabNavigation = ({ activeTab, month }) => {
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    // If we're in monthly view and have a month parameter
    if (month) {
      switch (tab) {
        case 'Gas':
          navigate(`/months/${month}`);
          break;
        case 'Power':
          navigate(`/power/${month}`);
          break;
        case 'Internet':
          navigate(`/internet/${month}`);
          break;
        default:
          break;
      }
    } else {
      // We're in the main analytics view
      navigate('/analytics');
    }
  };

  return (
    <div className="gas-pw-tabs">
      <div className="bg-ebebe6">
        <div className="tabs-flex-container">
          <button
            onClick={() => handleTabChange('Gas')}
            className={`tab-button ${activeTab === 'Gas' ? 'active' : ''}`}
          >
            Gas
          </button>
          <button
            onClick={() => handleTabChange('Power')}
            className={`tab-button ${activeTab === 'Power' ? 'active' : ''}`}
          >
            Power
          </button>
          <button
            onClick={() => handleTabChange('Internet')}
            className={`tab-button ${activeTab === 'Internet' ? 'active' : ''}`}
          >
            Internet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;