import type { BoardType, Direction } from './types';

const BOARD_SIZE = 4;

export function initBoard(): BoardType {
  const newBoard: BoardType = Array.from({ length: BOARD_SIZE }, () =>
    Array<number>(BOARD_SIZE).fill(0),
  );

  addNumber(newBoard);
  addNumber(newBoard);
  return newBoard;
}

function addNumber(board: BoardType): void {
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
  let newBoard = board.map((row) => row.slice());
  const rotateCount = reverse
    ? getRotateCount(direction)
    : (4 - getRotateCount(direction)) % 4;
  for (let i = 0; i < rotateCount; i++) {
    newBoard = transposeBoard(newBoard);
    newBoard = newBoard.map((row) => row.reverse());
  }
  return newBoard;
}

function getRotateCount(direction: Direction): number {
  switch (direction) {
    case 'up':
      return 1;
    case 'right':
      return 2;
    case 'down':
      return 3;
    case 'left':
      return 0;
    default:
      return 0;
  }
}

function transposeBoard(board: BoardType): BoardType {
  const localBoard = board.map((row) => row.slice());

  for (let i = 0; i < localBoard.length; i++) {
    for (let j = 0; j < i; j++) {
      if (
        localBoard[i] !== undefined &&
        localBoard[j] !== undefined &&
        localBoard[i]?.[j] !== undefined
      ) {
        //const tmp = localBoard[i][j] !== undefined ? localBoard[i][j] : 0;
        const tmpij = localBoard[i]?.[j];
        if (tmpij === undefined) throw new Error();
        const tmpji = localBoard[j]?.[i];
        if (tmpji === undefined) throw new Error();
        const tmpiRow = localBoard[i];
        if (tmpiRow === undefined) throw new Error();
        const tmpjRow = localBoard[j];
        if (tmpjRow === undefined) throw new Error();

        tmpiRow[j] = tmpji;
        tmpjRow[i] = tmpij;

        localBoard[i] = tmpiRow;
        localBoard[j] = tmpjRow;
      }
    }
  }
  return localBoard;
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

