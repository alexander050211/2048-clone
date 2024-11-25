import type { GameStatus } from '../types';
import styles from './GameResult.module.css';

type GameResultProps = {
  result: GameStatus;
  onRestart: () => void;
};

function GameResult({ result, onRestart }: GameResultProps) {
  const message = result.toString() === 'win' ? 'You Win!' : 'Game Over';

  return (
    <div className={styles.gameResult}>
      <div className={styles.overlayContent}>
        <h1>{message}</h1>
        <button onClick={onRestart}>Restart?</button>
      </div>
    </div>
  );
}

export default GameResult;
