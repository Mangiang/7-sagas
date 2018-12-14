import {takeEvery } from 'redux-saga';
import {put} from 'redux-saga/effects';

function* destroyTarget(target) {
    yield put({type: "TARGET_DESTROYED", target});
}

function* targetSaga() {
    yield takeEvery("TARGET_DESTROYED_REQUESTED", destroyTarget);
}

export default targetSaga;