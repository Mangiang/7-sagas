import React from 'react';

const handleClick = (onClick, disabled) => {
    if (disabled)
        return;

    onClick();
};

const computeColor = (backgroundColor, disabled) => {
    if (!disabled)
        return backgroundColor;

    const color = backgroundColor.substring(1);
    const colorValue = parseInt(color, 16);
    const newColorValue = (colorValue & 0xfefefe) >> 1;
    return "#"+newColorValue.toString(16);
};

const Button = ({
                    onClick = () => {
                    },
                    backgroundColor = '#e0000f',
                    top = 0,
                    text = '',
                    position = 'absolute',
                    disabled = false
                }) => (
    <div
        style={{
            position: position,
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
            backgroundColor: computeColor(backgroundColor, disabled),
            color: '#21222C'
        }}
        onClick={() => handleClick(onClick, disabled)}
    >
        {text}
    </div>
);

export default Button;
