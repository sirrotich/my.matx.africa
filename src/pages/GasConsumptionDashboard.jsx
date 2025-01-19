import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import '../styles/GasConsumptionDashboard.css';
import { useNavigate } from 'react-router-dom';
import DynamicGasDropdown from '../components/DynamicGasDropdown';

import BarTooltip from '../components/BarTooltip';

// Custom Shape Component for Gas Charts
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

// Main Dashboard Component
const GasConsumptionDashboard = () => {
  const [selectedView, setSelectedView] = useState('This Year');
  const [data, setData] = useState({});
  const [totalConsumption, setTotalConsumption] = useState({});
  const navigate = useNavigate();
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [powerTooltipInfo, setPowerTooltipInfo] = useState(null);
  const [internetTooltipInfo, setInternetTooltipInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('/analytics');
  const [activeTab, setActiveTab] = useState('Gas');

  const handleNavigate = (path) => {
    setActiveNav(path);
    navigate(path);
  };

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
      '2023': 12.87,
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

  const handleBarClick = (entry, event) => {
    if (selectedView === 'This Year') {
      // Get click coordinates relative to the chart
      const svgElement = event.target.ownerSVGElement;
      const point = svgElement.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
      
      setTooltipInfo({
        value: entry.consumption,
        position: {
          x: svgPoint.x,
          y: svgPoint.y
        },
        period: entry.period
      });
    }
  };


  const handleViewDetails = (period) => {
    setTooltipInfo(null); // Hide tooltip
    navigate(`/months/${period}`);
  };
  

  // Add these handler functions
const handlePowerBarClick = (entry, event) => {
  if (selectedView === 'This Year') {
    const svgElement = event.target.ownerSVGElement;
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
    
    // Determine if it's powerOn or powerOutage based on the fill color
    const isOutage = event.target.getAttribute('fill') === '#666666';
    const value = isOutage ? entry.powerOutage : entry.powerOn;
    
    setPowerTooltipInfo({
      value,
      position: {
        x: svgPoint.x,
        y: svgPoint.y
      },
      period: entry.period,
      dataType: isOutage ? 'outage' : 'on'
    });
  }
};

const handleInternetBarClick = (entry, event) => {
  if (selectedView === 'This Year') {
    const svgElement = event.target.ownerSVGElement;
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
    
    // Determine if it's online or offline based on the fill color
  // Get the current fill color of the clicked bar
    const fillColor = event.target.getAttribute('fill');
    // Check which bar was clicked based on fill color
    const isOffline = fillColor === '#FF6B6B';
    
    setInternetTooltipInfo({
      value: isOffline ? entry.offline : entry.online,  // Select correct value based on which bar clicked
      position: {
        x: svgPoint.x,
        y: svgPoint.y
      },
      period: entry.period,
      dataType: isOffline ? 'offline' : 'online'
    });
  }
};



const handlePowerViewDetails = (period) => {
  setPowerTooltipInfo(null);
  navigate(`/power/${period}`);
};

const handleInternetViewDetails = (period) => {
  setInternetTooltipInfo(null);
  navigate(`/internet/${period}`);
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
          {value.toFixed(2)}
        </text>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (!data[selectedView]) return null;

    if (selectedView === 'This Year') {
      return (
        <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[selectedView]} margin={{ top: 0, right: 10, left: 10, bottom: 20 }} onClick={() => tooltipInfo && setTooltipInfo(null)}>
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
              onClick={(entry, index, event) => handleBarClick(entry, event)}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
        {tooltipInfo && (
          <BarTooltip 
            value={tooltipInfo.value}
            position={tooltipInfo.position}
            onViewDetails={() => handleViewDetails(tooltipInfo.period)}
            type="gas"
          />
        )}
      </div>
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


  // Update data in the Internet section of renderTabContent
  const powerData = [
    { period: 'Jan', powerOn: 10, powerOutage: 12 },
    { period: 'Feb', powerOn: 8, powerOutage: 16 },
    { period: 'Mar', powerOn: 9, powerOutage: 15 },
    { period: 'Apr', powerOn: 7, powerOutage: 17 },
    { period: 'May', powerOn: 8, powerOutage: 16 },
    { period: 'Jun', powerOn: 8, powerOutage: 16 },
    { period: 'Jul', powerOn: 9, powerOutage: 15 },
    { period: 'Aug', powerOn: 11, powerOutage: 13 },
    { period: 'Sep', powerOn: 10, powerOutage: 14 },
    { period: 'Oct', powerOn: 8, powerOutage: 16 },
    { period: 'Nov', powerOn: 11, powerOutage: 13 },
    { period: 'Dec', powerOn: 10, powerOutage: 14 },
  ];

  // Update data in the Internet section of renderTabContent
const internetData = [
  { period: 'Jan', online: 20, offline: 4 }, // Example: 24 hours offline, rest online
  { period: 'Feb', online: 12, offline: 12 },
  { period: 'Mar', online: 20, offline: 4 },
  { period: 'Apr', online: 4, offline: 20 },
  { period: 'May', online: 7, offline: 17 },
  { period: 'Jun', online: 5, offline: 19 },
  { period: 'Jul', online: 12, offline: 12 },
  { period: 'Aug', online: 20, offline: 4 },
  { period: 'Sep', online: 10, offline: 14 },
  { period: 'Oct', online: 14, offline: 10 },
  { period: 'Nov', online: 20, offline: 4 },
  { period: 'Dec', online: 4, offline: 20 }
];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Gas':
        return (
          <div className="cards-wrapper">
            <div className="chart-container">
              <div className="flex justify-between">
                <h2 className="total-remaining-gas">13kg Gas</h2>
                <div className="dropdown">
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="dropdown-button" style={{ marginTop: '20px'}}
                  >
                    {selectedView}
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.00208 7.17373C5.2197 6.95611 5.57253 6.95611 5.79015 7.17373L9.85411 11.2377L13.9181 7.17373C14.1357 6.95611 14.4885 6.95611 14.7061 7.17373C14.9238 7.39135 14.9238 7.74418 14.7061 7.9618L10.2481 12.4198C10.0305 12.6374 9.6777 12.6374 9.46008 12.4198L5.00208 7.9618C4.78446 7.74418 4.78446 7.39135 5.00208 7.17373Z" fill="#292927"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="dropdown-options-container">
                      <ul className="dropdown-options">
                        {["This Year", "2023"].map((option, index) => (
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

            <div className="consumption-card">
              <p className="consumption-text">
                {selectedView === 'This Year' ? 'This Year Total Consumption' : 
                selectedView === '2023' ? '2023 Total Consumption' : ''}
              </p>
              <p className="consumption-total">{totalConsumption[selectedView]} kg</p>
            </div>
          </div>
        );
      case 'Power':
        return (
          <div className="cards-wrapper">
            <div className="chart-container">
            <div className="flex justify-end items-center legend-container" style={{ marginLeft: '16px' }}>
                <div className="flex items-center gap-4 mt-4 ml-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    <span className="power-on"><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.61792" y="0.0894775" width="5.36585" height="5.36585" rx="2.68293" fill="#E4760C"/>
</svg>   Power On</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                    <span className="power-outage"><svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.869873" y="0.0894775" width="5.36585" height="5.36585" rx="2.68293" fill="#52524D"/>
</svg> Power Outage
</span>
                  </div>
                </div>

                <div className="dropdown" style={{ marginLeft: '25px', marginTop: '5px'}}>
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="dropdown-button"
                  >
                    {selectedView}
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.00208 7.17373C5.2197 6.95611 5.57253 6.95611 5.79015 7.17373L9.85411 11.2377L13.9181 7.17373C14.1357 6.95611 14.4885 6.95611 14.7061 7.17373C14.9238 7.39135 14.9238 7.74418 14.7061 7.9618L10.2481 12.4198C10.0305 12.6374 9.6777 12.6374 9.46008 12.4198L5.00208 7.9618C4.78446 7.74418 4.78446 7.39135 5.00208 7.17373Z" fill="#292927"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="dropdown-options-container" style={{ marginTop: '-2px'}}>
                      <ul className="dropdown-options">
                        {["This Year", "2023"].map((option, index) => (
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
              

              
              <div style={{ position: 'relative' }}>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart    
                 data={powerData.map(item => ({
                  ...item,
                  powerOnWithSpace: item.powerOn + 2,
                  spacer: 1  // Increased spacer to match internet chart
                }))}
                
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}       onClick={() => powerTooltipInfo && setPowerTooltipInfo(null)}
>
                  <XAxis 
                    dataKey="period" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, angle: -90, textAnchor: 'end' }}
                    height={50}
                    tickMargin={10}
                  />
                  <Bar dataKey="powerOn" stackId="stack" fill="#EA760C"  radius={[15, 15, 15, 15]} 
                    barSize={5.37}         
                    onClick={(entry, index, event) => handlePowerBarClick(entry, event)}         
                    cursor="pointer"

                  />

                  <Bar 
                        dataKey="spacer" 
                        fill="transparent" 
                        stackId="stack"
                        barSize={5.37}
                      />
                  

                  <Bar dataKey="powerOutage" stackId="stack" fill="#666666"   radius={[15, 15, 15, 15]}
                    barSize={5.37} 
                    onClick={(entry, index, event) => handlePowerBarClick(entry, event)}         
                    cursor="pointer"

/>
                </BarChart>
              </ResponsiveContainer>
              {powerTooltipInfo && (
            <BarTooltip 
              value={powerTooltipInfo.value}
              position={powerTooltipInfo.position}
              onViewDetails={() => handlePowerViewDetails(powerTooltipInfo.period)}
              type="power"
              dataType={powerTooltipInfo.dataType}
            />
          )}
      </div>
            </div>

            <div className="consumption-card-power">
              <p className="consumption-title">Total Number Hour Of Power Outage</p>
              <div className="stats-container">
                <div className="stat-item">
                  <p className="stat-value">7</p>
                  <p className="stat-label">Your Home</p>
                </div>
                
                <div className="vertical-divider"></div>
                
                <div className="stat-item">
                  <p className="stat-value">30</p>
                  <p className="stat-label">Your Area</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Internet':
        return (
          <div className="cards-wrapper">
            <div className="chart-container">
            <div className="flex justify-end items-center legend-container" style={{ marginLeft: '16px' }}>
                <div className="flex items-center gap-4 mt-4 ml-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    <span className="power-on"><svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.671387" y="0.151245" width="5.37588" height="5.37588" rx="2.68794" fill="#004A4C"/>
</svg>
   Online</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                    <span className="power-outage"><svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.966797" y="0.151245" width="5.37588" height="5.37588" rx="2.68794" fill="#FF6565"/>
</svg>
 Offline
</span>
                  </div>
                </div>
                <div className="dropdown" style={{paddingLeft: '79px' , marginTop: '5px'}}>
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="dropdown-button"
                  >
                    {selectedView}
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.00208 7.17373C5.2197 6.95611 5.57253 6.95611 5.79015 7.17373L9.85411 11.2377L13.9181 7.17373C14.1357 6.95611 14.4885 6.95611 14.7061 7.17373C14.9238 7.39135 14.9238 7.74418 14.7061 7.9618L10.2481 12.4198C10.0305 12.6374 9.6777 12.6374 9.46008 12.4198L5.00208 7.9618C4.78446 7.74418 4.78446 7.39135 5.00208 7.17373Z" fill="#292927"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="dropdown-options-container" style={{ marginTop: '-2px'}}>
                      <ul className="dropdown-options">
                        {["This Year", "2023"].map((option, index) => (
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

              <div style={{ position: 'relative' }}>

              <ResponsiveContainer width="100%" height={300}>
            <BarChart 
                 data={internetData.map(item => ({
                  ...item,
                  onlineWithSpace: item.online + 2, // Add space for visualization
                  spacer: 1  // This creates the gap
                }))}
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
              onClick={() => internetTooltipInfo && setInternetTooltipInfo(null)}

            >
              <XAxis 
                dataKey="period" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, angle: -90, textAnchor: 'end' }}
                height={50}
                tickMargin={10}
              />
              <Bar 
                dataKey="online" 
                stackId="a" // Important: both bars need same stackId
                fill="#004A4C" 
                radius={[15, 15, 15, 15]}
                barSize={5.37}
                onClick={(entry, index, event) => handleInternetBarClick(entry, event)}
                cursor="pointer"
            
                
              />

            <Bar 
                  dataKey="spacer" 
                  fill="transparent" 
                  stackId="a"
                  barSize={5.37}
                />
              
              <Bar 
                dataKey="offline" 
                stackId="a" // Important: both bars need same stackId
                fill="#FF6B6B" 
                radius={[15, 15, 15, 15]}
                barSize={5.37}
                onClick={(entry, index, event) => handleInternetBarClick(entry, event)}
                cursor="pointer"

              />
            </BarChart>
          </ResponsiveContainer>
          {internetTooltipInfo && (
            <BarTooltip 
              value={internetTooltipInfo.value}
              position={internetTooltipInfo.position}
              onViewDetails={() => handleInternetViewDetails(internetTooltipInfo.period)}
              type="internet"
              dataType={internetTooltipInfo.dataType}
            />
          )}
             
          </div>
            </div>

            <div className="consumption-card-power">
              <p className="consumption-title">Total Number Hour Of Internet Outage</p>
              <div className="stats-container">
                <div className="stat-item">
                  <p className="stat-value">7</p>
                  <p className="stat-label">Your Home</p>
                </div>
                
                <div className="vertical-divider"></div>
                
                <div className="stat-item">
                  <p className="stat-value">30</p>
                  <p className="stat-label">Your Area</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  // ... (previous code remains the same until return statement)

  return (
    <div className="main-analytics-container">
      <div className="top-div">
        <div className="top-header">History</div>
        <div className="top-btn">
          <DynamicGasDropdown />
        </div>
      </div>
      
      <div className="max-w">
        <div className="gas-pw-tabs">
          <div className="bg-ebebe6">
            <div className="tabs-flex-container">
              <button
                onClick={() => setActiveTab('Gas')}
                className={`tab-button ${activeTab === 'Gas' ? 'active' : ''}`}
              >
                Gas
              </button>
              <button
                onClick={() => setActiveTab('Power')}
                className={`tab-button ${activeTab === 'Power' ? 'active' : ''}`}
              >
                Power
              </button>
              <button
                onClick={() => setActiveTab('Internet')}
                className={`tab-button ${activeTab === 'Internet' ? 'active' : ''}`}
              >
                Internet
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          {renderTabContent()}
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
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5039 1.15259C9.8492 1.15259 8.27197 1.85415 7.11632 3.08684C5.96208 4.31803 5.32071 5.97893 5.32071 7.70221C5.32071 11.0279 4.65326 13.1168 4.022 14.3512C3.70571 14.9698 3.39549 15.3798 3.17536 15.6277C3.06512 15.7518 2.97698 15.8358 2.92129 15.8853C2.89344 15.91 2.87366 15.9262 2.86327 15.9345L2.85528 15.9407C2.61613 16.1148 2.51502 16.4227 2.60517 16.7051C2.6961 16.9898 2.96072 17.1831 3.25964 17.1831H19.7482C20.0471 17.1831 20.3117 16.9898 20.4027 16.7051C20.4928 16.4227 20.3917 16.1148 20.1526 15.9407L20.1446 15.9345C20.1342 15.9262 20.1144 15.91 20.0865 15.8853C20.0309 15.8358 19.9427 15.7518 19.8325 15.6277C19.6123 15.3798 19.3021 14.9698 18.9858 14.3512C18.3546 13.1168 17.6871 11.0279 17.6871 7.70221C17.6871 5.97893 17.0458 4.31803 15.8915 3.08684C14.7359 1.85415 13.1586 1.15259 11.5039 1.15259ZM17.7625 14.9768C17.9253 15.2952 18.0892 15.5713 18.2469 15.8091H4.76089C4.9186 15.5713 5.08257 15.2952 5.24537 14.9768C5.98816 13.5243 6.69476 11.2162 6.69476 7.70221C6.69476 6.31577 7.21151 4.99432 8.11874 4.02661C9.02456 3.0604 10.2433 2.52663 11.5039 2.52663C12.7646 2.52663 13.9833 3.0604 14.8891 4.02661C15.7963 4.99432 16.3131 6.31577 16.3131 7.70221C16.3131 11.2162 17.0197 13.5243 17.7625 14.9768ZM10.5136 18.8996C10.3232 18.5714 9.90278 18.4596 9.57457 18.65C9.24636 18.8404 9.13464 19.2608 9.32503 19.589C9.54647 19.9708 9.86431 20.2876 10.2467 20.5079C10.6291 20.7282 11.0627 20.8441 11.504 20.8441C11.9453 20.8441 12.3789 20.7282 12.7613 20.5079C13.1438 20.2876 13.4616 19.9708 13.683 19.589C13.8734 19.2608 13.7617 18.8404 13.4335 18.65C13.1053 18.4596 12.6849 18.5714 12.4945 18.8996C12.3938 19.0731 12.2494 19.2171 12.0755 19.3172C11.9017 19.4174 11.7046 19.4701 11.504 19.4701C11.3034 19.4701 11.1064 19.4174 10.9325 19.3172C10.7587 19.2171 10.6142 19.0731 10.5136 18.8996Z" fill="#292927"/>
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

export default GasConsumptionDashboard;