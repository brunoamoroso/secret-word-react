import * as React from 'react';
import styles from './EndGame.module.css';

export interface IEndGameProps {
  retry: () => void
}

export default function EndGame ({retry}: IEndGameProps) {
  return (
    <div>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
}
