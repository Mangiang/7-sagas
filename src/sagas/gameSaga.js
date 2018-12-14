import {delay} from 'redux-saga';
import {takeEvery, call, select, put} from 'redux-saga/effects';

function* startGame(action) {
    yield put({type: "GAME_START", width: action.width, height: action.height});

    while (true) {
        yield call(delay, 1000);
        yield put({type: "TARGET_SPAWN"});

        const started = yield select(state => state.isStarted);
        if (!started)
            break;
    }
}

function* stopGame() {
    yield put({type: "GAME_STOP"});
}

function* incrementScore() {
    yield put({type: "INCREMENT_SCORE"});
}

function* gameSaga() {
    yield takeEvery("GAME_START_REQUESTED", startGame);
    yield takeEvery("GAME_STOP_REQUESTED", stopGame);
    yield takeEvery("SCORE_INCREMENT_REQUESTED", incrementScore);
}

export default gameSaga;