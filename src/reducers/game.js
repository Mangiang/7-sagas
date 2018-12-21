const defaultState = {
    lives: 3,
    score: 0,
    isStarted: false,
    inSettingsMenu: false,
    TIME_INTERVAL: 1000,
    SPAWN_INTERVAL: 1000
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case 'GAME_SETTINGS':
            return {
                ...state,
                inSettingsMenu: true
            };
        case 'GAME_MAIN_MENU':
            return {
                ...state,
                inSettingsMenu: false
            };
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
        case 'GAME_CHANGE_TIME_INTERVAL':
            return {
                ...state,
                TIME_INTERVAL: action.newTimeInterval
            };
        case 'GAME_CHANGE_SPAWN_INTERVAL':
            return {
                ...state,
                SPAWN_INTERVAL: action.newSpawnInterval
            };
        case 'GAME_CHANGE_LIVES_COUNT':
            return {
                ...state,
                lives: action.newLivesCount
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
                lives: state.lives - 1
            };
        default:
            return state;
    }
};

export default game;
