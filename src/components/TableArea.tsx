import React from 'react';
import { Card } from './Card.tsx';
import '../styles/TableArea.css';
import type {GameCard} from "../game/types.ts";

interface TableAreaProps {
    p1Card: GameCard | null;
    p2Card: GameCard | null;
    message: string;
    lastRoundWinner: 'player1' | 'player2' | 'draw' | null;
}

export const TableArea: React.FC<TableAreaProps> =
    ({p1Card, p2Card, message,}) => {


    const p1SlotClasses = `table-slot`;
    const p2SlotClasses = `table-slot`;

    return (
        <div className="table-container">

            <div className="round-message">
                {message}
            </div>

            <div className="cards-row">

                <div className={p1SlotClasses}>
                    {p1Card && (
                        <Card card={p1Card} />
                    )}
                </div>

                <div className={p2SlotClasses}>
                    {p2Card && (
                        <Card card={p2Card} />
                    )}
                </div>
            </div>

        </div>
    );
};