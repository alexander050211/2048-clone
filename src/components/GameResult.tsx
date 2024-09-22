import type { GameStatus } from '../types';

type GameResultProps = {
  result: GameStatus;
  onRestart: () => void;
};

function GameResult({ result, onRestart }: GameResultProps) {
  const message = result.toString();

  return (
    <div className="game-result">
      <div>
        <h1>{message}</h1>
        <button onClick={onRestart}>Restart?</button>
      </div>
    </div>
  );
}

export default GameResult;
