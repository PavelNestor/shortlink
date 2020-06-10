import React from 'react';

export const Link = ({ href, text, onClick }) => {
  return (
    <a href={href} onClick={onClick}>
      {text}
    </a>
  );
};
