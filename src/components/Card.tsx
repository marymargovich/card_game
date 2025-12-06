

import React from "react";
import '../styles/Card.css';
import type {GameCard} from '../game/types.ts';

interface CardProps {
    card: GameCard | null;

    isWinner?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isWinner = false }) => {

    if (!card) {

        return <div className="card card-back"></div>;
    }


    const cardClassName = `card ${isWinner ? 'card-winner' : ''}`;

    // data-card-id к будущим картинкам
    return (
        <div className={cardClassName} data-card-id={card.id}>

            {`${card.rank}${card.suit}`}
        </div>
    );
};