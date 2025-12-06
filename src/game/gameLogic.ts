
import type { GameCard } from "./types";


export function compareCards(card1: GameCard, card2: GameCard): 1 | 2 | 0 {
    if (card1.value > card2.value) {
        return 1;
    }
    if (card2.value > card1.value) {
        return 2;
    }
    return 0;
}