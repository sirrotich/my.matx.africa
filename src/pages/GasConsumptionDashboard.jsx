import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ChevronDown } from 'lucide-react';
import '../styles/GasConsumptionDashboard.css';
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

const GasConsumptionDropdown = ({ selectedView, setSelectedView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ['Week 1', 'Week 2', 'Week 3', 'August', 'This Year'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedView(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="dropdown-button">
        {selectedView}
        <ChevronDown className="dropdown-icon" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`dropdown-item ${selectedView === option ? 'selected' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const GasConsumptionDashboard = () => {
  const [selectedView, setSelectedView] = useState('Week 1');
  const [data, setData] = useState({});
  const [totalConsumption, setTotalConsumption] = useState({});

  const fetchData = async (view) => {
    // Simulated API call
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
        { period: 'Sep', consumption: 3.0 },
        { period: 'Oct', consumption: 0.1 },
        { period: 'Nov', consumption: 0.1 },
        { period: 'Dec', consumption: 0 },
      ],
      'Week 1': [
        { period: 'Sun', consumption: 0 },
        { period: 'Mon', consumption: 0 },
        { period: 'Tue', consumption: 0 },
        { period: 'Wed', consumption: 0 },
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
          <BarChart data={alternatedData} margin={{ top: 50, right: 10, left: 10, bottom: 20 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, angle: -90, textAnchor: 'end' }}
              interval={0}
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
          <BarChart data={data[selectedView]} margin={{ top: 50, right: 10, left: 10, bottom: 20 }}>
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
      <div className="max-w">
        <div className="p-4">
          <div className="chart-container">
            <div className="flex justify-between items-center">
              <h2 className="total-remaining-gas">13kg Gas</h2>
              <GasConsumptionDropdown selectedView={selectedView} setSelectedView={setSelectedView} />
            </div>
            {renderChart()}
          </div>
          <div className="mt-4 text-white p-4 rounded" style={{ background: 'var(--surface-surface-primary-100, #004A4C)' }}>
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
      </div>
   
    </div>
  );
};

export default GasConsumptionDashboard;