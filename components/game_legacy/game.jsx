import { GameInfo } from "./game-info";
import { GameCell } from "./game-cell";
import { useGameState } from "./use-game-state";

export function Game() {
  const {
    currentStep,
    cells,
    winnerSymbol,
    winnerCoomb,
    isDraw,
    handleCellClick,
    handleReset,
  } = useGameState();

  return (
    <div className="flex flex-col items-center w-40 mx-auto my-25 border border-black p-1.5">
      <GameInfo
        isDraw={isDraw}
        winnerSymbol={winnerSymbol}
        currentStep={currentStep}
      />

      <div className="grid grid-cols-[repeat(3,_30px)] grid-rows-[repeat(3,_30px)] pt-px pl-px ">
        {cells.map((symbol, index) => (
          <GameCell
            key={index}
            isWinner={winnerCoomb.includes(index)}
            onClick={() => handleCellClick(index)}
            currentStep={currentStep}
            symbol={symbol}
          />
        ))}
      </div>
      <button
        className="cursor-pointer mt-4 bg-transparent border border-gray-400 py-1 px-3 rounded-2xl"
        onClick={handleReset}
      >
        Сброс
      </button>
    </div>
  );
}
