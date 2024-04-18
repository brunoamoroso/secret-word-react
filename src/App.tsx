//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//data - Words - use open dictionary api to get
import { getRandomWord, WordData } from "./api/api";

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
  const [randomWord, setRandomWord] = useState<WordData>();
  const [gameStage, setGameStage ] = useState(stages[0].name);

  useEffect(() => {
    const fetchRandomWord = async () => {
      try{
        const fetchedWordData: WordData = await getRandomWord();
        setRandomWord(fetchedWordData)
      }catch(err){
        console.log(err);
      }
    }

    //on reload it returns as undefined
    fetchRandomWord(); 
  }, []);

  return (
    <div className="App">
      {gameStage === 'start' && <StarterScreen />}
      {gameStage === 'game' && <Game />}
      {gameStage === 'end' && <EndGame />}
    </div>
  );
}

export default App;
