import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import '../styles/GasConsumptionDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
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

const ConsumptionMonthly = () => {
  const { month } = useParams(); // Retrieve month from URL
  const [selectedView, setSelectedView] = useState('Week 1');
  const [data, setData] = useState({});
  const [totalConsumption, setTotalConsumption] = useState({});
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const options = ["Week 1", "Week 2", "Week 3", "Week 4", month];

  const handleSelect = (value) => {
    setSelectedView(value);
    setIsOpen(false);
  };

  const CustomTick = (props) => {
    const { x, y, payload } = props;
    if (selectedView === month) {
      const [week, number] = payload.value.split('_');
      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={0}
            textAnchor="middle"
            fill="#666"
            fontSize="10"
          >
            Week
          </text>
          <text
            x={0}
            y={20}
            textAnchor="middle"
            fill="#666"
            fontSize="10"
          >
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

  // Simulated API call
  const fetchData = async (view) => {
    const dummyData = {
      'Week 1': [
        { period: 'Sun', consumption: 0 },
        { period: 'Mon', consumption: 0 },
        { period: 'Tue', consumption: 0 },
        { period: 'Wed', consumption: 0.11 },
        { period: 'Thu', consumption: 0.23 },
        { period: 'Fri', consumption: 0.03 },
        { period: 'Sat', consumption: 0 },
      ],
      // Add additional weeks and month data
      [month]: [
        { period: 'Week_1', consumption: 0.26 },
        { period: 'Week_2', consumption: 0.33 },
        { period: 'Week_3', consumption: 0.03 },
        { period: 'Week_4', consumption: 0 },
      ]
    };

    const dummyTotalConsumption = {
      'Week 1': 0.26,
      'Week 2': 0.26,
      'Week 3': 0.26,
      'Week 4': 0.26,
      [month]: 0.62
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    setData(dummyData);
    setTotalConsumption(dummyTotalConsumption);
  };

  useEffect(() => {
    fetchData(selectedView);
  }, [selectedView]);

  useEffect(() => {
    // Fetch data for the initial view based on the month
    fetchData(selectedView);
  }, [month]);

  const renderChart = () => {
    if (!data[selectedView]) return null;

    const barWidth = selectedView.startsWith('Week') ? 20 : 31.4;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data[selectedView]} margin={{ top: 40, right: 10, left: 10, bottom: 20 }}>
          <XAxis 
            dataKey="period" 
            axisLine={false} 
            tickLine={false} 
            tick={<CustomTick />}
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
            <LabelList dataKey="consumption" position="top" content={renderCustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
  
    if (value > 0) {
      return (
        <text
          x={x + width / 2}
          y={y - 30} // Increased spacing between label and bar for non-zero values
          fill="#000"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          transform={`rotate(-90, ${x + width / 2}, ${y - 30})`} // Adjusted rotation anchor for non-zero values
        >
          {`${value.toFixed(2)} kg`}
        </text>
      );
    } else {
      return (
        <g>
          <circle cx={x + width / 2} cy={y} r="5" fill="#ccc" /> {/* Circle at bottom */}
          <text
            x={x + width / 2}
            y={y - 25} // Position label higher up, above the circle
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            transform={`rotate(-90, ${x + width / 2}, ${y - 25})`} // Adjusted rotation anchor for zero values
          >
            0 kg
          </text>
        </g>
      );
    }
  };
  
  
  

  return (
    <div className="main-analytics-container">
      <div className="top-div">
        <div className="top-header"><svg  onClick={() => navigate('/analytics')} width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81404 14.3501C8.08234 14.6184 8.08234 15.0534 7.81404 15.3217L5.32274 17.813H18.7786C19.1581 17.813 19.4657 18.1206 19.4657 18.5C19.4657 18.8794 19.1581 19.187 18.7786 19.187H5.32274L7.81404 21.6783C8.08234 21.9466 8.08234 22.3816 7.81404 22.6499C7.54574 22.9182 7.11075 22.9182 6.84245 22.6499L3.17832 18.9858C2.91003 18.7175 2.91003 18.2825 3.17832 18.0142L6.84245 14.3501C7.11075 14.0818 7.54574 14.0818 7.81404 14.3501Z" fill="#292927"/>
</svg>
{month} 2024</div>
<div className="top-btn-cmp">
  <DynamicGasDropdown />
  
</div>         </div>
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
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00208 7.17373C5.2197 6.95611 5.57253 6.95611 5.79015 7.17373L9.85411 11.2377L13.9181 7.17373C14.1357 6.95611 14.4885 6.95611 14.7061 7.17373C14.9238 7.39135 14.9238 7.74418 14.7061 7.9618L10.2481 12.4198C10.0305 12.6374 9.6777 12.6374 9.46008 12.4198L5.00208 7.9618C4.78446 7.74418 4.78446 7.39135 5.00208 7.17373Z" fill="#292927"/>
</svg>

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
>            <p className="consumption-text">
            {selectedView === month ? `${month} 2024` : `${selectedView} ${month} 2024`}

            </p>
            <p className="consumption-total">{totalConsumption[selectedView]} kg</p>
            <p className="text-sm" style={{ color: 'var(--text-text-neutral-2, #EBEBE6)' }}>
              {selectedView !== 'Week 1' ? 'Total Consumption' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionMonthly;
