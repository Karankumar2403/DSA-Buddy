import React from 'react';

export default function ProgressBar({ total, completed }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Radius and circumference configurations for the SVG circular ring
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-container glass-panel">
      <div className="circular-progress">
        <svg>
          <circle 
            className="progress-track" 
            cx="40" 
            cy="40" 
            r={radius} 
          />
          <circle 
            className="progress-fill" 
            cx="40" 
            cy="40" 
            r={radius} 
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="progress-text">{percent}%</span>
      </div>
      <div className="progress-title-details">
        <span className="progress-title-text">Progress Tracker</span>
        <span className="progress-subtitle-text">
          {completed} of {total} questions solved
        </span>
      </div>
    </div>
  );
}
