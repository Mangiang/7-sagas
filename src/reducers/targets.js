const defaultState = {
    targetsList: [
        {id: 0, x: 5, y: 5, value: 10}
    ]
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
            let x = Math.floor(Math.random() * 90);
            let y = Math.floor(Math.random() * 100);
            targetsList.push({id: targetsList.length, x: x, y: y, value: 5});
            return {
                ...state,
                targetsList: targetsList
            };
        case 'TARGET_DECREMENT':
            targetsList = state.targetsList.map((target) => ({...target, value: target.value - 1}));
            return {
                ...state,
                targetsList: targetsList
            };
        default:
            return state;
    }
};

export default targets;
