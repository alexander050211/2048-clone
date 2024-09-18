import type { BoardType } from '../types';
import Tile from './Tile';

type BoardProps = {
  board: BoardType;
};

function Board({ board }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((value, j) => (
            <Tile key={i.toString() + '-' + j.toString()} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
