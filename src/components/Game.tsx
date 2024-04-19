import * as React from 'react';
import styles from './Game.module.css';

export interface IGameProps {
  verifyLetter: () => void
}

export default function Game ({verifyLetter}: IGameProps) {
  return (
    <div className={styles.game}>
      <span className={styles.points}>
        Pontuação: 000
      </span>

      <h1>Adivinhe a palavra: </h1>
      <h3 className={styles.tip}>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>

      <div className={styles.wordContainer}>
        <span className={styles.letter}>
          A
        </span>
        <span className={styles.blankSquare}></span>
      </div>

      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra:  </p>
        <form>
          <input type="text" name="letter" maxLength={1} required />
          <button>Jogar</button>
        </form>
      </div>

      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        <span>A,</span>
      </div>
      <button onClick={verifyLetter}>Finalizar Jogo</button>
    </div>
  );
}
