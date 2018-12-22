import {delay} from 'redux-saga';
import {takeEvery, call, select, put} from 'redux-saga/effects';
import {process} from '../utils/audioProcessing';

function* startGame() {
    yield put({type: 'GAME_START'});
    yield put({type: 'TARGET_DECREMENT_BEGIN'});

    const spawnInterval = yield select(state => state.game.SPAWN_INTERVAL);

    while (true) {
        const stopRequested = yield select(state => state.game.stopRequested);
        if (stopRequested) {
            yield put({type: 'TARGET_CLEAR_ALL_REQUESTED'});
            yield put({type: 'GAME_STOP_APPLY'});
            break;
        }

        yield call(delay, spawnInterval);
        const score = yield select(state => state.game.score);


        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 70) + 10;

        yield put({type: 'TARGET_SPAWN',x,y});

        if (score >= 5 && score < 15)
            yield put({type: 'TARGET_SPAWN',x,y});

        if (score >= 15)
            yield put({type: 'TARGET_SPAWN',x,y});
    }
}

function* startMusic() {

    let context = new AudioContext();
    let src = context.createBufferSource();

    const buffer = yield select(state => state.game.music);

    const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    const filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    let renderEvent = null;

    offlineContext.oncomplete = (e) => {
        renderEvent = e;
    };
    offlineContext.startRendering();

    while (!renderEvent)
    {
        yield call(delay, 100);
    }
    const [data, threshold] = process(renderEvent);

    src.buffer = buffer;
    src.connect(context.destination);
    let sampleLoop = 8;
    let intervalStep = src.buffer.sampleRate / sampleLoop;
    yield put({type: 'GAME_CHANGE_MUSIC_CONTEXT', ctx: context, src: src});
    yield put({type: 'GAME_START_MUSIC'});

    src.start(0);
    let dataLengthCheck = src.buffer.sampleRate;
    let mod = 0;
    let countLoop = 0;

    yield put({type: 'TARGET_DECREMENT_BEGIN_REQUESTED', needDeltaTime: true});
    let lastTargetx = null;
    let lastTargety = null;
    const factorArray = [-1, 1];

    while (true) {
        const stopRequested = yield select(state => state.game.stopRequested);
        if (stopRequested) {
            yield put({type: 'TARGET_CLEAR_ALL_REQUESTED'});
            yield put({type: 'GAME_STOP_APPLY'});
            break;
        }

        yield call(delay, 1000 / sampleLoop);

        countLoop++;
        if (dataLengthCheck < data.length)
            dataLengthCheck += intervalStep;
        else {
            yield put({type: 'TARGET_CLEAR_ALL'});
            yield put({type: 'GAME_STOP_APPLY'});
            break;
        }

        let currentIdx = context.currentTime * data.length / (buffer.length / buffer.sampleRate);

        let sum = 0;
        for (let t = Math.round(currentIdx - intervalStep); t < Math.round(currentIdx + intervalStep); t++) {
            if (t > 0)
                sum += data[t];
        }
        let avgAmp = sum / (intervalStep);

        if (mod) {
            if (avgAmp > threshold) {
                let x, y;
                if (!lastTargetx || !lastTargety) {
                    x = Math.floor(Math.random() * 80) + 10;
                    y = Math.floor(Math.random() * 70) + 10;
                }
                else {
                        const angle = Math.random() * Math.PI * 2;
                        const factor = factorArray[Math.floor(Math.random() * factorArray.length)];
                        x = lastTargetx + factor * Math.cos(angle) * 10;
                        y = lastTargety + factor *  Math.sin(angle) * 10;

                        if (x < 10) x = 10;
                        else if (x > 90) x = 90;
                        if (y < 10) y = 10;
                        else if (y > 70) y = 70;
                }
                lastTargetx = x;
                lastTargety = y;
                yield put({type: 'TARGET_SPAWN_CONTROLLED', x:x, y:y});
            }
        }

        mod = countLoop % 2;
    }
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