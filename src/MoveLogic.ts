import type { BoardType, Direction } from './types';

export const BOARD_SIZE = 4;

export function initBoard(): BoardType {
  const newBoard: BoardType = Array.from({ length: BOARD_SIZE }, () =>
    Array<number>(BOARD_SIZE).fill(0),
  );
  addNumber(newBoard);
  addNumber(newBoard);
  return newBoard;
}

export function addNumber(board: BoardType): void {
  const options: { x: number; y: number }[] = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) options.push({ x: i, y: j });
    });
  });

  if (options.length > 0) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const spot = options[randomIndex] as { x: number; y: number };
    const localBoard = board[spot.x] as number[];
    localBoard[spot.y] = Math.random() > 0.5 ? 2 : 4;
    board[spot.x] = localBoard;
  }
}

export function moveBoard(
  board: BoardType,
  direction: Direction,
): {
  newBoard: BoardType;
  moved: boolean;
  gainedScore: number;
  gameOver: boolean;
  gameWon: boolean;
} {
  const rotatedBoard = rotateBoard(board, direction, false);
  const { newBoard: movedBoard, moved, gainedScore } = slideBoard(rotatedBoard);

  let gameOver = false;
  let gameWon = false;

  if (moved) {
    addNumber(movedBoard);
    gameOver = checkGameOver(movedBoard);
    gameWon = checkGameWin(movedBoard);
  }
  const finalBoard = rotateBoard(movedBoard, direction, true);
  return { newBoard: finalBoard, moved, gainedScore, gameOver, gameWon };
}

function rotateBoard(
  board: BoardType,
  direction: Direction,
  reverse: boolean,
): BoardType {
  const newBoard = board.map((row) => row.slice());
  const rotateCount = reverse
    ? getRotateCount(direction)
    : (4 - getRotateCount(direction)) % 4;
  for (let i = 0; i < rotateCount; i++) {
    const rotatedBoard: BoardType = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      const newRow: number[] = [];
      for (let y = BOARD_SIZE - 1; y >= 0; y--) {
        const ErrorCheck = newBoard[y];
        if (ErrorCheck === undefined) throw new Error();
        const value = ErrorCheck[x];
        if (value === undefined) throw new Error();
        newRow.push(value);
      }
      rotatedBoard.push(newRow);
    }
    newBoard.map((row, ii) => {
      return row.map((cell, j) => {
        return rotatedBoard.at(ii)?.at(j);
        return cell;
      });
    });
  }
  return newBoard;
}

function getRotateCount(direction: Direction): number {
  switch (direction) {
    case 'up':
      return 3;
    case 'right':
      return 2;
    case 'down':
      return 1;
    case 'left':
      return 0;
    default:
      return 0;
  }
}

function slideBoard(board: BoardType): {
  newBoard: BoardType;
  moved: boolean;
  gainedScore: number;
} {
  let moved = false;
  let gainedScore = 0;
  const newBoard: BoardType = board.map((row) => {
    let arr = row.filter((val) => val !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== undefined && arr[i] === arr[i + 1]) {
        let localArrI = arr[i] as number;
        localArrI *= 2;
        arr[i] = localArrI;
        arr[i + 1] = 0;
        gainedScore += localArrI;
        moved = true;
      }
    }
    arr = arr.filter((val) => val !== 0);
    const zeros = Array(BOARD_SIZE - arr.length).fill(0);
    const newRow = arr.concat(zeros);
    if (!moved && newRow.toString() !== row.toString()) {
      moved = true;
    }
    return newRow;
  });
  return { newBoard, moved, gainedScore };
}

function checkGameOver(board: BoardType): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i]?.[j] === 0) {
        return false;
      }
    }
  }
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (j < BOARD_SIZE - 1 && board[i]?.[j] === board[i]?.[j + 1]) {
        return false;
      }
      if (i < BOARD_SIZE - 1 && board[i]?.[j] === board[i + 1]?.[j]) {
        return false;
      }
    }
  }
  return true;
}

function checkGameWin(board: BoardType): boolean {
  return board.some((row) => row.some((cell) => cell === 128));
}
