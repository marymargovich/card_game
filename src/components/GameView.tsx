import React from 'react';
import type { GameState } from '../game/types';
import { PlayerArea } from './PlayerArea.tsx';
import { TableArea } from './TableArea.tsx';


interface GameViewProps {
    gameState: GameState;
    playerName: string;
    startGame: () => void;
    playRound: () => void;
}

export const GameView: React.FC<GameViewProps> = ({ gameState, playerName, startGame, playRound }) => {

    const p1 = gameState.player1;
    const name = playerName;

    return (
        <div className="game-container">

            {gameState.isGameOver && gameState.winner !== null && (
                <div className="game-over-overlay">
                    <div className="game-over-box">
                        <h2>{gameState.message}</h2>
                        <button onClick={startGame}>Play Again</button>
                    </div>
                </div>
            )}

            <div className="game-layout">

                {/* PLAYER 1 (Человек) */}
                <PlayerArea
                    name={name}
                    player={p1}
                />

                <div className="center-area">
                    <TableArea
                        p1Card={gameState.table.p1Card}
                        p2Card={gameState.table.p2Card}
                        message={gameState.message}
                        lastRoundWinner={gameState.lastRoundWinner}
                    />


                    <div className="score-spacer"></div>

                    <div className="button-area">
                        {gameState.isGameOver ? (
                            <button onClick={startGame}>Start New Game</button>
                        ) : (
                            <button
                                onClick={playRound}
                                disabled={!gameState.table.p1Card || !gameState.table.p2Card}
                            >
                                Play Round
                            </button>
                        )}
                    </div>
                </div>


                <PlayerArea
                    name="COMPUTER"
                    player={gameState.player2}
                    isComputer={true}
                />
            </div>
        </div>
    );
};