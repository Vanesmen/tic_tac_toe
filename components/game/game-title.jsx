import Link from "next/link";
import { ArrowLeftIcon } from "./icons/arrow-left-icon";
import { StarIcon } from "./icons/star-icon";
import { UserIcon } from "./icons/user-icon";
import { HistoryIcon } from "./icons/history-icon";

export const GameTitle = ({ playersCount }) => {
  return (
    <div className="pl-2">
      <Link href="#" className="flex items-center gap-2 text-teal-600 text-xs -mb-0.5">
        <ArrowLeftIcon/>
        На главную
      </Link>
      <h1 className="text-4xl mb-0.5">Крестики нолики</h1>
      <div className="flex items-center gap-3 text-slate-400 text-xs">
        <StarIcon/>

        <div className="flex items-center gap-1">
          <UserIcon/>
          {playersCount}
        </div>

        <div className="flex items-center gap-1">
          <HistoryIcon/>
          1 мин на ход
        </div>
      </div>
    </div>
  )
}
