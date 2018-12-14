const defaultState = {
    targetsList: [
        {id:0, x:5, y:5, value: 10}
    ]
};

const targets = (state = defaultState, action) => {
    let targetsList;
    switch (action.type) {
        case 'TARGET_DESTROYED':
            targetsList = state.targetsList.filter((value, index) => value.id === action.target.id);
            return {
                ...state,
                targetsList: targetsList
            };
        default:
            return state;
    }
};

export default targets;
