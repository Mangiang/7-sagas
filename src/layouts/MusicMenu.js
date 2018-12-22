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
