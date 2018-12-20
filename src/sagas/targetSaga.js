import {delay} from 'redux-saga'
import {put, call, select, takeEvery} from 'redux-saga/effects';

function* manualDestroyTarget(action) {
    yield destroyTarger(action.targetId);
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
    let toDestroy = [];
    targetsList.forEach((target)=>{
        if (target.value <= 0)
            toDestroy.push(target.id);
    });

    for (let i = 0; i < toDestroy.length; i++)
    {
        yield destroyTarger(toDestroy[i]);
        yield put({type:'DECREASE_LIFE_REQUESTED'});
    }
}

function* destroyTarger(targetId){
    yield put({type: "TARGET_DESTROYED", targetId: targetId});
}

function* targetSaga() {
    yield takeEvery("TARGET_DESTROYED_REQUESTED", manualDestroyTarget);
    yield takeEvery("TARGET_DECREMENT_BEGIN", decrementTargetValues);
    yield takeEvery("TARGET_CHECK", targetChecker);
}

export default targetSaga;