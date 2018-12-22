import React from 'react';
import {connect} from 'react-redux';
import ButtonQuit from '../components/ButtonQuit';

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
    let files = event.target.files;


    let audio = new Audio();
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    let analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var distortion = context.createWaveShaper();
    var gainNode = context.createGain();
    var biquadFilter = context.createBiquadFilter();
    var convolver = context.createConvolver();
    analyser.connect(distortion);
    distortion.connect(biquadFilter);
    biquadFilter.connect(convolver);
    convolver.connect(gainNode);
    gainNode.connect(context.destination);

    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.setValueAtTime(1000, context.currentTime);
    biquadFilter.gain.setValueAtTime(25, context.currentTime);

    let bufferLength = analyser.frequencyBinCount;

    var canvasWidth = 500;
    var canvasHeight = 256;
    var ctx = document.getElementById('canvas').getContext('2d');

    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;

    let volume = 0;
    let streamData = new Uint8Array(bufferLength);
    var sampleAudioStream = function () {
        // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
        // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
        // continue to give real-time data on the audio stream.
        analyser.getByteFrequencyData(streamData);
        // calculate an overall volume value
        var total = 0;
        let minBins = 40;
        let maxBins = 120;
        for (let i = minBins; i < maxBins; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += streamData[i];
        }
        volume = total;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        var largeurBarre = (canvasWidth / bufferLength) * 2.5;
        var hauteurBarre;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {
            hauteurBarre = streamData[i];

            ctx.fillStyle = 'rgb(' + (hauteurBarre+100) + ',50,50)';
            ctx.fillRect(x,canvasHeight-hauteurBarre/2,largeurBarre,hauteurBarre/2);

            x += largeurBarre + 1;
        }
    };
    setInterval(sampleAudioStream, 20);
    audio.onended = function () {
        window.clearInterval();
    };


    //audio.playbackRate = 16;
    audio.playbackRate = 1;
    audio.play();
};

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
