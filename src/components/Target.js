import React from 'react';


const computeOuterSize = (value, circleShape) => {
    if (!circleShape)
        return 25;
    if (value <= 1)
        return 100;
    return (100 * value)
};

const computeOuterOffset = (value, circleShape) => {
    if (!circleShape)
        return 0;
    if (value <= 1)
        return 200;
    return (200-(50*(value-1)))
};

const computeInnerOffset = (value, circleShape) => {
    if (!circleShape)
        return 0;
    return 200
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
            display: "flex",
            pointerEvents: "none",
            justifyContent: "center",
            cursor: 'pointer',
            overflow: 'visible',
            zIndex: -zIndex,
        }}
    >
        <div style={{position: 'relative'}}>
            <div style={{
                top:0,
                left: circleShape ? computeOuterOffset(value, circleShape) : 0,
                right:0,
                bottom: 0,
                position: "absolute",
                backgroundColor: circleShape ? "#FFFFFF66" : "#FFFFFF00",
                borderRadius: circleShape ? '50%' : '0',
                width: computeOuterSize(value, circleShape),
                height: computeOuterSize(value, circleShape),
                pointerEvents: "none",
                cursor: 'pointer',
                margin: 'auto',
                zIndex: -zIndex - 1,
            }}/>
            <div
                style={{
                    position: 'absolute',
                    top:0,
                    left: circleShape ? computeInnerOffset(value, circleShape) : 0,
                    right:0,
                    bottom: 0,
                    margin: 'auto',
                    width: circleShape ? '100px' : '100%',
                    height: circleShape ? '100px' : '100%',
                    textAlign: 'center',
                    lineHeight: circleShape ? '50px' : '25px',
                    borderRadius: circleShape ? '50px' : '0',
                    backgroundColor: backgroundColor,
                    pointerEvents: "auto",
                    zIndex: -zIndex,
                }}
                onClick={onClick}
            >
                {circleShape ? "" : value}
            </div>
        </div>
    </div>
);

export default Target;
