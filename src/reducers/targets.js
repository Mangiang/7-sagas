const defaultState = {
    targetsList: [],
    targetId: 0,
    targetMaxValue: 5,
    baseBackgroundColor: '#00FF00',
};

const getHexColorFromValue = (value) => {
    const rValue = (Math.round(255 * (1 - (value / defaultState.targetMaxValue)))).toString(16).toUpperCase();
    const gValue = (Math.round(255 * (value / defaultState.targetMaxValue))).toString(16).toUpperCase();
    const bValue = '00';

    return `#${rValue}${gValue}${bValue}`
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
            targetsList.push({id: targetId++, x: action.x, y: action.y, value: 2, backgroundColor: state.baseBackgroundColor});
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList
            };

        case 'TARGET_SPAWN':
            targetsList = [...state.targetsList];
            targetId = state.targetId;
            targetsList.push({id: targetId++, x: action.x, y: action.y, value: state.targetMaxValue, backgroundColor: state.baseBackgroundColor});
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList
            };
        case 'TARGET_DECREMENT':
            console.log(action.deltaTime);
            targetsList = state.targetsList.map((target) => (
                {...target,
                    value: target.value - (action.deltaTime !== -1 ? action.deltaTime : 1),
                    backgroundColor: getHexColorFromValue(target.value - (action.deltaTime !== -1 ? action.deltaTime : 1))}
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
