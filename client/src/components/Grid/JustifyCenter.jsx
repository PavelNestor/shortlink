import React from 'react';

export const JustifyCenter = ({ className = '', children }) => {
  return <div className={`flex justify-center ${className}`}>{children}</div>;
};
