import React from 'react';

const Button = ({
                    onClick = () => { },
                    backgroundColor = '#e0000f',
                    top = 0,
                    text = ''
                }) => (
    <div
        style={{
            position: 'absolute',
            top: top,
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
            backgroundColor: backgroundColor,
            color: '#21222C'
        }}
        onClick={onClick}
    >
        {text}
    </div>
);

export default Button;
