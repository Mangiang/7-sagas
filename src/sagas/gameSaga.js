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

function* displayMainMenu() {
    yield put({type: "GAME_MAIN_MENU"});
}
function* displaySettings() {
    yield put({type: "GAME_SETTINGS"});
}
function* changeTimeInterval(action) {
    yield put({type: "GAME_CHANGE_TIME_INTERVAL", newTimeInterval : action.newTimeInterval});
}
function* changeSpawnInterval(action) {
    yield put({type: "GAME_CHANGE_SPAWN_INTERVAL", newSpawnInterval : action.newSpawnInterval});
}
function* changeLivesCount(action) {
    yield put({type: "GAME_CHANGE_LIVES_COUNT", newLivesCount : action.newLivesCount});
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
    yield takeEvery("GAME_SETTINGS_REQUESTED", displaySettings);
    yield takeEvery("GAME_MAIN_MENU_REQUESTED", displayMainMenu);
    yield takeEvery("SCORE_INCREMENT_REQUESTED", incrementScore);
    yield takeEvery("DECREASE_LIFE_REQUESTED", decreaseLife);
    yield takeEvery("GAME_CHANGE_TIME_INTERVAL_REQUESTED", changeTimeInterval);
    yield takeEvery("GAME_CHANGE_SPAWN_INTERVAL_REQUESTED", changeSpawnInterval);
    yield takeEvery("GAME_CHANGE_LIVES_COUNT_REQUESTED", changeLivesCount);
}

export default gameSaga;