import clsx from "clsx";
import { Profile } from "../profile";
import { CrossIcon } from "./icons/cross-icon";

export function GameInfo({ className }) {
  return (
    <div className={clsx(className, "flex justify-between bg-white rounded-2xl shadow-md px-8 py-4")}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Profile className="w-44"/>

          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1">
            <CrossIcon/>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200"/>

        <div className="text-slate-500 text-lg font-semibold">01:08</div>
      </div>

      <div className="flex items-center flex-row-reverse gap-3">
        <div className="relative">
          <Profile className="w-44"/>

          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1">
            <CrossIcon/>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200"/>

        <div className="text-orange-600 text-lg font-semibold">01:08</div>
      </div>
    </div>
  )
}