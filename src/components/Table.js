import React from 'react';

const Table = ({ children, className = '', ...props }) => (
  <table
    {...props}
    className={`w-full text-left border-collapse ${className}`}
  >
    {children}
  </table>
);

export default Table;