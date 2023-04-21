import React from 'react';
import '@ramonak/react-progress-bar'
import './ProgressBar.css';

const ProgressBar = ({ percentage }) => {
    return (
      <div className="progress-bar-container">
        <ProgressBar completed={percentage} label={`${percentage}% funded`} />
      </div>
    );
  };

  export default ProgressBar;
