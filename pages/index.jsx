import { useState } from "react";
import { GameField, GameInfo, GameTitle, useGameState } from "../components/game";
import { Header } from "../components/header";

export default function HomePage() {
  const [playersCount, setPlayersCount] = useState(2);

  const {cells, currentMove, nextMove, handleCellClick} = useGameState(playersCount);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header/>
      <main className="pt-6 mx-auto w-max">
        <GameTitle playersCount={playersCount}/>
        <GameInfo className="mt-4" playersCount={playersCount} curruntMove={currentMove}/>
        <GameField
          className="mt-6"
          cells={cells}
          currentMove={currentMove}
          nextMove={nextMove}
          handleCellClick={handleCellClick}
        />
      </main>
    </div>
  )
}
