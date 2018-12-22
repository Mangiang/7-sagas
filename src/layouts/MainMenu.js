import React from 'react';
import {connect} from 'react-redux';

import Button from '../components/Button';

const MainMenu = ({dispatch}) => (
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
            margin: 'auto'
        }}
    >
        <Button text={"Start"} backgroundColor={"#4BE072"} onClick={() => dispatch({type: 'GAME_START_REQUESTED'})}/>
        <Button text={"Start with music"} top={"220px"} backgroundColor={"#3a90e0"} onClick={() => dispatch({type: 'GAME_CHOOSE_MUSIC_REQUESTED'})}/>
        <Button text={"Settings"} top={"440px"} backgroundColor={"#e0a342"} onClick={() => dispatch({type: 'GAME_SETTINGS_REQUESTED'})}/>
    </div>
);

export default connect()(MainMenu);
