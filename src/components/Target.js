import React from 'react';

const Target = ({
                    x = 0,
                    y = 0,
                    value = 0,
                    backgroundColor = '#00FF00',
                    circleShape = false, onClick = () => { }
                }) => (
    <div
        style={{
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            width: circleShape ? "100px" : '25px',
            height: circleShape ? "100px" : '25px',
            textAlign: 'center',
            lineHeight: '50px',
            cursor: 'pointer',
            borderRadius: circleShape ? "50px" : "0",
            backgroundColor: backgroundColor
        }}
        onClick={onClick}
    >
        {value}
    </div>
);

export default Target;
