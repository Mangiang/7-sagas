import React from 'react';

const ButtonSettings = ({ onClick = () => {} }) => (
  <div
    style={{
      position: 'absolute',
      top: '220px',
      left: 0,
      right: 0,
      bottom: 0,
      width: '300px',
      height: '100px',
      margin: 'auto',
      fontSize: '32px',
      fontStyle: 'italic',
      textAlign: 'center',
      lineHeight: '100px',
      cursor: 'pointer',
      backgroundColor: '#e0a342',
      color: '#21222C'
    }}
    onClick={onClick}
  >
    SETTINGS
  </div>
);

export default ButtonSettings;
