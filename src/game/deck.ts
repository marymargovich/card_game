

// Константы для создания колоды
import type {GameCard} from "./types.ts";

export const SUITS = ["♠", "♥", "♦", "♣"];
export const RANKS = [
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "J", value: 11 },
    { name: "Q", value: 12 },
    { name: "K", value: 13 },
    { name: "A", value: 14 },
];

// Создание колоды
export function createDeck(): GameCard[] {
    const deck: GameCard[] = [];
    for (const suit of SUITS) {
        for (const r of RANKS) {
            deck.push({
                suit: suit as GameCard["suit"],
                rank: r.name,
                value: r.value,
                id: `${r.name}${suit}`,
            });
        }
    }
    return deck;
}

//перемешивание
export function shuffleDeck(deck: GameCard[]): GameCard[] {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}

// Раздача карт
export function dealCards(deck: GameCard[]): [GameCard[], GameCard[]] {
    const midPoint = Math.ceil(deck.length / 2);
    const player1Deck = deck.slice(0, midPoint);
    const player2Deck = deck.slice(midPoint);
    return [player1Deck, player2Deck];
}