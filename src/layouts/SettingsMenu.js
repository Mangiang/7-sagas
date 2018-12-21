import React from 'react';
import {connect} from 'react-redux';
import ButtonQuit from '../components/ButtonQuit';

const mapStateToProps = state => ({
    lives: state.game.lives,
    TIME_INTERVAL: state.game.TIME_INTERVAL,
    SPAWN_INTERVAL: state.game.SPAWN_INTERVAL
});

const handleTimeIntervalChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_TIME_INTERVAL_REQUESTED', newTimeInterval: parseInt(event.target.value)});
};
const handleSpawnIntervalChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_SPAWN_INTERVAL_REQUESTED', newSpawnInterval: parseInt(event.target.value)});
};
const handleLivesCountChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_LIVES_COUNT_REQUESTED', newLivesCount: parseInt(event.target.value)});
};

const SettingsMenu = ({TIME_INTERVAL, SPAWN_INTERVAL, lives, dispatch}) => (
    <div
        style={{
            position: 'fixed',
            top: '25vw',
            left: '25vw',
            width: '50vw',
            height: '50vh',
            margin: 'auto',
            color: 'white',
            display: 'block'
        }}

    >
        <label style={{marginBottom: '100px'}}>GAME SETTINGS</label>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="livesInput">Lives count : </label>
            <input id="livesInput" type="number" min={1} max={100} onInput={handleLivesCountChange.bind(this, {dispatch: dispatch})} defaultValue={lives}/>
        </div>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="timeIntervalInput">Time Interval : </label>
            <input id="timeIntervalInput" type="number" min={100} max={10000} onInput={handleTimeIntervalChange.bind(this, {dispatch: dispatch})} defaultValue={TIME_INTERVAL}/>
        </div>
        <div style={{marginBottom: '10px'}}>
            <label htmlFor="spawnIntervalInput">Spawn Interval : </label>
            <input id="spawnIntervalInput" type="number" min={100} max={10000} onInput={handleSpawnIntervalChange.bind(this, {dispatch: dispatch})} defaultValue={SPAWN_INTERVAL}/>
        </div>
        <ButtonQuit onClick={() => dispatch({type: 'GAME_MAIN_MENU_REQUESTED'})}/>
    </div>
);

export default connect(mapStateToProps)(SettingsMenu);
