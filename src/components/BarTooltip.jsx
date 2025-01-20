import React from 'react';
import '../styles/BarTooltip.css';

const BarTooltip = ({ value, position, onViewDetails, type = 'gas', dataType }) => {
  const getDisplayValue = () => {
    switch (type) {
      case 'gas':
        return `${value.toFixed(2)} kg`;
      case 'power':
        return `${value} ${dataType === 'outage' ? 'Hrs Outage' : 'Hrs'}`;
      case 'internet':
        return `${value} ${dataType === 'offline' ? 'Hrs Offline' : 'Hrs Online'}`;
      default:
        return `${value.toFixed(2)}`;
    }
  };

  return (
    <div 
      className="bar-tooltip"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <div className="tooltip-value">{getDisplayValue()}</div>
      <button className="view-details-btn" onClick={onViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default BarTooltip;