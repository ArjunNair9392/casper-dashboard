import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
    return (
        <div className={`${styles.cardContainer}`} style={style}>
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
};

export default Card;
