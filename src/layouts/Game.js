import React from 'react';
import {connect} from 'react-redux';
import Target from '../components/Target';
import Info from '../components/Info';
import ButtonStart from '../components/ButtonStart';

// FIXME: maybe, do something about this ?
const mapStateToProps = state => ({
    lives: state.game.lives,
    score: state.game.score,
    isStarted: state.game.isStarted,
    targetsList: state.targets.targetsList
});

const GameLayout = ({isStarted, lives, score, targetsList, dispatch}) => (
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
            [<Info lives={lives} score={score}/>,
                targetsList.map((target) => {
                    return <Target x={target.x} y={target.y} value={target.value}/>
                })
            ]
        ) : (
            <ButtonStart onClick={() => dispatch({type: 'GAME_START_REQUESTED'})}/>
        )}
    </div>
);

export default connect(mapStateToProps)(GameLayout);
