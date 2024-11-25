import type { GameStatus } from '../types';
import styles from './GameResult.module.css';

type GameResultProps = {
  result: GameStatus;
  continues: boolean;
  onRestart: () => void;
  onContinue: () => void;
};

function GameResult({
  result,
  continues,
  onRestart,
  onContinue,
}: GameResultProps) {
  const message = result.toString() === 'win' ? 'You Win!' : 'Game Over';

  return (
    <div className={styles.gameResult}>
      <div className={styles.overlayContent}>
        <h1>{message}</h1>
        <div className={styles.buttonGroup}>
          {result === 'win' && !continues && (
            <button onClick={onContinue} className={styles.continueButton}>
              Keep Playing
            </button>
          )}
          <button onClick={onRestart} className={styles.restartButton}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
