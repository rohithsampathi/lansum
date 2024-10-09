import React from 'react';

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-3 py-2 md:px-4 md:py-2 bg-primary text-white text-sm md:text-base rounded hover:bg-secondary transition duration-300 ${className}`}
  >
    {children}
  </button>
);

export default Button;