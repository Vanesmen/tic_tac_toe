import { GameInfo } from "./game-info";
import { GameCell } from "./game-cell";
import { useGameState } from "./use-game-state";
import styles from "./game.module.css";

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
    <div className={styles["game"]}>
      <GameInfo
        isDraw={isDraw}
        winnerSymbol={winnerSymbol}
        currentStep={currentStep}
      />

      <div className={styles["game-field"]}>
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
      <button className={styles["reset-button"]} onClick={handleReset}>
        Сброс
      </button>
    </div>
  );
}
