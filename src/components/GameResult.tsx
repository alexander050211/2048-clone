import type { GameStatus } from '../types';

type GameResultProps = {
  result: GameStatus;
  onRestart: () => void;
};

function GameResult({ result, onRestart }: GameResultProps) {
  const message = result.toString() === 'win' ? 'You Win!' : 'Game Over';

  return (
    <div className="game-result">
      <div className="overlay-content">
        <h1>{message}</h1>
        <button onClick={onRestart}>Restart?</button>
      </div>
    </div>
  );
}

export default GameResult;
