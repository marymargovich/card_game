


export type Suit = "♠" | "♥" | "♦" | "♣";

// Интерфейс для одной карты
export interface GameCard {
    suit: Suit;
    rank: string;
    value: number;
    id: string;
}

// Тип для колоды
export type Deck = GameCard[];

// Интерфейс для состояния игрока
export interface PlayerState {
    deck: Deck;
    wins: number;
    takenCards: Deck;
}

// Интерфейс для состояния стола
export interface TableState {
    p1Card: GameCard | null;
    p2Card: GameCard | null;
}

// Главный интерфейс для всего состояния игры
export interface GameState {
    player1: PlayerState;
    player2: PlayerState;
    table: TableState;
    round: number;
    isGameOver: boolean;
    winner: 'player1' | 'player2' | null;
    message: string;
    lastRoundWinner: 'player1' | 'player2' | 'draw' | null;
}