import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import './ProgressBar.css';

const ResponsiveProgressBar = ({ percentage }) => {
  const percentageFunded = 50;
  return (
    <div className="progress-bar-container">
      <ProgressBar
        completed={percentageFunded}
        label={`${percentageFunded}% funded`}
        bgColor='var(--secondary)' 
        baseBgColor='var(--white)' 
        height='20px' 
        width='100% !important'
        margin='5px' 
        isLabelVisible 
        transition='2s ease-in'
        className='progress-bar' // add className
      />
      <div className="eth-text">5 ETH</div> 
    </div>
  );
};

export default ResponsiveProgressBar;
