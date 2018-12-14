import {takeEvery } from 'redux-saga';
import {put} from 'redux-saga/effects';

function* startGame() {
    yield put({type: "GAME_START"});
}

function* gameSaga() {
    yield takeEvery("GAME_START_REQUESTED", startGame);
}

export default gameSaga;