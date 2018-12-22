import React from 'react';
import {connect} from 'react-redux';
import Button from '../components/Button';

const mapStateToProps = state => ({
    lives: state.game.lives,
    TIME_INTERVAL: state.game.TIME_INTERVAL,
    SPAWN_INTERVAL: state.game.SPAWN_INTERVAL
});

const handleTimeIntervalChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_TIME_INTERVAL_REQUESTED', newTimeInterval: parseInt(event.target.value * 1000)});
};
const handleSpawnIntervalChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_SPAWN_INTERVAL_REQUESTED', newSpawnInterval: parseInt(event.target.value * 1000)});
};
const handleLivesCountChange = (dispatchObject, event) => {
    dispatchObject.dispatch({type: 'GAME_CHANGE_LIVES_COUNT_REQUESTED', newLivesCount: parseInt(event.target.value)});
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
        <Button style={{marginUp: '30px'}} text={"Main Menu"} onClick={() => dispatch({type: 'GAME_MAIN_MENU_REQUESTED'})}/>
    </div>
);

export default connect(mapStateToProps)(SettingsMenu);
