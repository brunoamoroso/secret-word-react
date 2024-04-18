import * as React from "react";
import styles from "./StarterScreen.module.css";

export interface IStarterScreenProps {}

export default function StarterScreen(props: IStarterScreenProps) {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button>Começar o jogo</button>
    </div>
  );
}
