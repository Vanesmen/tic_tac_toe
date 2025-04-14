import { MOVE_ORDER } from "./constants";

export function getNextMove(currentMove, playersCount) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount);
  const nextMoveIndex = slicedMoveOrder.indexOf(currentMove) + 1;

  return slicedMoveOrder[nextMoveIndex] || slicedMoveOrder[0];
}

export function checkSameInRow(arr, size = 5) {
  let count = 1;
  let maxCount = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] && arr[i] && arr[i - 1] === arr[i]) {
      count++;
      maxCount = count > maxCount ? count : maxCount;
    } else {
      count = 1;
    }
  }

  return maxCount >= size;
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
  ) { cells[i] !== undefined && sequencesArray[0].push(cells[i]); }

  // Проверка на комбинацию | и граничные условия
  for (let i = lastCell - fieldSize * (sequenceSize - 1); i <= lastCell + fieldSize * (sequenceSize - 1); i += fieldSize) {
    cells[i] !== undefined && sequencesArray[1].push(cells[i]);
  }

  // Проверка на комбинацию \ и граничные условия
  for (
    let i = lastCell - (fieldSize + 1) * Math.min(sequenceSize - 1, lastCell - Math.floor((lastCell / fieldSize)) * fieldSize);
    i <= lastCell + (fieldSize + 1) * Math.min(sequenceSize - 1, Math.ceil((lastCell + 1) / fieldSize) * fieldSize - 1 - lastCell);
    i += fieldSize + 1
  ) {
    cells[i] !== undefined && sequencesArray[2].push(cells[i]);
  }

  // Проверка на комбинацию / и граничные условия
  for (
    let i = lastCell - (fieldSize - 1) * Math.min(sequenceSize - 1, Math.ceil((lastCell + 1) / fieldSize) * fieldSize - 1 - lastCell);
    i <= lastCell + (fieldSize - 1) * Math.min(sequenceSize - 1, lastCell - Math.floor((lastCell / fieldSize)) * fieldSize);
    i += fieldSize - 1
  ) {
    cells[i] !== undefined && sequencesArray[3].push(cells[i]);
  }

  for (let i = 0; i < sequencesArray.length; i++){
    if (checkSameInRow(sequencesArray[i], sequenceSize)) {
      return true;
    }
  }

  return false;
}