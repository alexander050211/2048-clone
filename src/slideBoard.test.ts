import { describe, expect, it } from 'vitest';

import type { BoardType } from './MoveLogic';
import { slideBoard } from './MoveLogic';

describe('slideBoard', () => {
  it('should slide cells to the left and merge correctly', () => {
    const input: BoardType = [
      [0, 4, 0, 4],
      [8, 8, 8, 16],
      [0, 0, 0, 128],
      [2, 0, 2, 2],
    ];
    const output: BoardType = [
      [8, 0, 0, 0],
      [16, 8, 16, 0],
      [128, 0, 0, 0],
      [4, 2, 0, 0],
    ];

    const { newBoard, moved, gainedScore } = slideBoard(input);
    expect(newBoard).toEqual(output);
    expect(moved).toBe(true);
    expect(gainedScore).toBe(28);
  });

  it('handles situations with no merge properly', () => {
    const input: BoardType = [
      [0, 4, 0, 2],
      [8, 0, 16, 8],
      [0, 0, 0, 128],
      [2, 4, 8, 16],
    ];
    const output: BoardType = [
      [4, 2, 0, 0],
      [8, 16, 8, 0],
      [128, 0, 0, 0],
      [2, 4, 8, 16],
    ];

    const { newBoard, moved, gainedScore } = slideBoard(input);
    expect(newBoard).toEqual(output);
    expect(moved).toBe(true);
    expect(gainedScore).toBe(0);
  });

  it('handles sitations with no movement properly', () => {
    const input: BoardType = [
      [0, 0, 0, 0],
      [4, 2, 0, 0],
      [2, 4, 8, 16],
      [8, 0, 0, 0],
    ];
    const output: BoardType = [
      [0, 0, 0, 0],
      [4, 2, 0, 0],
      [2, 4, 8, 16],
      [8, 0, 0, 0],
    ];

    const { newBoard, moved, gainedScore } = slideBoard(input);
    expect(newBoard).toEqual(output);
    expect(moved).toBe(false);
    expect(gainedScore).toBe(0);
  });
});
