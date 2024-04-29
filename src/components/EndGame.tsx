import styles from './EndGame.module.css';

export interface IEndGameProps {
  retry: () => void;
  score: number;
}

export default function EndGame ({retry, score}: IEndGameProps) {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2 className={styles.score}>Sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
}
