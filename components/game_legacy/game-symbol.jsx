import { SYMBOL_X, SYMBOL_O } from "./constants";
import { clsx } from "clsx";

export function GameSymbol({ symbol }) {
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return "text-green-500";
    if (symbol === SYMBOL_X) return "text-red-500";

    return "";
  };

  return (
    <span className={clsx("text-xl text-red", getSymbolClassName(symbol))}>
      {symbol}
    </span>
  );
}
