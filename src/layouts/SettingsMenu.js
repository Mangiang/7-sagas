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

    let bufferLength = analyser.frequencyBinCount;

    var canvasWidth = 1200;
    var canvasHeight = 256;
    var ctx = document.getElementById('canvas').getContext('2d');

    let volume = 0;
    let streamData = new Uint8Array(128);
    var sampleAudioStream = function () {
        // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
        // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
        // continue to give real-time data on the audio stream.
        analyser.getByteFrequencyData(streamData);
        // calculate an overall volume value
        var total = 0;
        for (let i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += streamData[i];
        }
        volume = total;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        for(let bin = 0; bin < streamData.length; bin ++) {
            // do something with each value. Here's a simple example
            var val = streamData[bin];
            var red = val;
            var green = 255 - val;
            var blue = val / 2;
            ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
            ctx.fillRect(bin * 2, 0, 2, 200);
            // use lines and shapes to draw to the canvas is various ways. Use your imagination!
        }
    };
    setInterval(sampleAudioStream, 20);

    let analyseArray = [];
    /*window.setInterval(function () {
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
            if (dataArray[i] !== 128) {
                analyseArray.push(dataArray);
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                ctx.fillStyle = 'rgb(200, 200, 200)';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgb(0, 0, 0)';
                ctx.beginPath();
                let sliceWidth = canvasWidth / bufferLength;
                var x = 0;
                /*for (let i = 0; i < dataArray.length; i++) {
                    var value = dataArray[i] / 256;
                    var y = canvasHeight - (canvasHeight * value) - 1;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(i, y, 1, 1);
                }
                /*for(let i = 0; i < bufferLength; i++) {

                    let v = dataArray[i] / 128.0;
                    let y = v * canvasHeight/2;

                    if(i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }
                ctx.lineTo(ctx.width, ctx.height/2);
                ctx.stroke();
                for (let bin = 0; bin < streamData.length; bin++) {
                    // do something with each value. Here's a simple example
                    var val = streamData[bin];
                    var red = val;
                    var green = 255 - val;
                    var blue = val / 2;
                    ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
                    ctx.fillRect(bin * 2, 0, 2, 200);
                    // use lines and shapes to draw to the canvas is various ways. Use your imagination!
                }

                break;
            }
        }
    }, 50);*/

    audio.onended = function () {
        window.clearInterval();
        audio.playbackRate = 1;
        audio.play();
        /*console.log(analyseArray);
        var count = 0;
        window.setInterval(function () {
            const arr = analyseArray[count];
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            for (let i = 0; i < arr.length; i++) {
                var value = arr[i] / 256;
                var y = canvasHeight - (canvasHeight * value) - 1;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(i, y, 1, 1);
            }
            count++;
        }, 500);*/
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
        <canvas id="canvas" width="1200" height="256"/>
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
