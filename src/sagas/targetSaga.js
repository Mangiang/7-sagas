import {put, takeEvery} from 'redux-saga/effects';

function* destroyTarget(action) {
    yield put({type: "TARGET_DESTROYED", targetId: action.targetId});
    yield put({type: 'SCORE_INCREMENT_REQUESTED'})
}

function* targetSaga() {
    yield takeEvery("TARGET_DESTROYED_REQUESTED", destroyTarget);
}

export default targetSaga;