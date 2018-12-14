import {delay} from 'redux-saga'
import {put, call, select, takeEvery} from 'redux-saga/effects';

function* destroyTarget(action) {
    yield put({type: "TARGET_DESTROYED", targetId: action.targetId});
    yield put({type: 'SCORE_INCREMENT_REQUESTED'})
}

function* decrementTargetValues() {
    while (true) {
        yield call(delay, yield select(state => state.game.TIME_INTERVAL));
        yield put({type: "TARGET_DECREMENT"});
        yield put({type: "TARGET_CHECK"});

        const started = yield select(state => state.game.isStarted);
        if (!started) {
            break;
        }
    }
}

function* targetChecker() {
    const targetsList = yield select(state => state.targets.targetsList);
    targetsList.forEach((target)=>{
        if (target.value <= 0)
            test(target);
    });
}

function* test(target){
    yield put({type: "TARGET_DESTROYED", targetId: target.targetId});
}

function* targetSaga() {
    yield takeEvery("TARGET_DESTROYED_REQUESTED", destroyTarget);
    yield takeEvery("TARGET_DECREMENT_BEGIN", decrementTargetValues);
    yield takeEvery("TARGET_CHECK", targetChecker);
}

export default targetSaga;