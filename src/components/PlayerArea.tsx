import React from 'react';
import type { PlayerState } from '../game/types';
import '../styles/PlayerArea.css';

interface PlayerAreaProps {
    name: string;
    player: PlayerState;

}


export const PlayerArea: React.FC<PlayerAreaProps> = ({ name, player }) => {

    const cardCount = player.deck.length;


    return (
        <div className="player-area">
            <h3>{name}</h3>

            <div className="deck-count">
                Cards in Deck: {cardCount}
            </div>

            <div className="deck-stack">

                {cardCount > 0 ? (

                    <div className="card card-back"></div>
                ) : (

                    <div className="card card-empty"></div>
                )}
            </div>


            <div className="player-score">
                Rounds Won: {player.wins}
            </div>

        </div>
    );
};