import React from 'react';

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition duration-300 ${className}`}
  >
    {children}
  </button>
);

export default Button;