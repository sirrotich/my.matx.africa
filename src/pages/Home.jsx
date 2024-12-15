import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import '../styles/Home.css';
import DynamicGasDropdown from '../components/DynamicGasDropdown';
const App = () => {

    const currentWeight = 10.23;  
    const cookingDaysRemaining = 23;  
    const todayUsage = 0.1;  
    const weekUsage = 0.56;  
    const averageUsage = 0.43;  
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        setCurrentDate(formattedDate);
      }, []); // Empty dependency array ensures this runs only once when the component is mounted
    
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('/');

    const handleNavigate = (path) => {
        setActiveNav(path);
        navigate(path);
    };

    


  return (
    <div className="home-container">

     <div className="main-top-card">
     <div className="header">  

        <div className="home-gas-data">
            <div className="total-gas-weight">  
                13kg Gas
                
            </div>  

            <div className="home-gasias">
  <DynamicGasDropdown />
</div>   
            {/* <div className="home-gas">
                <button className='home-gas-btn'><span className='home-gas-text'>Home Gas</span></button>
            </div>  */}
        </div> 
            

        <div className="todays-date">
            {currentDate}
        </div>
                        
        </div>  
                   

        <div className="current-weight">  
            <h3 className='current-weight-text'>Current Weight</h3>  
            <div className="current-weight-kgs">{currentWeight} kg  </div>
            <div className="days-remaining">You have {cookingDaysRemaining} cooking days</div>  
        </div>  



     </div>


     <div className="home-analytic">
                <div className="hometoday">  
                <span className="sizing">{todayUsage} Kg</span>
                    <span className="highlight">Today</span>  
                </div>  
                <svg width="1" height="40" viewBox="0 0 1 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="1.61894e-08" x2="0.499998" y2="40" stroke="#004A4C"/>
                </svg>

                <div className="homeweek">
                    <span className="sizing">{weekUsage} Kg</span>
                    <span className="highlight">This Week</span>
                </div>

                <svg width="1" height="40" viewBox="0 0 1 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="1.61894e-08" x2="0.499998" y2="40" stroke="#004A4C"/>
                </svg>
                    
                <div className="homeaverage">
                    <span className="sizing">{averageUsage} Kg</span>
                    <span className="highlight">Average</span>
                </div>
            </div>


            <div className="bottom-nav">
      <div className="navigation-home">
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
  );
};

export default App;
