import { Component } from 'react';
import type { GameState, GameCard } from "./game/types";
import './styles/App.css';
import { GameView } from "./components/GameView.tsx";

import { compareCards } from "./game/gameLogic.ts";
import { createDeck, dealCards, shuffleDeck } from "./game/deck.ts";

const INITIAL_GAME_STATE: GameState = {
    player1: { deck: [], wins: 0, takenCards: [] },
    player2: { deck: [], wins: 0, takenCards: [] },
    table: { p1Card: null, p2Card: null },
    round: 0,
    isGameOver: true,
    winner: null,
    message: "Press 'Start Game' to begin!",
    lastRoundWinner: null,
};

interface AppProps {}

interface AppState {
    playerName: string;
    nameSubmitted: boolean;
    gameState: GameState;
}

class App extends Component<AppProps, AppState> {

    state: AppState = {
        playerName: "",
        nameSubmitted: false,
        gameState: INITIAL_GAME_STATE,
    };

    startGame = () => {
        const fullDeck = shuffleDeck(createDeck());
        const shortDeck = fullDeck.slice(0, 36);
        const [p1Deck, p2Deck] = dealCards(shortDeck);

        const p1Card = p1Deck[0] || null;
        const p2Card = p2Deck[0] || null;

        const newP1Deck = p1Deck.slice(1);
        const newP2Deck = p2Deck.slice(1);

        this.setState({
            gameState: {
                player1: { deck: newP1Deck, wins: 0, takenCards: [] },
                player2: { deck: newP2Deck, wins: 0, takenCards: [] },
                table: { p1Card, p2Card },
                round: 1,
                isGameOver: false,
                winner: null,
                message: `Round 1. Press 'Play Round'`,
                lastRoundWinner: null,
            }
        });
    };

    playRound = () => {
        const { gameState, playerName } = this.state;
        const { player1, player2, table, round } = gameState;

        const p1CardOnTable = table.p1Card;
        const p2CardOnTable = table.p2Card;

        if (!p1CardOnTable || !p2CardOnTable) return;

        let newP1Deck = [...player1.deck];
        let newP2Deck = [...player2.deck];

        const newP1TakenCards = [...player1.takenCards];
        const newP2TakenCards = [...player2.takenCards];

        let p1Wins = player1.wins;
        let p2Wins = player2.wins;

        const result = compareCards(p1CardOnTable, p2CardOnTable);
        const cardsToCollect = [p1CardOnTable, p2CardOnTable];

        let lastRoundWinner: 'player1' | 'player2' | 'draw' | null = null;

        if (result === 1) {
            newP1TakenCards.push(...cardsToCollect);
            p1Wins += 1;
            lastRoundWinner = 'player1';
        } else if (result === 2) {
            newP2TakenCards.push(...cardsToCollect);
            p2Wins += 1;
            lastRoundWinner = 'player2';
        } else {
            lastRoundWinner = 'draw';
        }

        let gameWinner: 'player1' | 'player2' | 'draw' | null = null;
        let isGameOver = false;

        const canP1DrawNext = newP1Deck.length > 0;
        const canP2DrawNext = newP2Deck.length > 0;

        if (!canP1DrawNext && !canP2DrawNext) {
            isGameOver = true;
        }

        if (isGameOver) {
            const p1TakenCount = newP1TakenCards.length;
            const p2TakenCount = newP2TakenCards.length;

            if (p1TakenCount > p2TakenCount) gameWinner = 'player1';
            else if (p2TakenCount > p1TakenCount) gameWinner = 'player2';
            else gameWinner = 'draw';
        }

        let p1NextCard: GameCard | null = null;
        let p2NextCard: GameCard | null = null;
        let nextMessage: string;

        const name = playerName || "YOU";

        if (isGameOver) {
            const winnerName =
                gameWinner === 'player1'
                    ? name
                    : gameWinner === 'player2'
                        ? 'COMPUTER'
                        : 'DRAW';

            const p1TakenCount = newP1TakenCards.length;
            const p2TakenCount = newP2TakenCards.length;

            nextMessage = `${winnerName} WINS! Final Score: ${p1TakenCount} - ${p2TakenCount}`;
        } else {
            p1NextCard = newP1Deck[0] || null;
            p2NextCard = newP2Deck[0] || null;

            newP1Deck = newP1Deck.slice(1);
            newP2Deck = newP2Deck.slice(1);

            nextMessage = `Round ${round + 1}. Press 'Play Round'`;
        }

        const nextRoundValue = isGameOver ? round : round + 1;

        this.setState({
            gameState: {
                player1: { deck: newP1Deck, wins: p1Wins, takenCards: newP1TakenCards },
                player2: { deck: newP2Deck, wins: p2Wins, takenCards: newP2TakenCards },
                table: { p1Card: p1NextCard, p2Card: p2NextCard },
                round: nextRoundValue,
                isGameOver,
                winner: gameWinner,
                message: nextMessage.trim(),
                lastRoundWinner: lastRoundWinner,
            }
        });
    };

    render() {
        const { gameState, playerName, nameSubmitted } = this.state;
        const name = playerName || "YOU";

        return (
            <div className="app">
                <h1>War Card Game</h1>

                {!nameSubmitted ? (
                    <div style={{ marginBottom: "20px" }}>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e) => this.setState({ playerName: e.target.value })}
                        />
                        <button
                            onClick={() => this.setState({ nameSubmitted: true })}
                            style={{ marginLeft: "10px" }}
                            disabled={!playerName.trim()}
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <GameView
                        gameState={gameState}
                        playerName={name}
                        startGame={this.startGame}
                        playRound={this.playRound}
                    />
                )}
            </div>
        );
    }
}

export default App;
