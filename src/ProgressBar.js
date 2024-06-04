// src/components/ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
