//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//data - Words - use open dictionary api to get
import { getRandomWord, WordData } from "./api/api";
import { xml2json } from "xml-js";

//components
import StarterScreen from "./components/StarterScreen";
import Game from "./components/Game";
import EndGame from "./components/EndGame";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [randomWord, setRandomWord] = useState<{word: string; def: string; arrLetter: string[]}>();
  const [gameStage, setGameStage ] = useState(stages[0].name);

  //fetch a random word from the api
  const fetchRandomWord = async () => {
    try{
      const fetchedWordData = await getRandomWord();
      const wordJson = JSON.parse(xml2json(fetchedWordData.xml, {compact:true, spaces: 2}));
      const newWord = wordJson.entry._attributes.id as string;
      const defWord = wordJson.entry.sense.def._text;
      const arrLetter = newWord.toUpperCase().split("");
      setRandomWord({word: newWord, def: defWord, arrLetter: arrLetter});
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRandomWord();
  }, []);

  //starts the secret word game
  const startGame = () => {
    console.log(randomWord);
    if(randomWord?.word !== undefined){
      fetchRandomWord();
    }
    setGameStage(stages[1].name);
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  //restart the game
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StarterScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <EndGame retry={retry}/>}
    </div>
  );
}

export default App;
