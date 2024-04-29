import { FormEvent, useRef, useState } from "react";
import styles from "./Game.module.css";
import { randomWordT } from "../App";

export interface IGameProps {
  verifyLetter: (letter: string) => void;
  randomWord: randomWordT;
  guessedLetters: string[];
  wrongLetters: string[];
  guesses: number;
  score: number;
}

export default function Game({
  verifyLetter,
  randomWord,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}: IGameProps) {
  ("");
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    if(letterInputRef.current){
      letterInputRef.current.focus();
    }
  };

  return (
    <div className={styles.game}>
      <span className={styles.points}>Pontuação: {score}</span>

      <h1>Adivinhe a palavra: </h1>
      <h3 className={styles.tip}>
        Dica sobre a palavra: <span>{randomWord.def}</span>
      </h3>

      <span>Você ainda tem {guesses} tentativas</span>

      <div className={styles.wordContainer}>
        {randomWord.arrLetter.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}>
              {" "}
            </span>
          )
        )}
      </div>

      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>

      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
}
