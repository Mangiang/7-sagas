import React from 'react';
import {connect} from 'react-redux';
import Target from '../components/Target';
import Info from '../components/Info';
import ButtonStop from '../components/ButtonStop';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';

// FIXME: maybe, do something about this ?
const mapStateToProps = state => ({
    lives: state.game.lives,
    score: state.game.score,
    isStarted: state.game.isStarted,
    inSettingsMenu: state.game.inSettingsMenu,
    targetsList: state.targets.targetsList
});

const GameLayout = ({isStarted, inSettingsMenu, lives, score, targetsList, dispatch}) => (
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
        {isStarted ? (
            <React.Fragment>
                <Info lives={lives} score={score}/>
                {targetsList.map((target) => (<Target
                    key={target.id}
                    x={target.x}
                    y={target.y}
                    value={target.value}
                    backgroundColor={target.backgroundColor}
                    onClick={() => dispatch({
                        type: 'TARGET_DESTROYED_REQUESTED',
                        targetId: target.id
                    })}/>))}
                <ButtonStop onClick={() => dispatch({type: 'GAME_STOP_REQUESTED'})}/>
            </React.Fragment>
        ) : (
            <React.Fragment>
                {inSettingsMenu ?
                    (<SettingsMenu/>) : (<MainMenu/>)
                }
            </React.Fragment>)}
    </div>
);

export default connect(mapStateToProps)(GameLayout);
