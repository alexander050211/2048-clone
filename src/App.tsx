import './App.css';

import React, { useEffect, useState } from 'react';

import Board from './components/Board';
import GameResult from './components/GameResult';
import Restart from './components/Restart';
import Score from './components/ScoreBoard';
import { initBoard } from './MoveLogic';
import type { BoardType, GameStatus } from './types';


function App() {
  const [board, setBoard] = useState<BoardType>([]);
  const [score, setScore] = useState<number>(0);
  const [bestScore] = useState<number>(0);
  const [result, setResult] = useState<GameStatus>('playing');

  function initGame() {
    const newBoard = initBoard();
    setBoard(newBoard);
    setScore(0);
    setResult('playing');
  }

  useEffect(() => {
    initGame();
    
  }, []);

  return (
    <div className='app'>
      <h1>128 Game</h1>
      <Score score={score} bestScore={bestScore}/>
      <Board board={board} />
      <Restart onRestart={initGame}/>
      {result !== 'playing' && (
        <GameResult result={result} onRestart={initGame} />
       )}
    </div>
  );
}

export default App;
