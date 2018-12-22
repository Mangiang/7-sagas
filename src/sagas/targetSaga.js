import {delay} from 'redux-saga'
import {put, call, select, takeEvery} from 'redux-saga/effects';

function* manualDestroyTarget(action) {
    yield destroyTarger(action.targetId);
    yield put({type: 'SCORE_INCREMENT_REQUESTED'})
}

function* decrementTargetValues(action) {
    let lastUpdate = Date.now();
    let dt = -1;
    while (true) {
        const started = yield select(state => state.game.isStarted);
        if (!started) {
            break;
        }

        if (!action.needDeltaTime)
            yield call(delay, yield select(state => state.game.TIME_INTERVAL));
        else {
            yield call(delay, 10);
            let now = Date.now();
            dt = now - lastUpdate;
            lastUpdate = now;
        }
        yield put({type: "TARGET_DECREMENT", deltaTime: dt});
        yield put({type: "TARGET_CHECK_REQUESTED"});
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

function* targetClearAll() {
    yield put({type: 'RESET_VALUES'});
}

function* targetSaga() {
    yield takeEvery("TARGET_DESTROYED_REQUESTED", manualDestroyTarget);
    yield takeEvery("TARGET_DECREMENT_BEGIN_REQUESTED", decrementTargetValues);
    yield takeEvery("TARGET_CHECK_REQUESTED", targetChecker);
    yield takeEvery("TARGET_CLEAR_ALL_REQUESTED", targetClearAll);
}

export default targetSaga;