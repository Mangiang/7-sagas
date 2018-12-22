import React from 'react';
import {connect} from 'react-redux';
import ButtonQuit from '../components/ButtonQuit';

import {process} from '../utils/audioProcessing';

const mapStateToProps = state => ({
    lives: state.game.lives,
    TIME_INTERVAL: state.game.TIME_INTERVAL,
    SPAWN_INTERVAL: state.game.SPAWN_INTERVAL
});

const handleTimeIntervalChange = (dispatchObject, event) => {
    handleMusicChange();
    dispatchObject.dispatch({type: 'GAME_CHANGE_TIME_INTERVAL_REQUESTED', newTimeInterval: parseInt(event.target.value * 1000)});
};
const handleSpawnIntervalChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_SPAWN_INTERVAL_REQUESTED', newSpawnInterval: parseInt(event.target.value * 1000)});
};
const handleLivesCountChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_LIVES_COUNT_REQUESTED', newLivesCount: parseInt(event.target.value)});
};

const handleMusicChange = (dispatchObject, event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    var context = new(window.AudioContext || window.webkitAudioContext)();
    reader.onload = function() {
        context.decodeAudioData(reader.result, function(buffer) {
            prepare(buffer);
        });
    };
    reader.readAsArrayBuffer(file);
};

function prepare(buffer) {
    var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    console.log(buffer.sampleRate);
    console.log(buffer.length);
    console.log(Math.floor(buffer.length/buffer.sampleRate));
    console.log(buffer.sampleRate/buffer.sampleRate);
    var source = offlineContext.createBufferSource();
    source.buffer = buffer;
    var filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering();
    offlineContext.oncomplete = function(e) {
        let [data, threshold] = process(e);
        let circle = document.getElementById("circleSVG");
        //threshold = 0.006;
        let context =new AudioContext();
        let src = context.createBufferSource();
        src.buffer = e.renderedBuffer;
        src.connect(context.destination);
        let sampleLoop = 8;
        let intervalStep = buffer.sampleRate/sampleLoop;
        src.start(0);
        //data = buffer.getChannelData(0);
        console.log(data);
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
        }, 1000/sampleLoop);
    };
}


const SettingsMenu = ({TIME_INTERVAL, SPAWN_INTERVAL, lives, dispatch}) => (
    <div
        style={{
            position: 'fixed',
            top: '25vw',
            left: 0,
            right: 0,
            width: '300px',
            height: '50vh',
            margin: 'auto',
            color: 'white',
            display: 'block'
        }}

    >
        <input type={'file'} accept="audio/*" onInput={handleMusicChange.bind(this, {dispatch: dispatch})}/>
        <svg height="400" width="400">
            <circle id="circleSVG" cx="100" cy="100" r="40" stroke="black" strokeWidth="3" fill="red" />
        </svg>
        <canvas id="canvas" width="500" height="256"/>
        <label style={{marginBottom: '100px'}}>GAME SETTINGS</label>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="livesInput">Lives count : </label>
            <input id="livesInput" type="number" min={1} max={100} onInput={handleLivesCountChange.bind(this, {dispatch: dispatch})} defaultValue={lives}/>
        </div>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="timeIntervalInput">Time Interval : </label>
            <input style={{width: '50px'}} id="timeIntervalInput" type="number" min={0.01} max={10} onInput={handleTimeIntervalChange.bind(this, {dispatch: dispatch})}
                   defaultValue={TIME_INTERVAL / 1000}/>
            <label> seconds.</label>
        </div>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="spawnIntervalInput">Spawn Interval : </label>
            <input style={{width: '50px'}} id="spawnIntervalInput" type="number" min={0.01} max={10} onInput={handleSpawnIntervalChange.bind(this, {dispatch: dispatch})}
                   defaultValue={SPAWN_INTERVAL / 1000}/>
            <label> seconds.</label>
        </div>
        <ButtonQuit style={{marginUp: '30px'}} onClick={() => dispatch({type: 'GAME_MAIN_MENU_REQUESTED'})}/>
    </div>
);

export default connect(mapStateToProps)(SettingsMenu);
