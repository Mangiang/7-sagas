import {delay} from 'redux-saga';
import {takeEvery, call, select, put} from 'redux-saga/effects';

function* startGame() {
    yield put({type: "GAME_START"});
    yield put({type: "TARGET_DECREMENT_BEGIN"});

    const spawnInterval =yield select(state => state.game.SPAWN_INTERVAL);

    while (true) {
        yield call(delay, spawnInterval);
        const score = yield select(state => state.game.score);

        yield put({type: "TARGET_SPAWN"});

        if (score >= 5 && score < 15)
            yield put({type: "TARGET_SPAWN"});

        if (score >= 15)
            yield put({type: "TARGET_SPAWN"});

        const started = yield select(state => state.game.isStarted);
        if (!started)
            break;
    }
}

function* decreaseLife(){
    yield put({type: 'DECREASE_LIFE'});
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
    yield takeEvery("DECREASE_LIFE_REQUESTED", decreaseLife);
}

export default gameSaga;