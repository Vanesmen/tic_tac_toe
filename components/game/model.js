import { MOVE_ORDER } from "./constants";

export function getNextMove(currentMove, playersCount, playersTimeOver = []) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount).filter(symbol => !playersTimeOver.includes(symbol));
  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;

  return slicedMoveOrder[nextMoveIndex] || slicedMoveOrder[0];
}

export function checkSameInRow(arr, cells, size = 5) {
  let count = 1;
  let maxCount = 0;

  let winCells = [arr[0]];
  let maxWinCells = [];

  for (let i = 1; i < arr.length; i++) {
    if (cells[arr[i - 1]] && cells[arr[i]] && cells[arr[i - 1]] === cells[arr[i]]) {
      count++;
      winCells.push(arr[i]);
      maxCount = count > maxCount ? count : maxCount;
      maxWinCells = winCells.length > maxWinCells.length ? winCells : maxWinCells;
    } else {
      winCells = [arr[i]];
      count = 1;
    }
  }

  return maxCount >= size ? maxWinCells : false;
}

export function computeWinner(cells, lastCell, sequenceSize = 5, fieldSize = 19) {
  const sequencesArray = [
    [], // —
    [], // |
    [], // \
    [], // \
  ]
 
  // Проверка на комбинацию — и граничные условия
  for (
    let i = Math.max(lastCell - sequenceSize + 1, Math.floor(lastCell / fieldSize) * fieldSize);
    i <= Math.min(lastCell + sequenceSize - 1, Math.ceil((lastCell + 1) / fieldSize) * fieldSize - 1);
    i++
  ) { cells[i] !== undefined && sequencesArray[0].push(i); }

  // Проверка на комбинацию | и граничные условия
  for (let i = lastCell - fieldSize * (sequenceSize - 1); i <= lastCell + fieldSize * (sequenceSize - 1); i += fieldSize) {
    cells[i] !== undefined && sequencesArray[1].push(i);
  }

  // Проверка на комбинацию \ и граничные условия
  for (
    let i = lastCell - (fieldSize + 1) * Math.min(sequenceSize - 1, lastCell - Math.floor((lastCell / fieldSize)) * fieldSize);
    i <= lastCell + (fieldSize + 1) * Math.min(sequenceSize - 1, Math.ceil((lastCell + 1) / fieldSize) * fieldSize - 1 - lastCell);
    i += fieldSize + 1
  ) {
    cells[i] !== undefined && sequencesArray[2].push(i);
  }

  // Проверка на комбинацию / и граничные условия
  for (
    let i = lastCell - (fieldSize - 1) * Math.min(sequenceSize - 1, Math.ceil((lastCell + 1) / fieldSize) * fieldSize - 1 - lastCell);
    i <= lastCell + (fieldSize - 1) * Math.min(sequenceSize - 1, lastCell - Math.floor((lastCell / fieldSize)) * fieldSize);
    i += fieldSize - 1
  ) {
    cells[i] !== undefined && sequencesArray[3].push(i);
  }

  for (let i = 0; i < sequencesArray.length; i++){
    if (checkSameInRow(sequencesArray[i], cells, sequenceSize)) {
      return checkSameInRow(sequencesArray[i], cells, sequenceSize);
    }
  }

  return false;
}