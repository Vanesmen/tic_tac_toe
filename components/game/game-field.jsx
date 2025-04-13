import clsx from "clsx";
import { UiButton } from "../uikit/ui-button";

import { GameSymbol } from "./game-symbol";

export function GameField({ className, cells, currentMove, nextMove, handleCellClick }) {

  const actions = (
    <>
      <UiButton className="mr-3 w-[91px]" size="md" variant="primary">Ничья</UiButton>
      <UiButton className="w-[106px]" size="md" variant="outline">Сдаться</UiButton>
    </>
  );

  return (
    <GameFieldLayout className={className}>
      <GameMoveInfo
        actions={actions}
        currentMove={currentMove}
        nextMove={nextMove}
      />
      <GameGrid>
        {cells.map((symbol, index) => (
          <GameCell
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {symbol && <GameSymbol symbol={symbol} className="w-5 h-5"/>}
          </GameCell>
        ))}
      </GameGrid>
    </GameFieldLayout>
  )
}

function GameFieldLayout({ children, className }) {
  return (
    <div className={clsx(className, "bg-white rounded-2xl shadow-md px-8 pt-5 pb-7")}>
      {children}
    </div>
  )
}

function GameMoveInfo({ actions, currentMove, nextMove }) {
  return (
    <div className="flex items-center mb-3">
      <div className="mr-auto">
        <div className="flex items-center gap-1 text-xl font-semibold">
          Ход:
          <GameSymbol symbol={currentMove} className="w-5 h-5"/>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          Следующий:
          <GameSymbol symbol={nextMove} className="w-3 h-3"/>
        </div>
      </div>

      {actions}
    </div>
  )
}

function GameGrid({ children, onClick }) {
  return (
    <div onClick={onClick} className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] pl-px pt-px">
      {children}
    </div>
  )
}

function GameCell({ children, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center border border-slate-200 -ml-px -mt-px hover:bg-slate-200">
      {children}
    </button>
  )
}