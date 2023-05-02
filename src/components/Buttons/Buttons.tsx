import { Button } from "@material-tailwind/react";
import React from "react";
import { socket } from "../../socket"
import './Button.css'
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CloudArrowDownIcon,
  FlagIcon,
  ArrowsUpDownIcon
} from "@heroicons/react/24/outline";
import { useSnapshot } from "valtio";
import { gameStore } from "../store/gameStore";
import { TypePlayerRole } from "../../types/types";

type Props = {
  playerIndex: number
}
export const Buttons = (props: any) => {
  
  const snap = useSnapshot(gameStore);

  const playerIndex = props.playerIndex

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

  const handleEndGame = () => {
    socket.emit('end game', playerIndex);
    // socket.emit('reset');
  }

  const handleExit = () => {
    socket.emit('exit', playerIndex);
  }

  return (
    <div className="buttons-block">
      <div className="flex items-center gap-1 buttons-container">
        <Button className="flex items-center gap-3" onClick={handlePassClick}>
          {snap.players[playerIndex].playerRole === TypePlayerRole.Attacker
                ? <CloudArrowUpIcon strokeWidth={1} className="h-5 w-5" />
                : <CloudArrowDownIcon strokeWidth={1} className="h-5 w-5" />
          }
          {
            snap.players[playerIndex].playerRole === TypePlayerRole.Attacker
            ? <span>Pass</span> : <span>Take</span>
          }
        </Button>
        <Button variant="text" className="flex items-center gap-2" onClick={() => handleSort('byRank')}>
          <ArrowsUpDownIcon strokeWidth={1} className="h-5 w-5" /> by rank 
        </Button>
        <Button variant="text" className="flex items-center gap-2" onClick={() => handleSort('bySuit')}>
          <ArrowsUpDownIcon strokeWidth={1} className="h-5 w-5" /> by suit 
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handleUndoClick}>
           Undo
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handleReset}>
          <ArrowPathIcon strokeWidth={1} className="h-5 w-5" />  Replay
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handleEndGame}>
          <FlagIcon  strokeWidth={1} className="h-5 w-5" />  
            End game
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={handleExit}> 
            Exit
        </Button>
        <Button variant="gradient" className="flex items-center gap-3" onClick={() => window.location.href = 'https://github.com/foteev/Durak-Card-Game-Pixi.js-React'}>
          @github
        </Button>
      </div>
    </div>
  );
}