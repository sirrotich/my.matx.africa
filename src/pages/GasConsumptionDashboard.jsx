import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import '../styles/GasConsumptionDashboard.css';
import { useNavigate } from 'react-router-dom';

const CustomShape = (props) => {
  const { x, y, width, height, value } = props;
  const radius = Math.min(15, Math.max(5, value * 4));

  return (
    <g>
      <line x1={x + width / 2} y1={y + height} x2={x + width / 2} y2={y} stroke="#EA760C" strokeWidth="1.75" />
      <circle cx={x + width / 2} cy={y} r={radius} fill="#EA760C" />
    </g>
  );
};



const GasConsumptionDashboard = () => {
  const [selectedView, setSelectedView] = useState('This Year');
  const [data, setData] = useState({});
  const [totalConsumption, setTotalConsumption] = useState({});
  const navItems = document.querySelectorAll('.nav-item');
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  
  const options = ["This Year", "Week 1", "August"];

  const handleSelect = (value) => {
    setSelectedView(value);
    setIsOpen(false);
  };




  navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to the clicked item
        item.classList.add('active');
    });
});
  // Simulated API call
  const fetchData = async (view) => {
    // In a real scenario, this would be an API call
    const dummyData = {
      'This Year': [
        { period: 'Jan', consumption: 0.5 },
        { period: 'Feb', consumption: 0.8 },
        { period: 'Mar', consumption: 1.2 },
        { period: 'Apr', consumption: 1.5 },
        { period: 'May', consumption: 1.8 },
        { period: 'Jun', consumption: 2.1 },
        { period: 'Jul', consumption: 2.4 },
        { period: 'Aug', consumption: 2.7 },
        { period: 'Sep', consumption: 6.0 },
        { period: 'Oct', consumption: 0.1 },
        { period: 'Nov', consumption: 0.1 },
        { period: 'Dec', consumption: 3.0 },
      ],
      'Week 1': [
        { period: 'Sun', consumption: 0 },
        { period: 'Mon', consumption: 0 },
        { period: 'Tue', consumption: 0 },
        { period: 'Wed', consumption: 0.11 },
        { period: 'Thu', consumption: 0.23 },
        { period: 'Fri', consumption: 0.03 },
        { period: 'Sat', consumption: 0 },
      ],
      'August': [
        { period: 'Week 1', consumption: 0.28 },
        { period: 'Week 2', consumption: 0.31 },
        { period: 'Week 3', consumption: 0.03 },
        { period: 'Week 4', consumption: 0 },
        { period: 'Week 5', consumption: 0 },
      ]
    };

    const dummyTotalConsumption = {
      'This Year': 14.86,
      'Week 1': 0.26,
      'August': 0.62
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setData(dummyData);
    setTotalConsumption(dummyTotalConsumption);
  };

  useEffect(() => {
    fetchData(selectedView);
  }, [selectedView]);

  const renderChart = () => {
    if (!data[selectedView]) return null;

    if (selectedView === 'This Year') {
      const alternatedData = data[selectedView].map((item, index) => ({
        ...item,
        consumption: index % 2 === 0 ? item.consumption : item.consumption * 0.8
      }));

      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={alternatedData} margin={{ top: 0, right: 10, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, angle: -90, textAnchor: 'end' }}              interval={0}
              height={50}
              tickMargin={10}
            />
            <Bar dataKey="consumption" shape={<CustomShape />} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      const barWidth = selectedView === 'Week 1' ? 20 : 40;
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[selectedView]} margin={{ top: 40, right: 10, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10,  }}
              interval={0}
              height={50}
              tickMargin={10}
              
            />
            <Bar dataKey="consumption" fill="#EA760C" radius={[15, 15, 15, 15]} barSize={barWidth}>
              {data[selectedView].map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.consumption > 0 ? "#EA760C" : "transparent"}
                />
              ))}
              <LabelList dataKey="consumption" position="top" content={renderCustomLabel}  />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle" dominantBaseline="middle"   fontSize="10">
        {value > 0 ? value.toFixed(2) : '' }
      </text>
    );
  };

  return (
    
    <div className="main-analytics-container">
        <div className="top-div">
          <div className="top-header">History</div>
          <button className='top-btn'><span className='top-btn-text'>Home Gas</span></button>

        </div>
      <div className="max-w">
        <div className="p-4">
         
          <div className="chart-container">
          <div className="flex justify-between">
            <h2 className="total-remaining-gas">13kg Gas</h2>
            <div className="dropdown">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="dropdown-button"
      >
        {selectedView}
      </button>

      {isOpen && (
        <div className="dropdown-options-container">
          <ul className="dropdown-options">
            {options.map((option, index) => (
              <li 
                key={index} 
                onClick={() => handleSelect(option)} 
                className="dropdown-option"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
          </div>
            {renderChart()}
          </div>
          <div className="mt-4 text-white p-4 rounded" style={{ background: 'var(--surface-surface-primary-100, #004A4C)' }}>
          <p className="consumption-text">{selectedView === 'This Year' ? 'This Year Total Consumption' : 
                                    selectedView === 'Week 1' ? 'Week 1 August 2024' :
                                    'August 2024'}</p>
            <p className="consumption-total">{totalConsumption[selectedView]} kg</p>
            <p className="text-sm" style={{ color: 'var(--text-text-neutral-2, #EBEBE6)'
}}>{selectedView !== 'This Year' ? 'Total Consumption' : ''}</p>
          </div>
        </div>
        <div className="bottom-nav">
      <div className="navigation">
        <div className="nav-item" id="home-icon" onClick={() => navigate('/home')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.66463 7.32904C1.29415 7.51428 1.14398 7.96479 1.32922 8.33527C1.51446 8.70575 1.96497 8.85592 2.33545 8.67068L12 3.83838L21.6646 8.67068C22.0351 8.85592 22.4856 8.70575 22.6709 8.33527C22.8561 7.96479 22.7059 7.51428 22.3355 7.32904L12.6038 2.4632C12.2237 2.27317 11.7764 2.27317 11.3963 2.4632L1.66463 7.32904ZM4.75003 11C4.75003 10.5858 4.41424 10.25 4.00003 10.25C3.58582 10.25 3.25003 10.5858 3.25003 11V19C3.25003 20.5188 4.48125 21.75 6.00003 21.75H18C19.5188 21.75 20.75 20.5188 20.75 19V11C20.75 10.5858 20.4142 10.25 20 10.25C19.5858 10.25 19.25 10.5858 19.25 11V19C19.25 19.6904 18.6904 20.25 18 20.25H6.00003C5.30967 20.25 4.75003 19.6904 4.75003 19V11Z" fill="#292927"/>
          </svg>
        </div>

        <div className="nav-item" id="grid-icon" onClick={() => navigate('/analytics')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.75 20.25V3.75H20.25V20.25H3.75ZM3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM16.75 8C16.75 7.58579 16.4142 7.25 16 7.25C15.5858 7.25 15.25 7.58579 15.25 8V16C15.25 16.4142 15.5858 16.75 16 16.75C16.4142 16.75 16.75 16.4142 16.75 16V8ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V11ZM8 12.25C8.41421 12.25 8.75 12.5858 8.75 13V16C8.75 16.4142 8.41421 16.75 8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V13C7.25 12.5858 7.58579 12.25 8 12.25Z" fill="#292927"/>
          </svg>
        </div>

        <div className="nav-item" id="user-icon" onClick={() => navigate('/profile')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.75 8C8.75 6.20507 10.2051 4.75 12 4.75C13.7949 4.75 15.25 6.20507 15.25 8C15.25 9.79493 13.7949 11.25 12 11.25C10.2051 11.25 8.75 9.79493 8.75 8ZM14.8583 11.7941C16.0073 10.9271 16.75 9.55031 16.75 8C16.75 5.37665 14.6234 3.25 12 3.25C9.37665 3.25 7.25 5.37665 7.25 8C7.25 9.55031 7.99271 10.9271 9.14172 11.7941C6.27612 12.9317 4.25 15.7293 4.25 19V20C4.25 20.4142 4.58579 20.75 5 20.75C5.41421 20.75 5.75 20.4142 5.75 20V19C5.75 15.5482 8.54822 12.75 12 12.75C15.4518 12.75 18.25 15.5482 18.25 19V20C18.25 20.4142 18.5858 20.75 19 20.75C19.4142 20.75 19.75 20.4142 19.75 20V19C19.75 15.7293 17.7239 12.9317 14.8583 11.7941Z" fill="#292927"/>
          </svg>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default GasConsumptionDashboard;