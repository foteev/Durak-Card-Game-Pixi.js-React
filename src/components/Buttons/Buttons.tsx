import { Button } from "@material-tailwind/react";
import React from "react";
import { socket } from "../../socket"
import './Button.css'

import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon, 
} from "@heroicons/react/24/outline";
import { useSnapshot } from "valtio";
import { gameStore } from "../store/gameStore";
import { TypePlayerRole } from "../../types/types";
 
export const Buttons = (props: any) => {

  const snap = useSnapshot(gameStore);

  const playerIndex = props.playerIndex
  console.log(playerIndex);

  const handleUndoClick = () => {
    socket.emit('undo', playerIndex);
  }

  const handlePassClick = () => {
    socket.emit('pass', playerIndex);
  }

  return (
    <div>
      <div className="flex items-center gap-4 buttons-container">
        <Button className="flex items-center gap-3" onClick={handleUndoClick}>
          <ArrowPathIcon strokeWidth={2} className="h-5 w-5" /> Undo turn
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handlePassClick}>
          <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> 
            {
              snap.players[playerIndex].playerRole === TypePlayerRole.Attacker
              ? <span>Pass</span> : <span>Take</span>
            }
        </Button>
        <Button variant="outlined" className="flex items-center gap-3">
          Refresh
          <BookmarkIcon strokeWidth={2} className="h-5 w-5" /> Save
        </Button>
        <Button variant="text" className="flex items-center gap-2">
          Read More <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}