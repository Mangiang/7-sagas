import React from 'react';


const computeOutterSize = (value, circleShape) => {
    if (!circleShape)
        return "25px";
    if (value <= 1)
        return "100px";
    return (300-(200/value)).toString() + "px"
};

const Target = ({
                    zIndex = 0,
                    x = 0,
                    y = 0,
                    value = 0,
                    backgroundColor = '#00FF00',
                    circleShape = false, onClick = () => {
    }
                }) => (
    <div
        style={{
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            backgroundColor: circleShape ? "#FFFFFF66" : "#FFFFFF00",
            borderRadius: circleShape ? '50%' : '0',
            width: computeOutterSize(value, circleShape),
            height: computeOutterSize(value, circleShape),
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            cursor: 'pointer',
            overflow: 'hidden',
            zIndex: -zIndex,
        }}
    >
        <div
            style={{
                margin: 'auto',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width : circleShape ? '100px' : '100%',
                height :circleShape ? '100px' : '100%',
                textAlign: 'center',
                lineHeight: circleShape ? '50px' : '25px',
                borderRadius: circleShape ? '50px' : '0',
                backgroundColor: backgroundColor,
                pointerEvents: "auto"
            }}
            onClick={onClick}
        >
            {circleShape ? "" :value}
        </div>
    </div>
);

export default Target;
