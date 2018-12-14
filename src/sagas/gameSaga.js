import {takeEvery } from 'redux-saga';
import {put} from 'redux-saga/effects';

function* startGame() {
    yield put({type: "GAME_START"});
}

function* incrementScore() {
    yield put({type: "INCREMENT_SCORE"});
}

function* gameSaga() {
    yield takeEvery("GAME_START_REQUESTED", startGame);
    yield takeEvery("SCORE_INCREMENT_REQUESTED", incrementScore);
}

export default gameSaga;