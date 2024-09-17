import './App.css';

import React, { useState } from 'react';

import Board from './components/Board';
import GameResult from './components/GameResult';
import Restart from './components/Restart';
import Score from './components/ScoreBoard';
import type { BoardType, GameStatus } from './types';


function App() {
  const [board] = useState<BoardType>([]);
  const [score, setScore] = useState<number>(0);
  const [bestScore] = useState<number>(0);
  const [result, setResult] = useState<GameStatus>('playing');

  function initGame() {

    setScore(0);
    setResult('playing');
  }

  return (
    <div className='app'>
      <h1>2048(128) Game</h1>
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
