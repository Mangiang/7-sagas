import {delay} from 'redux-saga';
import {takeEvery, call, select, put} from 'redux-saga/effects';

function* startGame() {
    yield put({type: 'GAME_START'});
    yield put({type: 'TARGET_DECREMENT_BEGIN'});

    const spawnInterval = yield select(state => state.game.SPAWN_INTERVAL);

    while (true) {
        yield call(delay, spawnInterval);
        const score = yield select(state => state.game.score);

        yield put({type: 'TARGET_SPAWN'});

        if (score >= 5 && score < 15)
            yield put({type: 'TARGET_SPAWN'});

        if (score >= 15)
            yield put({type: 'TARGET_SPAWN'});

        const stopRequested = yield select(state => state.game.stopRequested);
        if (stopRequested) {
            yield put({type: 'TARGET_CLEAR_ALL'});
            yield put({type: 'GAME_STOP_APPLY'});
            break;
        }
    }
}

function* startMusic() {
    yield put({type: 'GAME_START_MUSIC'});

    let context = new AudioContext();
    let src = context.createBufferSource();

    const buffer = yield select(state => state.game.music);
    src.buffer = buffer;
    src.connect(context.destination);
    let sampleLoop = 8;
    let intervalStep = src.buffer.sampleRate / sampleLoop;
    src.start(0);
    yield put({type: 'GAME_CHANGE_MUSIC_CONTEXT', ctx: context, src: src});
    //data = buffer.getChannelData(0);
    /*console.log(data);
    console.log(threshold);
    let c = 0;
    let mod = 0;
    let countI = 0;
    let intervalID = setInterval(() => {
        countI++;
        if (c < data.length)
            c += intervalStep;
        else
        {
            clearInterval(intervalID);
            console.log("Finished");
        }

        let currentIdx = context.currentTime * data.length / (buffer.length/buffer.sampleRate);

        let sum = 0;
        for (let t = Math.round(currentIdx-intervalStep); t < Math.round(currentIdx+intervalStep);t++)
        {
            if (t > 0)
                sum += data[t];
        }
        let avgAmp = sum/(intervalStep);
        console.log(avgAmp);

        if (mod)
        {
            if (avgAmp > threshold)
            {
                circle.setAttribute("r", "80");
            }
            else{
                circle.setAttribute("r", "40");
            }
        }
        else {
            circle.setAttribute("r", "40");
        }

        mod = countI % 2;
    }, 1000/sampleLoop);*/


    /*yield put({type: "TARGET_DECREMENT_BEGIN"});

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
    }*/
}

function* chooseMusic() {
    yield put({type: 'GAME_CHOOSE_MUSIC'});
}

function* displayMainMenu() {
    yield put({type: 'GAME_MAIN_MENU'});
}

function* displaySettings() {
    yield put({type: 'GAME_SETTINGS'});
}

function* changeTimeInterval(action) {
    yield put({type: 'GAME_CHANGE_TIME_INTERVAL', newTimeInterval: action.newTimeInterval});
}

function* changeSpawnInterval(action) {
    yield put({type: 'GAME_CHANGE_SPAWN_INTERVAL', newSpawnInterval: action.newSpawnInterval});
}

function* changeLivesCount(action) {
    yield put({type: 'GAME_CHANGE_LIVES_COUNT', newLivesCount: action.newLivesCount});
}

function* decreaseLife() {
    yield put({type: 'GAME_DECREASE_LIFE'});
}

function* stopGame() {
    yield put({type: 'GAME_STOP'});
}

function* stopMusic() {
    yield put({type: 'TARGET_CLEAR_ALL'});
    yield put({type: 'GAME_STOP_MUSIC'});
}

function* incrementScore() {
    yield put({type: 'GAME_INCREMENT_SCORE'});
}

function* changeMusic(action) {
    yield put({type: 'GAME_CHANGE_MUSIC', music: action.music});
}

function* gameSaga() {
    yield takeEvery('GAME_CHOOSE_MUSIC_REQUESTED', chooseMusic);
    yield takeEvery('GAME_MUSIC_START_REQUESTED', startMusic);
    yield takeEvery('GAME_START_REQUESTED', startGame);
    yield takeEvery('GAME_STOP_REQUESTED', stopGame);
    yield takeEvery('GAME_STOP_MUSIC_REQUESTED', stopMusic);

    yield takeEvery('GAME_SETTINGS_REQUESTED', displaySettings);
    yield takeEvery('GAME_MAIN_MENU_REQUESTED', displayMainMenu);

    yield takeEvery('SCORE_INCREMENT_REQUESTED', incrementScore);
    yield takeEvery('DECREASE_LIFE_REQUESTED', decreaseLife);
    yield takeEvery('GAME_CHANGE_TIME_INTERVAL_REQUESTED', changeTimeInterval);
    yield takeEvery('GAME_CHANGE_SPAWN_INTERVAL_REQUESTED', changeSpawnInterval);
    yield takeEvery('GAME_CHANGE_LIVES_COUNT_REQUESTED', changeLivesCount);
    yield takeEvery('GAME_CHANGE_MUSIC_REQUESTED', changeMusic);
}

export default gameSaga;