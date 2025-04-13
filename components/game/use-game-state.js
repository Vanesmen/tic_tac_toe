import { useEffect, useState } from "react";
import { GAME_SYMBOLS, MOVE_ORDER } from "./constants";

function getNextMove(currentMove, playersCount) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount);

  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;

  return slicedMoveOrder[nextMoveIndex] || slicedMoveOrder[0];
}

function computeWinner(cells, lastCell, sequenceSize = 5, fieldSize = 19) {

  console.log('lastCell', lastCell);
  const sequencesArray = [
    [], // —
    [], // |
    [], // \
    [], // \
  ]

  // Проверка на комбинацию —
  for (let i = lastCell - sequenceSize + 1; i <= lastCell + sequenceSize - 1; i++) {
    cells[i] && sequencesArray[0].push(cells[i]);
  }

  // Проверка на комбинацию |
  for (let i = lastCell - fieldSize * (sequenceSize - 1); i <= lastCell + fieldSize * (sequenceSize - 1); i += fieldSize) {
    cells[i] && sequencesArray[1].push(cells[i]);
  }

  // Проверка на комбинацию \
  for (let i = lastCell - (fieldSize + 1) * (sequenceSize - 1); i <= lastCell + (fieldSize + 1) * (sequenceSize - 1); i += fieldSize + 1) {
    cells[i] && sequencesArray[2].push(cells[i]);
  }

  // Проверка на комбинацию /
  for (let i = lastCell - (fieldSize - 1) * (sequenceSize - 1); i <= lastCell + (fieldSize - 1) * (sequenceSize - 1); i += fieldSize - 1) {
    cells[i] && sequencesArray[3].push(cells[i]);
  }


  console.log('sequencesArray', sequencesArray);
}

export function useGameState(playersCount) {
  const [{cells, currentMove, lastMoveIndex}, setGameState] = useState(() => ({
      cells: new Array(19 * 19).fill(null),
      currentMove: GAME_SYMBOLS.CROSS,
      lastMoveIndex: null,
    }));
  
  const nextMove = getNextMove(currentMove, playersCount);

  const handleCellClick = (index) => {
    if (cells[index]) return;

    setGameState((lastGameState) => ({
      ...lastGameState,
      currentMove: getNextMove(lastGameState.currentMove, playersCount),
      cells: lastGameState.cells.map((cell, i) => i === index ? lastGameState.currentMove : cell),
      lastMoveIndex: index
    }));

  };

  useEffect(() => {
    computeWinner(cells, lastMoveIndex);
  }, [cells]);

  return {cells, currentMove, nextMove, handleCellClick}
}