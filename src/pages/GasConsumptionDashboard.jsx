import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import '../styles/GasConsumptionDashboard.css';
import { useNavigate } from 'react-router-dom';
import DynamicGasDropdown from '../components/DynamicGasDropdown';

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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('/analytics');

  const handleNavigate = (path) => {
      setActiveNav(path);
      navigate(path);
  };
  const options = ["This Year", "2023"];

  const handleSelect = (value) => {
    setSelectedView(value);
    setIsOpen(false);
  };

  // Simulated API call
  const fetchData = async (view) => {
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

    await new Promise(resolve => setTimeout(resolve, 500));

    setData(dummyData);
    setTotalConsumption(dummyTotalConsumption);
  };

  useEffect(() => {
    fetchData(selectedView);
  }, [selectedView]);

  const handleBarClick = (entry) => {
    if (selectedView === 'This Year') {
      navigate(`/months/${entry.period}`);
    }
  };

  const renderChart = () => {
    if (!data[selectedView]) return null;

    if (selectedView === 'This Year') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[selectedView]} margin={{ top: 0, right: 10, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, angle: -90, textAnchor: 'end' }}
              interval={0}
              height={50}
              tickMargin={10}
            />
            <Bar 
              dataKey="consumption" 
              shape={<CustomShape />} 
              onClick={handleBarClick}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[selectedView]} margin={{ top: 40, right: 10, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10 }}
              interval={0}
              height={50}
              tickMargin={10}
            />
            <Bar dataKey="consumption" fill="#EA760C" radius={[15, 15, 15, 15]} barSize={40}>
              {data[selectedView].map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.consumption > 0 ? "#EA760C" : "transparent"}
                />
              ))}
              <LabelList dataKey="consumption" position="top" content={renderCustomLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle" dominantBaseline="middle" fontSize="10">
        {value > 0 ? value.toFixed(2) : ''}
      </text>
    );
  };

  return (
    <div className="main-analytics-container">
      <div className="top-div">
        <div className="top-header">History</div>
        <div className="top-btn">
  <DynamicGasDropdown />
</div>   
        
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
          <div 
  className="mt-4 text-white p-4" 
  style={{ background: 'var(--surface-surface-primary-100, #004A4C)', borderRadius: '15px' }}
>
            <p className="consumption-text">
              {selectedView === 'This Year' ? 'This Year Total Consumption' : 
               selectedView === 'Week 1' ? 'Week 1 August 2024' :
               'August 2024'}
            </p>
            <p className="consumption-total">{totalConsumption[selectedView]} kg</p>
            <p className="text-sm" style={{ color: 'var(--text-text-neutral-2, #EBEBE6)' }}>
              {selectedView !== 'This Year' ? 'Total Consumption' : ''}
            </p>
          </div>
        </div>
        <div className="bottom-nav">
        <div className="navigation">
        <div 
                    className={`nav-item ${activeNav === '/' ? 'active' : ''}`} 
                    id="home-icon" 
                    onClick={() => handleNavigate('/')}
                >          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.66463 7.32904C1.29415 7.51428 1.14398 7.96479 1.32922 8.33527C1.51446 8.70575 1.96497 8.85592 2.33545 8.67068L12 3.83838L21.6646 8.67068C22.0351 8.85592 22.4856 8.70575 22.6709 8.33527C22.8561 7.96479 22.7059 7.51428 22.3355 7.32904L12.6038 2.4632C12.2237 2.27317 11.7764 2.27317 11.3963 2.4632L1.66463 7.32904ZM4.75003 11C4.75003 10.5858 4.41424 10.25 4.00003 10.25C3.58582 10.25 3.25003 10.5858 3.25003 11V19C3.25003 20.5188 4.48125 21.75 6.00003 21.75H18C19.5188 21.75 20.75 20.5188 20.75 19V11C20.75 10.5858 20.4142 10.25 20 10.25C19.5858 10.25 19.25 10.5858 19.25 11V19C19.25 19.6904 18.6904 20.25 18 20.25H6.00003C5.30967 20.25 4.75003 19.6904 4.75003 19V11Z" fill="#292927"/>
          </svg>
        </div>

        <div 
                    className={`nav-item ${activeNav === '/analytics' ? 'active' : ''}`} 
                    id="grid-icon" 
                    onClick={() => handleNavigate('/analytics')}
                >          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.75 20.25V3.75H20.25V20.25H3.75ZM3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM16.75 8C16.75 7.58579 16.4142 7.25 16 7.25C15.5858 7.25 15.25 7.58579 15.25 8V16C15.25 16.4142 15.5858 16.75 16 16.75C16.4142 16.75 16.75 16.4142 16.75 16V8ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V11ZM8 12.25C8.41421 12.25 8.75 12.5858 8.75 13V16C8.75 16.4142 8.41421 16.75 8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V13C7.25 12.5858 7.58579 12.25 8 12.25Z" fill="#292927"/>
          </svg>
        </div>

        <div 
                    id="grid-icon" 
                >         <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6489 8.9795V0.00756836H15.7628L11.6573 8.04862L7.55022 0.00756836H0.664124V8.9795H3.57903V2.93854H5.77087L10.0187 11.2562L6.03292 19.0597H3.68579L3.57903 12.5989L0.664124 12.6493L0.819411 21.9923H7.81228L11.6573 14.4639L15.5023 21.9923H22.4936L22.6489 12.6493L19.734 12.5989L19.6272 19.0597H17.2801L13.2943 11.2562L17.5421 2.93854H19.734V8.9795H22.6489Z" fill="#292927"/>
                </svg>
                
                
        </div>

        <div 
                    className={`nav-item ${activeNav === '/notifications' ? 'active' : ''}`} 
                    id="grid-icon" 
                    onClick={() => handleNavigate('/notifications')}
                >         <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5039 1.15259C9.8492 1.15259 8.27197 1.85415 7.11632 3.08684C5.96208 4.31803 5.32071 5.97893 5.32071 7.70221C5.32071 11.0279 4.65326 13.1168 4.022 14.3512C3.70571 14.9698 3.39549 15.3798 3.17536 15.6277C3.06512 15.7518 2.97698 15.8358 2.92129 15.8853C2.89344 15.91 2.87366 15.9262 2.86327 15.9345L2.85528 15.9407C2.61613 16.1148 2.51502 16.4227 2.60517 16.7051C2.6961 16.9898 2.96072 17.1831 3.25964 17.1831H19.7482C20.0471 17.1831 20.3117 16.9898 20.4027 16.7051C20.4928 16.4227 20.3917 16.1148 20.1526 15.9407L20.1446 15.9345C20.1342 15.9262 20.1144 15.91 20.0865 15.8853C20.0309 15.8358 19.9427 15.7518 19.8325 15.6277C19.6123 15.3798 19.3021 14.9698 18.9858 14.3512C18.3546 13.1168 17.6871 11.0279 17.6871 7.70221C17.6871 5.97893 17.0458 4.31803 15.8915 3.08684C14.7359 1.85415 13.1586 1.15259 11.5039 1.15259ZM17.7625 14.9768C17.9253 15.2952 18.0892 15.5713 18.2469 15.8091H4.76089C4.9186 15.5713 5.08257 15.2952 5.24537 14.9768C5.98816 13.5243 6.69476 11.2162 6.69476 7.70221C6.69476 6.31577 7.21151 4.99432 8.11874 4.02661C9.02456 3.0604 10.2433 2.52663 11.5039 2.52663C12.7646 2.52663 13.9833 3.0604 14.8891 4.02661C15.7963 4.99432 16.3131 6.31577 16.3131 7.70221C16.3131 11.2162 17.0197 13.5243 17.7625 14.9768ZM10.5136 18.8996C10.3232 18.5714 9.90278 18.4596 9.57457 18.65C9.24636 18.8404 9.13464 19.2608 9.32503 19.589C9.54647 19.9708 9.86431 20.2876 10.2467 20.5079C10.6291 20.7282 11.0627 20.8441 11.504 20.8441C11.9453 20.8441 12.3789 20.7282 12.7613 20.5079C13.1438 20.2876 13.4616 19.9708 13.683 19.589C13.8734 19.2608 13.7617 18.8404 13.4335 18.65C13.1053 18.4596 12.6849 18.5714 12.4945 18.8996C12.3938 19.0731 12.2494 19.2171 12.0755 19.3172C11.9017 19.4174 11.7046 19.4701 11.504 19.4701C11.3034 19.4701 11.1064 19.4174 10.9325 19.3172C10.7587 19.2171 10.6142 19.0731 10.5136 18.8996Z" fill="#292927"/>
                </svg>
                
        </div>

        <div 
                    className={`nav-item ${activeNav === '/profile' ? 'active' : ''}`} 
                    id="user-icon" 
                    onClick={() => handleNavigate('/profile')}
                >          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
