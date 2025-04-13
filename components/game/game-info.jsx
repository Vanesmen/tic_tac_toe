import clsx from "clsx";
import { Profile } from "../profile";
import { GameSymbol } from "./game-symbol";
import { GAME_SYMBOLS } from "./constants";
import avatarSrc from "./images/avatar.png";
import { useEffect, useState } from "react";

const players = [
  {id: 1, name: "Иван", rating: 1488, avatar: avatarSrc, symbol: GAME_SYMBOLS.CROSS},
  {id: 2, name: "Не Ивааааааааааааан 1", rating: 1488, avatar: avatarSrc, symbol: GAME_SYMBOLS.ZERO},
  {id: 3, name: "Не Иван 2", rating: 1488, avatar: avatarSrc, symbol: GAME_SYMBOLS.TRIANGLE},
  {id: 4, name: "Не Иван 3", rating: 1488, avatar: avatarSrc, symbol: GAME_SYMBOLS.SQUARE},
]

export function GameInfo({ className, playersCount, curruntMove }) {
  return (
    <div className={clsx(className, "grid grid-cols-2 gap-3 bg-white rounded-2xl shadow-md px-8 py-4")}>
      {
        players.slice(0, playersCount).map((player, index) => (
          <PlayerInfo
            key={player.id}
            palyerInfo={player}
            isReverse={index % 2}
            isTimerRunning={curruntMove === player.symbol}
          />
        ))
      }
    </div>
  )
}

function PlayerInfo({ palyerInfo, isReverse, isTimerRunning }) {
  const [seconds, setSeconds] = useState(60);

  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(Math.floor(seconds % 60)).padStart(2, "0");

  const isCandlewick = seconds <= 10;

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds(s => Math.max(s - 1, 0));
      }, 600);

      return () => {
        setSeconds(60);
        clearInterval(interval);
      };
    }
    
  }, [isTimerRunning]);

  const getTimerColor = () => {
    if (isTimerRunning) {
      return isCandlewick ? "text-orange-600" : "text-slate-500";
    }

    return "text-slate-300";
  }

  return (
    <div className={clsx(isReverse && "flex-row-reverse", "flex items-center gap-3")}>
        <div className="relative">
          <Profile className="w-44" name={palyerInfo?.name} rating={palyerInfo?.rating} avatar={palyerInfo?.avatar}/>

          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1">
            <GameSymbol symbol={palyerInfo?.symbol}/>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200"/>

        <div className={clsx(
          "text-lg font-semibold",
          getTimerColor(),
        )}>
          {minutesString}:{secondsString}
        </div>
      </div>
  )
}