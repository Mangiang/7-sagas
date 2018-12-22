const defaultState = {
    targetsList: [],
    targetId: 0,
    targetMaxValue: 5,
    baseBackgroundColor: '#00FF00',
    lastTarget: null
};

const getHexColorFromValue = (value) => {
    const rValue = (Math.round(255 * (1 - (value / defaultState.targetMaxValue)))).toString(16).toUpperCase();
    const gValue = (Math.round(255 * (value / defaultState.targetMaxValue))).toString(16).toUpperCase();
    const bValue = '00';

    return `#${rValue}${gValue}${bValue}`
};

const targets = (state = defaultState, action) => {
    let targetsList, targetId, x, y, newTarget;
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
            if (!state.lastTarget) {
                x = Math.floor(Math.random() * 80) + 10;
                y = Math.floor(Math.random() * 70) + 10;
            }
            else {
                let angle = Math.random() * Math.PI * 2;
                x = state.lastTarget.x + Math.cos(angle) * Math.floor(Math.random() * 5) + 2;
                y = state.lastTarget.y + Math.sin(angle) * Math.floor(Math.random() * 5) + 2;

                if (x < 10) x = 10;
                else if (x > 90) x = 90;
                if (y < 10) y = 10;
                else if (y > 90) y = 90;
            }

            newTarget = {id: targetId++, x: x, y: y, value: state.targetMaxValue, backgroundColor: state.baseBackgroundColor};
            targetsList.push(newTarget);
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList,
                lastTarget: newTarget
            };

        case 'TARGET_SPAWN':
            targetsList = [...state.targetsList];
            targetId = state.targetId;
            x = Math.floor(Math.random() * 80) + 10;
            y = Math.floor(Math.random() * 70) + 10;
            targetsList.push({id: targetId++, x: x, y: y, value: state.targetMaxValue, backgroundColor: state.baseBackgroundColor});
            return {
                ...state,
                targetId: targetId,
                targetsList: targetsList
            };
        case 'TARGET_DECREMENT':
            targetsList = state.targetsList.map((target) => ({...target, value: target.value - 1, backgroundColor: getHexColorFromValue(target.value - 1)}));
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
