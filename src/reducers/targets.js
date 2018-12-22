const defaultState = {
    targetsList: [],
    targetId: 0,
    targetMaxValue: 5,
    targetMusicMaxValue: 2,
    baseBackgroundColor: '#00FF00',
};

const getHexColorFromValue = (value, maxValue, invert) => {
    const rValue = (Math.round(255 * (1 - (value / maxValue)))).toString(16).toUpperCase();
    const gValue = (Math.round(255 * (value / maxValue))).toString(16).toUpperCase();
    const bValue = '00';

    if (!invert)
        return `#${rValue}${gValue}${bValue}`;
    else
        return `#${gValue}${rValue}${bValue}`;
};

const targets = (state = defaultState, action) => {
    let targetsList, targetId;
    switch (action.type) {
        case 'TARGET_DESTROYED':
            targetsList = state.targetsList.filter((value) => (value.id !== action.targetId));
            return {
                ...state,
                targetsList: targetsList
            };
        case 'TARGET_SPAWN_CONTROLLED':
            targetsList = [...state.targetsList];
            targetId = state.targetId;
            targetsList.push({
                id: targetId++,
                x: action.x,
                y: action.y,
                value: defaultState.targetMusicMaxValue,
                backgroundColor: "00FF00"
            });
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList
            };

        case 'TARGET_SPAWN':
            targetsList = [...state.targetsList];
            targetId = state.targetId;
            targetsList.push({
                id: targetId++,
                x: action.x,
                y: action.y,
                value: state.targetMaxValue,
                backgroundColor: state.baseBackgroundColor
            });
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList
            };
        case 'TARGET_DECREMENT':
            targetsList = state.targetsList.map((target) => (
                {
                    ...target,
                    value: target.value - (action.deltaTime !== -1 ? action.deltaTime / 1000 : 1),
                    backgroundColor: getHexColorFromValue(target.value - (action.deltaTime !== -1 ? action.deltaTime / 1000 : 1),
                        (action.delayTime !== -1 ? defaultState.targetMaxValue : defaultState.targetMusicMaxValue),
                        (action.delayTime !== -1))
                }
            ));
            return {
                ...state,
                targetsList: targetsList
            };
        case 'RESET_VALUES':
            return {
                ...defaultState,
                targetsList: []
            };
        default:
            return state;
    }
};

export default targets;
