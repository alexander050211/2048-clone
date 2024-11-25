import type { BoardType } from '../types';
import styles from './Board.module.css';
import Tile from './Tile';

type BoardProps = {
  board: BoardType;
};

function Board({ board }: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((row, i) => (
        <div key={i} className={styles.boardRow}>
          {row.map((value, j) => (
            <Tile key={i.toString() + '-' + j.toString()} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
