import { useState } from "react";
import { SYMBOL_O, SYMBOL_X } from "./constants";

const checkWinner = (cells) => {
  const winnerCoombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;
  let winnerCoomb = [];

  for (const coomb of winnerCoombs) {
    let currentCoomb = [];

    coomb.forEach((elIndex, i) => {
      currentCoomb[i] = cells[elIndex];
    });

    if (new Set(currentCoomb).size === 1 && !!currentCoomb[0]) {
      winner = currentCoomb[0];
      winnerCoomb = coomb;

      return [winner, winnerCoomb];
    }
  }

  return [null, []];
};

export function useGameState() {
  const [currentStep, setCurrentStep] = useState(SYMBOL_O);
  const [cells, setCells] = useState(new Array(9).fill(null));

  const [winnerSymbol, setWinnerSymbol] = useState(null);
  const [winnerCoomb, setWinnerCoomb] = useState([]);

  const isDraw = cells.find((el) => el === null) !== null && !winnerSymbol;

  const handleCellClick = (index) => {
    if (cells[index] || winnerSymbol || isDraw) {
      return;
    }

    const newCells = [...cells];
    newCells[index] = currentStep;

    setCells(newCells);
    setCurrentStep(currentStep === SYMBOL_X ? SYMBOL_O : SYMBOL_X);

    const [newWinnerSymbol, newWinnerCoomb] = checkWinner(newCells);

    setWinnerSymbol(newWinnerSymbol);
    setWinnerCoomb(newWinnerCoomb);
  };

  const handleReset = () => {
    setWinnerSymbol(null);
    setWinnerCoomb([]);
    setCells([null, null, null, null, null, null, null, null, null]);
  };

  return {
    currentStep,
    cells,
    winnerSymbol,
    winnerCoomb,
    isDraw,
    handleCellClick,
    handleReset,
  };
}
