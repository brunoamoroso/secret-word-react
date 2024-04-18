import * as React from 'react';
import styles from './Game.module.css';

export interface IGameProps {
  verifyLetter: () => void
}

export default function Game ({verifyLetter}: IGameProps) {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={verifyLetter}>Finalizar Jogo</button>
    </div>
  );
}
