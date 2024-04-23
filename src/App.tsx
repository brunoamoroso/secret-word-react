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
  const fetchRandomWord = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  //starts the secret word game
  const startGame = () => {
    fetchRandomWord();
    setGameStage(stages[1].name);
  };

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
      }

      setGuesses((actualGuesses) => actualGuesses - 1);
  };

  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      

      setGameStage(stages[2].name);
    }
  }, [guesses])

  console.log(guessedLetters);
  console.log(wrongLetters);

  //restart the game
  const retry = () => {
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
      {gameStage === "end" && <EndGame retry={retry} />}
    </div>
  );
}

export default App;
