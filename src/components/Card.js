import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 bg-gray-50 ${className}`}
  >
    <h2 className="text-base md:text-lg font-semibold text-gray-800">{children}</h2>
  </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div {...props} className={`px-4 py-3 md:px-6 md:py-4 ${className}`}>
    {children}
  </div>
);

export default Card;