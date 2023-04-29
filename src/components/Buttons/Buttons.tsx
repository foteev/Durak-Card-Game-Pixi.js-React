import { Button } from "@material-tailwind/react";
import React from "react";
import { socket } from "../../socket"
import './Button.css'
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon, 
  CloudArrowDownIcon
} from "@heroicons/react/24/outline";
import { useSnapshot } from "valtio";
import { gameStore } from "../store/gameStore";
import { TypePlayerRole } from "../../types/types";
 
export const Buttons = (props: any) => {
  const snap = useSnapshot(gameStore);

  const playerIndex: number = props.playerIndex

  const handleUndoClick = () => {
    socket.emit('undo', playerIndex);
  }

  const handlePassClick = () => {
    socket.emit('pass', playerIndex);
  }

  const handleReset = () => {
    socket.emit('reset');
  }
  
  const handleSort = (type: string) => {
    socket.emit('sort', {playerIndex: playerIndex, type: type});
  }

  return (
    <div className="buttons-block">
      <div className="flex items-center gap-4 buttons-container">
        
        <Button variant="gradient" className="flex items-center gap-3" onClick={handlePassClick}>
        <ArrowPathIcon strokeWidth={2} className="h-5 w-5" /> Undo turn
          

        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handleReset}>
          Reset
          <BookmarkIcon strokeWidth={2} className="h-5 w-5" /> Save
        </Button>
        <Button variant="text" className="flex items-center gap-2" onClick={() => handleSort('byRank')}>
          Sort by rank <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
        <Button variant="text" className="flex items-center gap-2" onClick={() => handleSort('bySuit')}>
          Sort by suit <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
        <Button className="flex items-center gap-3" onClick={handleUndoClick}>
        {snap.players[playerIndex].playerRole === TypePlayerRole.Attacker
              ? <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />
              : <CloudArrowDownIcon strokeWidth={2} className="h-5 w-5" />
        }
        {
          snap.players[playerIndex].playerRole === TypePlayerRole.Attacker
          ? <span>Pass</span> : <span>Take</span>
        }
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={() => window.location.href = 'https://github.com/foteev/Durak-Card-Game-Pixi.js-React'}>
          @github
        </Button>
      </div>
    </div>
  );
}