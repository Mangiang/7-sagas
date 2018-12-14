const defaultState = {
    targetsList: []
};

const targets = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_NEW_TARGET':
            let targetsList = state.targetsList;
            targetsList.push({x: 0, y: 0, value: 5});
            return {
                ...state,
                targetsList: targetsList
            };
        default:
            return state;
    }
};

export default targets;
