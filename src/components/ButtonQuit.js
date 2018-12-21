import React from 'react';

const ButtonQuit = ({ onClick = () => {} }) => (
  <div
    style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: '100px',
      width: '300px',
      height: '100px',
      margin: 'auto',
      fontSize: '32px',
      fontStyle: 'italic',
      textAlign: 'center',
      lineHeight: '100px',
      cursor: 'pointer',
      backgroundColor: '#e0000f',
      color: '#21222C'
    }}
    onClick={onClick}
  >
    Main Menu
  </div>
);

export default ButtonQuit;
