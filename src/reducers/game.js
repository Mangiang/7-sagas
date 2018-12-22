const defaultState = {
    lives: 3,
    score: 0,
    isStarted: false,
    inSettingsMenu: false,
    inMusicMenu: false,
    TIME_INTERVAL: 1000,
    SPAWN_INTERVAL: 1000,
    music: null,
    musicContext: null,
    musicSource: null,
    stopRequested: false,
    godModeEnabled : false
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case 'GAME_CHOOSE_MUSIC':
            return {
                ...state,
                isStarted: false,
                inSettingsMenu: false,
                inMusicMenu: true
            };
        case 'GAME_SETTINGS':
            return {
                ...state,
                isStarted: false,
                inMusicMenu: false,
                inSettingsMenu: true
            };
        case 'GAME_MAIN_MENU':
            return {
                ...state,
                isStarted: false,
                inMusicMenu: false,
                inSettingsMenu: false
            };
        case 'GAME_START':
            return {
                ...state,
                isStarted: true
            };
        case 'GAME_START_MUSIC':
            return {
                ...state,
                inMusicMenu: false,
                isStarted: true
            };
        case 'GAME_STOP_APPLY':
            return{
                ...defaultState,
                godModeEnabled: state.godModeEnabled,
                TIME_INTERVAL: state.TIME_INTERVAL,
                SPAWN_INTERVAL: state.SPAWN_INTERVAL
            };
        case 'GAME_STOP':
            return {
                ...state,
                stopRequested: true
            };
        case 'GAME_STOP_MUSIC':
            const musicSrc = state.musicSource;
            const musicCtx = state.musicContext;
            musicSrc.stop(0);
            musicCtx.close();
            return {
                ...defaultState,
                godModeEnabled: state.godModeEnabled,
                TIME_INTERVAL: state.TIME_INTERVAL,
                SPAWN_INTERVAL: state.SPAWN_INTERVAL,
                music: null,
                isStarted: false,
                musicContext: null,
                musicSource: null,
                stopRequested: true
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
        case 'GAME_CHANGE_GOD_MODE':
            return {
                ...state,
                godModeEnabled: action.value
            };
        case 'GAME_CHANGE_MUSIC':
            return {
                ...state,
                isLoading: true,
                music: action.music
            };
        case 'GAME_CHANGE_MUSIC_CONTEXT':
            return{
                ...state,
                musicContext: action.ctx,
                musicSource: action.src
            };
        case 'GAME_CHANGE_LOADING':
            return{
              ...state,
              isLoading: action.isLoading
            };
        case 'GAME_INCREMENT_SCORE':
            let newScore = state.score + 1;
            return {
                ...state,
                score: newScore
            };
        case 'GAME_DECREASE_LIFE':
            return {
                ...state,
                lives: state.lives - 1
            };
        default:
            return state;
    }
};

export default game;
