import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import '../styles/GasConsumptionDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';

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
  
  const options = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", month];

  const handleSelect = (value) => {
    setSelectedView(value);
    setIsOpen(false);
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
      'August': [
        { period: 'Week 1', consumption: 0.28 },
        { period: 'Week 2', consumption: 0.31 },
        { period: 'Week 3', consumption: 0.03 },
        { period: 'Week 4', consumption: 0 },
        { period: 'Week 5', consumption: 0 },
      ]
    };

    const dummyTotalConsumption = {
      'Week 1': 0.26,
      'Week 2': 0.26,
      'Week 3': 0.26,
      'Week 4': 0.26,
      'Week 5': 0.26,
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

    const barWidth = selectedView.startsWith('Week') ? 20 : 40;

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
    return (
      <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle" dominantBaseline="middle" fontSize="10">
        {value > 0 ? value.toFixed(2) : ''}
      </text>
    );
  };

  return (
    <div className="main-analytics-container">
      <div className="top-div">
        <div className="top-header"><svg  onClick={() => navigate('/analytics')} width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81404 14.3501C8.08234 14.6184 8.08234 15.0534 7.81404 15.3217L5.32274 17.813H18.7786C19.1581 17.813 19.4657 18.1206 19.4657 18.5C19.4657 18.8794 19.1581 19.187 18.7786 19.187H5.32274L7.81404 21.6783C8.08234 21.9466 8.08234 22.3816 7.81404 22.6499C7.54574 22.9182 7.11075 22.9182 6.84245 22.6499L3.17832 18.9858C2.91003 18.7175 2.91003 18.2825 3.17832 18.0142L6.84245 14.3501C7.11075 14.0818 7.54574 14.0818 7.81404 14.3501Z" fill="#292927"/>
</svg>
{month} 2024</div>
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
            <p className="consumption-text">
              {selectedView === 'Week 1' ? `Week 1 ${month} 2024` :
               selectedView.startsWith('Week') ? `${selectedView} ${month} 2024` : `${month} 2024`}
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