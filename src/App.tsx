import { useEffect, useState } from 'react';

import styles from './App.module.css';
import Board from './components/Board';
import GameResult from './components/GameResult';
import Restart from './components/Restart';
import Score from './components/ScoreBoard';
import { initBoard, moveBoard } from './MoveLogic';
import type { BoardType, Direction, GameStatus } from './types';

function App() {
  const [board, setBoard] = useState<BoardType>(initBoard());
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() =>
    Number(localStorage.getItem('bestScore') ?? 0),
  );
  const [result, setResult] = useState<GameStatus>('playing');

  function initGame() {
    const newBoard = initBoard();
    setBoard(newBoard);
    setScore(0);
    setResult('playing');
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (result !== 'playing') return;
    let direction: Direction | undefined;

    switch (e.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      default:
        return;
    }

    const { newBoard, moved, gainedScore, gameOver, gameWon } = moveBoard(
      board,
      direction,
    );
    if (moved) {
      setBoard(newBoard);
      setScore((prevScore) => {
        const updatedScore = prevScore + gainedScore;
        if (updatedScore > bestScore) {
          setBestScore(updatedScore);
          localStorage.setItem('bestScore', updatedScore.toString());
        }
        return updatedScore;
      });
      if (gameWon) {
        setResult('win');
      } else if (gameOver) {
        setResult('loss');
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>128 Game</div>
      <Score score={score} bestScore={bestScore} />
      <Board board={board} />
      <Restart onRestart={initGame} />
      {result !== 'playing' && (
        <GameResult result={result} onRestart={initGame} />
      )}
    </div>
  );
}

export default App;
