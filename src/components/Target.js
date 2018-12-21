import React from 'react';

const Target = ({ x = 0, y = 0, value = 0, backgroundColor = '#00FF00', onClick = () => {} }) => (
  <div
    style={{
      position: 'absolute',
      top: `${y}%`,
      left: `${x}%`,
      width: '25px',
      height: '25px',
      textAlign: 'center',
      lineHeight: '25px',
      cursor: 'pointer',
      backgroundColor: backgroundColor
    }}
    onClick={onClick}
  >
    {value}
  </div>
);

export default Target;
