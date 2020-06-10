import React from 'react';

export const InputField = ({
  className,
  id,
  label,
  name,
  onChange,
  type,
  value,
}) => {
  return (
    <div className='input-field col s12'>
      <input
        className={className}
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />

      <label htmlFor={id}>{label}</label>
    </div>
  );
};
