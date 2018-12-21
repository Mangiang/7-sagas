import React from 'react';
import {connect} from 'react-redux';
import ButtonStart from '../components/ButtonStart';
import ButtonSettings from '../components/ButtonSettings';

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
        <ButtonStart onClick={() => dispatch({type: 'GAME_START_REQUESTED'})}/>
        <ButtonSettings onClick={() => dispatch({type: 'GAME_SETTINGS_REQUESTED'})}/>
    </div>
);

export default connect()(MainMenu);
