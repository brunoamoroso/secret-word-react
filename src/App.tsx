//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//data - Words - use open dictionary api to get
import { getRandomWord } from "./api/api";
import { xml2json } from "xml-js";

//components
import StarterScreen from "./components/StarterScreen";
import Game from "./components/Game";
import EndGame from "./components/EndGame";
import Loading from "./components/Loading";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

export interface randomWordT {
  word: string;
  def: string;
  arrLetter: string[];
}

function App() {
  const [randomWord, setRandomWord] = useState<randomWordT>({
    word: "",
    def: "",
    arrLetter: [""],
  });
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  //fetch a random word from the api
  const fetchRandomWord = useCallback(async () => {
    try {
      const fetchedWordData = await getRandomWord();
      let wordJson;
      if (fetchedWordData.xml !== undefined) {
        wordJson = JSON.parse(
          xml2json(fetchedWordData.xml, { compact: true, spaces: 2 })
        );
      }

      const newWord = wordJson.entry._attributes.id as string;
      const defWord = wordJson.entry.sense.def._text;
      const arrLetter = newWord.toUpperCase().split("");
      setRandomWord({ word: newWord, def: defWord, arrLetter: arrLetter });

      console.log(newWord);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //starts the secret word game
  const startGame = useCallback(() => {
    clearLetterStates();
    fetchRandomWord();
    setGameStage(stages[1].name);
  }, [fetchRandomWord]);

  //process the letter input
  const verifyLetter = (letter: string) => {
      const normalizedLetter = letter.toUpperCase();

      //check if lettter has already been utilized
      if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
        return;
      }

      //push guessed letter or remove a guess
      if(randomWord.arrLetter.includes(normalizedLetter)){
        setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
      }else{
        setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
        setGuesses((actualGuesses) => actualGuesses - 1);
      }
  };
  
  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //checks win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(randomWord.arrLetter)];
    
    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => (actualScore += 100));

      //restart with new word
      startGame();
    }

  }, [guessedLetters, randomWord, startGame]);

  //restart the game
  const retry = () => {
    setRandomWord({word: "", def: "", arrLetter: [""]});
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StarterScreen startGame={startGame} />}
      {gameStage === "game" && randomWord.word === "" && <Loading />}
      {gameStage === "game" && randomWord.word !== "" && (
        <Game
          verifyLetter={verifyLetter}
          randomWord={randomWord}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <EndGame retry={retry} score={score} />}
    </div>
  );
}

export default App;
