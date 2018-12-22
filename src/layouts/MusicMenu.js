import React from 'react';
import {connect} from 'react-redux';
import Button from '../components/Button';

const mapStateToProps = state => ({
    music: state.game.music
});

const handleMusicChange = (dispatchObject, event) => {
    const file = event.target.files[0];
    if (file)
        document.getElementById('audio').src = URL.createObjectURL(file);
    var reader = new FileReader();
    var context = new (window.AudioContext || window.webkitAudioContext)();
    reader.onload = function () {
        context.decodeAudioData(reader.result, function (buffer) {
            dispatchObject.dispatch({type: 'GAME_CHANGE_MUSIC_REQUESTED', music: buffer});
        });
    };
    reader.readAsArrayBuffer(file);
    /*
    var reader = new FileReader();
    var context = new(window.AudioContext || window.webkitAudioContext)();
    reader.onload = function() {
        context.decodeAudioData(reader.result, function(buffer) {
            prepare(buffer);
        });
    };
    reader.readAsArrayBuffer(file);


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
    */
};


const SettingsMenu = ({music, dispatch}) => (
    <div
        style={{
            position: 'fixed',
            top: '25vh',
            left: 0,
            right: 0,
            width: '50vw',
            height: '50vh',
            margin: 'auto',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }}

    >
        <label style={{marginBottom: '20px'}}>GAME MUSIC</label>
        <div>
            <label htmlFor={'musicInput'}>Choose a music to analyse : </label>
            <input id="musicInput" style={{marginBottom: '50px'}} type={'file'} accept="audio/mpeg" onInput={handleMusicChange.bind(this, {dispatch: dispatch})}/>
        </div>
        <audio id={'audio'} controls="controls">
            Your browser does not support the &lt;audio&gt; tag.
        </audio>
        <Button disabled={music == null} position={'relative'} style={{marginUp: '30px'}} backgroundColor={'#4BE072'}
                text={music == null ? 'Need a music' : 'Start'}
                onClick={() => dispatch({type: 'GAME_MUSIC_START_REQUESTED'})}/>
        <Button position={'relative'} style={{marginUp: '30px'}} text={'Main Menu'} onClick={() => dispatch({type: 'GAME_MAIN_MENU_REQUESTED'})}/>
    </div>
);

export default connect(mapStateToProps)(SettingsMenu);
