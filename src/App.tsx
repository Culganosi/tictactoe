import { useEffect, useState } from "react";
import "./index.css";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const game_state_start = ["", "", "", "", "", "", "", "", ""];
const win_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const initial_score: Scores = { X: 0, O: 0 };

function App() {
  const [gameState, setGameState] = useState(game_state_start);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(initial_score);

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleWin = () => {
    window.alert(`You win! ${currentPlayer}`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    resetGame();
  };

  const handleDraw = () => {
    window.alert(`Draw! Play again!`);
    resetGame();
  };

  const resetGame = () => setGameState(game_state_start);

  const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < win_conditions.length; i++) {
      const win = win_conditions[i];

      let a = gameState[win[0]];
      let b = gameState[win[1]];
      let c = gameState[win[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);

      return;
    }
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }
    changePlayer();
  };

  useEffect(() => {
    if (gameState === game_state_start) {
      return;
    }
    checkWinner();
  }, [gameState]);

  const handleClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="h-screen p-8 text-slate-800 bg-gradient-to-r from-cyan-500">
      <h1 className="text-center text-4xl text-yellow-500 font-Fredoka-One mb-10">
        Tic Tac Toe
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square key={index} onClick={handleClick} {...{ index, player }} />
          ))}
        </div>
        <div className="mx-auto w-96 text-2xl font-Fredoka-One">
          <p className="text-white mt-5">
            Next Player:<span>{currentPlayer}</span>
          </p>
          <p className="text-white mt-5">
            Player X wins:<span>{scores["X"]}</span>
          </p>
          <p className="text-white mt-5">
            Player O wins:<span>{scores["O"]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
