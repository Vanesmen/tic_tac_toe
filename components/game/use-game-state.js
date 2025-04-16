import { useState } from "react";
import { GAME_SYMBOLS } from "./constants";
import { computeWinner, getNextMove } from "./model";

export function useGameState(playersCount) {
  const [{cells, currentMove, lastMoveIndex, playersTimeOver}, setGameState] = useState(() => ({
      cells: new Array(19 * 19).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
      lastMoveIndex: null,
      playersTimeOver: [],
    }));

  const nextMove = getNextMove(currentMove, playersCount, playersTimeOver);

  const winnerSequences = computeWinner(cells, lastMoveIndex, 5, 19);

  const winnerSymbol = nextMove === currentMove ? currentMove : (winnerSequences?.[0] ? cells[winnerSequences?.[0]] : null);

  const handleCellClick = (index) => {
    if (cells[index]) return;

    setGameState((lastGameState) => ({
      ...lastGameState,
      currentMove: getNextMove(lastGameState.currentMove, playersCount, playersTimeOver),
      cells: lastGameState.cells.map((cell, i) => i === index ? lastGameState.currentMove : cell),
      lastMoveIndex: index
    }));
  };

  const handlePlayerTimeOver = (symbol) => {
    setGameState((lastGameState) => ({
      ...lastGameState,
      playersTimeOver: [...lastGameState.playersTimeOver, symbol],
      currentMove: getNextMove(lastGameState.currentMove, playersCount, playersTimeOver),
    }));
  }

  return {cells, currentMove, nextMove, handleCellClick, handlePlayerTimeOver, winnerSequences, winnerSymbol}
}