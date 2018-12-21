const defaultState = {
    targetsList: [],
    targetId: 0,
    targetMaxValue: 5,
    baseBackgroundColor : '#00FF00'
};

const getHexColorFromValue = (value) => {
  const rValue = (Math.round(255 * (1-(value/defaultState.targetMaxValue)))).toString(16).toUpperCase();
    const gValue = (Math.round(255 * (value/defaultState.targetMaxValue))).toString(16).toUpperCase();
    const bValue = '00';

    return `#${rValue}${gValue}${bValue}`
};

const targets = (state = defaultState, action) => {
    let targetsList;
    switch (action.type) {
        case 'TARGET_DESTROYED':
            targetsList = state.targetsList.filter((value) => (value.id !== action.targetId));
            return {
                ...state,
                targetsList: targetsList
            };
        case 'TARGET_SPAWN':
            targetsList = [...state.targetsList];
            let targetId = state.targetId;
            const x = Math.floor(Math.random() * 80) + 10;
            const y = Math.floor(Math.random() * 70) + 10;
            targetsList.push({id: targetId++, x: x, y: y, value: state.targetMaxValue, backgroundColor: state.baseBackgroundColor});
            return {
                ...state,
                targetId : targetId,
                targetsList: targetsList
            };
        case 'TARGET_DECREMENT':
            targetsList = state.targetsList.map((target) => ({...target, value: target.value - 1, backgroundColor : getHexColorFromValue(target.value - 1)}));
            return {
                ...state,
                targetsList: targetsList
            };
        default:
            return state;
    }
};

export default targets;
