import React from 'react';
import {connect} from 'react-redux';
import ButtonQuit from '../components/ButtonQuit';

const mapStateToProps = state => ({
    lives: state.game.lives,
    TIME_INTERVAL : state.game.TIME_INTERVAL,
    SPAWN_INTERVAL : state.game.SPAWN_INTERVAL
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
            backgroundColor: '#21222C',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100vw',
            height: '100vh',
            margin: 'auto',
            color: 'white'
        }}
    >
        <label htmlFor="livesInput">Time Interval : </label>
        <input id="livesInput" type="number" min={1} max={100} onInput={handleLivesCountChange.bind(this, {dispatch:dispatch})} defaultValue={lives}/>
        <label htmlFor="timeIntervalInput">Time Interval : </label>
        <input id="timeIntervalInput" type="number" min={100} max={10000} onInput={handleTimeIntervalChange.bind(this, {dispatch:dispatch})} defaultValue={TIME_INTERVAL}/>
        <label htmlFor="spawnIntervalInput">Time Interval : </label>
        <input id="spawnIntervalInput" type="number" min={100} max={10000} onInput={handleSpawnIntervalChange.bind(this, {dispatch:dispatch})} defaultValue={SPAWN_INTERVAL}/>
        <ButtonQuit onClick={() => dispatch({type: 'GAME_MAIN_MENU_REQUESTED'})}/>
    </div>
);

export default connect(mapStateToProps)(SettingsMenu);
