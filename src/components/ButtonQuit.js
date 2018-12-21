import React from 'react';

const ButtonQuit = ({ onClick = () => {} }) => (
  <div
    style={{
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
