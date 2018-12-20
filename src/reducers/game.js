const defaultState = {
    lives: 3,
    score: 0,
    isStarted: false,
    TIME_INTERVAL: 1000,
    SPAWN_INTERVAL: 1000
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case 'GAME_START':
            return {
                ...state,
                isStarted: true
            };
        case 'GAME_STOP':
            return {
                ...defaultState,
                isStarted: false
            };
        case 'INCREMENT_SCORE':
            let newScore = state.score + 1;
            return {
                ...state,
                score: newScore
            };
        case 'DECREASE_LIFE':
            return {
                ...state,
                lives: state.lives -1
            };
        default:
            return state;
    }
};

export default game;
