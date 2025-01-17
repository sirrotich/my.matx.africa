import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { useNavigate, useParams } from 'react-router-dom';
import DynamicGasDropdown from '../components/DynamicGasDropdown';
import '../styles/GasConsumptionDashboard.css';

const InternetMonthly = () => {
  const { month } = useParams();
  const [selectedView, setSelectedView] = useState('Week 1');
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Internet');
  const [activeNav, setActiveNav] = useState('/analytics');
  const navigate = useNavigate();

  const options = ["Week 1", "Week 2", "Week 3", "Week 4", month];

  const handleSelect = (value) => {
    setSelectedView(value);
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

  // Simulated API call
  const fetchData = async (view) => {
    const dummyData = {
     'Week 1': [
      { period: 'Sun', online: 14, offline: 10 },
      { period: 'Mon', online: 4, offline: 20 },
      { period: 'Tue', online: 15, offline: 9 },
      { period: 'Wed', online: 16, offline: 8 },
      { period: 'Thu', online: 10, offline: 14 },
      { period: 'Fri', online: 14, offline: 10 },
      { period: 'Sat', online: 14, offline: 10 },
    ],
    [month]: [
        { period: 'Week_1', online: 167, offline: 1 },
        { period: 'Week_2', online: 100, offline: 68 },
        { period: 'Week_3', online: 168, offline: 0 },
        { period: 'Week_4', online: 168, offline: 90 },
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 500));
    setData(dummyData);
  };

  useEffect(() => {
    fetchData(selectedView);
  }, [selectedView, month]);

  const CustomTick = (props) => {
    const { x, y, payload } = props;
    if (selectedView === month) {
      const [week, number] = payload.value.split('_');
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={0} textAnchor="middle" fill="#666" fontSize="10">
            Week
          </text>
          <text x={0} y={20} textAnchor="middle" fill="#666" fontSize="10">
            {number.padStart(2, '0')}
          </text>
        </g>
      );
    }
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#666" fontSize="10">
        {payload.value}
      </text>
    );
  };

  const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    if (value > 0) {
      return (
        <text
          x={x + width / 2}
          y={y - 10}
          fill="#000"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
        >
          {`${value} GB`}
        </text>
      );
    }
    return null;
  };

  const handleTabClick = (tab) => {
    if (tab === activeTab) return;
    
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
  };

  const renderChart = () => {
    if (!data[selectedView]) return null;

    const barWidth = selectedView.startsWith('Week') ? 5.37 : 5.37
     // Adjust spacing based on view
    const getSpacerAndBarSize = () => {
        if (selectedView === month) {
        return {
            spacer: 10,      // Smaller spacer for month view
            barSize: 14    // Larger bars for month view
        };
        } else {
        return {
            spacer: 1,     // Consistent spacer for week view
            barSize: 8     // Smaller bars for week view
        };
        }
    };

    const { spacer, barSize } = getSpacerAndBarSize();

    
    // Transform the data to add spacers
    const transformedData = data[selectedView].map(item => ({
      ...item,
      spacer: spacer, // Creates the gap between bars
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={transformedData} 
          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
          barSize={barWidth}
        >
          <XAxis 
            dataKey="period" 
            axisLine={false}
            tickLine={false}
            tick={<CustomTick />}
            height={50}
            tickMargin={10}
          />
          <Bar 
            dataKey="online" 
            fill="#004A4C" 
            radius={[15, 15, 15, 15]}
            stackId="stack"
          />
          <Bar 
            dataKey="spacer" 
            fill="transparent" 
            stackId="stack"
          />
          <Bar 
            dataKey="offline" 
            fill="#FF6B6B" 
            radius={[15, 15, 15, 15]}
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="main-analytics-container">
      <div className="top-div">
        <div className="top-header" onClick={() => navigate('/analytics')}>
          ← {month} 2024
        </div>
        <div className="top-btn-cmp">
          <DynamicGasDropdown />
        </div>
      </div>
      
      <div className="max-w">
        <div className="gas-pw-tabs">
          <div className="bg-ebebe6">
            <div className="tabs-flex-container">
              <button
                onClick={() => handleTabClick('Gas')}
                className={`tab-button ${activeTab === 'Gas' ? 'active' : ''}`}
              >
                Gas
              </button>
              <button
                onClick={() => handleTabClick('Power')}
                className={`tab-button ${activeTab === 'Power' ? 'active' : ''}`}
              >
                Power
              </button>
              <button
                onClick={() => handleTabClick('Internet')}
                className={`tab-button ${activeTab === 'Internet' ? 'active' : ''}`}
              >
                Internet
              </button>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="chart-container">
          <div className="flex justify-between items-start" style={{ padding: '2px 2px 0 30px', marginTop: '-10px' }}>
          <div className="flex items-center gap-4 mt-4 ml-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                  <span className="power-on">
                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.671387" y="0.151245" width="5.37588" height="5.37588" rx="2.68794" fill="#004A4C"/>
                    </svg>
                    Online
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="power-outage">
                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.966797" y="0.151245" width="5.37588" height="5.37588" rx="2.68794" fill="#FF6565"/>
                    </svg>
                    Offline
                  </span>
                </div>
              </div>
              <div className="dropdown" style={{ marginTop: '4px'}}>
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="dropdown-button"
                >
                  {selectedView}
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00208 7.17373C5.2197 6.95611 5.57253 6.95611 5.79015 7.17373L9.85411 11.2377L13.9181 7.17373C14.1357 6.95611 14.4885 6.95611 14.7061 7.17373C14.9238 7.39135 14.9238 7.74418 14.7061 7.9618L10.2481 12.4198C10.0305 12.6374 9.6777 12.6374 9.46008 12.4198L5.00208 7.9618C4.78446 7.74418 4.78446 7.39135 5.00208 7.17373Z" fill="#292927"/>
</svg>

                </button>

                {isOpen && (
                  <div className="dropdown-options-container" style={{ marginTop: '-5px'}}>
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

          <div className="consumption-card-power">
            <p className="consumption-title">
              {selectedView === month ? `${month} 2024` : `${selectedView} ${month} 2024`} Internet Usage
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <p className="stat-value">250</p>
                <p className="stat-label">GB Usage</p>
              </div>
              <div className="vertical-divider"></div>
              <div className="stat-item">
                <p className="stat-value">{data[selectedView]?.[0]?.offline || 0}</p>
                <p className="stat-label">Hrs Offline</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-nav">
          <div className="navigation">
            <div 
              className={`nav-item ${activeNav === '/' ? 'active' : ''}`} 
              id="home-icon" 
              onClick={() => handleNavigate('/')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.66463 7.32904C1.29415 7.51428 1.14398 7.96479 1.32922 8.33527C1.51446 8.70575 1.96497 8.85592 2.33545 8.67068L12 3.83838L21.6646 8.67068C22.0351 8.85592 22.4856 8.70575 22.6709 8.33527C22.8561 7.96479 22.7059 7.51428 22.3355 7.32904L12.6038 2.4632C12.2237 2.27317 11.7764 2.27317 11.3963 2.4632L1.66463 7.32904ZM4.75003 11C4.75003 10.5858 4.41424 10.25 4.00003 10.25C3.58582 10.25 3.25003 10.5858 3.25003 11V19C3.25003 20.5188 4.48125 21.75 6.00003 21.75H18C19.5188 21.75 20.75 20.5188 20.75 19V11C20.75 10.5858 20.4142 10.25 20 10.25C19.5858 10.25 19.25 10.5858 19.25 11V19C19.25 19.6904 18.6904 20.25 18 20.25H6.00003C5.30967 20.25 4.75003 19.6904 4.75003 19V11Z" fill="#292927"/>
              </svg>
            </div>

            <div 
              className={`nav-item ${activeNav === '/analytics' ? 'active' : ''}`} 
              id="grid-icon" 
              onClick={() => handleNavigate('/analytics')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.75 20.25V3.75H20.25V20.25H3.75ZM3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM16.75 8C16.75 7.58579 16.4142 7.25 16 7.25C15.5858 7.25 15.25 7.58579 15.25 8V16C15.25 16.4142 15.5858 16.75 16 16.75C16.4142 16.75 16.75 16.4142 16.75 16V8ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V11ZM8 12.25C8.41421 12.25 8.75 12.5858 8.75 13V16C8.75 16.4142 8.41421 16.75 8 16.75C7.58579 16.75 7.25 16.4142 7.25 16V13C7.25 12.5858 7.58579 12.25 8 12.25Z" fill="#292927"/>
              </svg>
            </div>

            <div id="grid-icon">
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6489 8.9795V0.00756836H15.7628L11.6573 8.04862L7.55022 0.00756836H0.664124V8.9795H3.57903V2.93854H5.77087L10.0187 11.2562L6.03292 19.0597H3.68579L3.57903 12.5989L0.664124 12.6493L0.819411 21.9923H7.81228L11.6573 14.4639L15.5023 21.9923H22.4936L22.6489 12.6493L19.734 12.5989L19.6272 19.0597H17.2801L13.2943 11.2562L17.5421 2.93854H19.734V8.9795H22.6489Z" fill="#292927"/>
              </svg>
            </div>

            <div 
              className={`nav-item ${activeNav === '/notifications' ? 'active' : ''}`} 
              id="grid-icon" 
              onClick={() => handleNavigate('/notifications')}
            >
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" 
                d="M11.5039 1.15259C9.8492 1.15259 8.27197 1.85415 7.11632 3.08684C5.96208 4.31803 5.32071 5.97893 5.32071 7.70221C5.32071 11.0279 4.65326 13.1168 4.022 14.3512C3.70571 14.9698 3.39549 15.3798 3.17536 15.6277C3.06512 15.7518 2.97698 15.8358 2.92129 15.8853C2.89344 15.91 2.87366 15.9262 2.86327 15.9345L2.85528 15.9407C2.61613 16.1148 2.51502 16.4227 2.60517 16.7051C2.6961 16.9898 2.96072 17.1831 3.25964 17.1831H19.7482C20.0471 17.1831 20.3117 16.9898 20.4027 16.7051C20.4928 16.4227 20.3917 16.1148 20.1526 15.9407L20.1446 15.9345C20.1342 15.9262 20.1144 15.91 20.0865 15.8853C20.0309 15.8358 19.9427 15.7518 19.8325 15.6277C19.6123 15.3798 19.3021 14.9698 18.9858 14.3512C18.3546 13.1168 17.6871 11.0279 17.6871 7.70221C17.6871 5.97893 17.0458 4.31803 15.8915 3.08684C14.7359 1.85415 13.1586 1.15259 11.5039 1.15259ZM17.7625 14.9768C17.9253 15.2952 18.0892 15.5713 18.2469 15.8091H4.76089C4.9186 15.5713 5.08257 15.2952 5.24537 14.9768C5.98816 13.5243 6.69476 11.2162 6.69476 7.70221C6.69476 6.31577 7.21151 4.99432 8.11874 4.02661C9.02456 3.0604 10.2433 2.52663 11.5039 2.52663C12.7646 2.52663 13.9833 3.0604 14.8891 4.02661C15.7963 4.99432 16.3131 6.31577 16.3131 7.70221C16.3131 11.2162 17.0197 13.5243 17.7625 14.9768Z" fill="#292927"/>
              </svg>
            </div>

            <div 
              className={`nav-item ${activeNav === '/profile' ? 'active' : ''}`} 
              id="user-icon" 
              onClick={() => handleNavigate('/profile')}
            >
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

export default InternetMonthly;