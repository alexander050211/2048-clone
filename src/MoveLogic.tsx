import type { BoardType } from './types';

export const BOARD_SIZE = 4;

export function initBoard(): BoardType {
  const newBoard: BoardType = Array.from({ length: BOARD_SIZE }, () =>
    Array<number>(BOARD_SIZE).fill(0),
  );
  return newBoard;
}
