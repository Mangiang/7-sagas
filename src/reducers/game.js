const defaultState = {
  lives: 3,
  score: 0,
  isStarted: false
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
            ...defaultState
          };
      case 'INCREMENT_SCORE':
        let newScore = state.score + 1;
        return{
          ...state,
            score: newScore
        };
    default:
      return state;
  }
};

export default game;
