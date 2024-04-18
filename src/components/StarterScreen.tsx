import * as React from "react";
import styles from "./StarterScreen.module.css";

interface IStarterScreenProps {
  startGame: () => void
}

export default function StarterScreen({startGame}: IStarterScreenProps) {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
}
