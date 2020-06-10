import React from 'react';

export const Link = ({ href, text, onClick, ...rest }) => {
  return (
    <a href={href} onClick={onClick} {...rest}>
      {text}
    </a>
  );
};
