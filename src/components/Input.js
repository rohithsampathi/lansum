// src/components/Input.js
import React from 'react';

const Input = ({ ...props }) => (
  <input
    {...props}
    className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${
      props.className || ''
    }`}
  />
);

export default Input;
