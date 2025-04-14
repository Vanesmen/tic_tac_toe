import { useState } from "react";
import { GAME_SYMBOLS } from "./constants";
import { computeWinner, getNextMove } from "./model";

export function useGameState(playersCount) {
  const [{cells, currentMove, lastMoveIndex}, setGameState] = useState(() => ({
      cells: new Array(19 * 19).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
      lastMoveIndex: null,
    }));

  const nextMove = getNextMove(currentMove, playersCount);

  console.log(computeWinner(cells, lastMoveIndex));

  const handleCellClick = (index) => {
    if (cells[index]) return;

    setGameState((lastGameState) => ({
      ...lastGameState,
      currentMove: getNextMove(lastGameState.currentMove, playersCount),
      cells: lastGameState.cells.map((cell, i) => i === index ? lastGameState.currentMove : cell),
      lastMoveIndex: index
    }));

  };

  return {cells, currentMove, nextMove, handleCellClick}
}