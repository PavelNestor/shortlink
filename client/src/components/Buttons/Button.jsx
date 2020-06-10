import React from 'react';

export const Button = ({ accent, className, onClick, text }) => {
  return (
    <button
      className={`btn waves-effect waves-light black-text ${
        accent ? 'light-green accent-3' : 'grey lighten-1'
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
