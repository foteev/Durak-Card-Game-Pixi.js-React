import { Button } from "@material-tailwind/react";
import React from "react";
import { socket } from "../../socket"

import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon, 
} from "@heroicons/react/24/outline";
 
export const Buttons = (props: any) => {

  const playerIndex = props.playerIndex

  const handleUndoClick = () => {
    socket.emit('undo', playerIndex);
  }

  return (
    <div
      style={{
        zIndex: 10,
      }}
    >
      <div className="flex-col items-center gap-4">
        <Button className="flex items-center gap-3" onClick={handleUndoClick}>
          <ArrowPathIcon strokeWidth={2} className="h-5 w-5" /> Undo turn
        </Button>
        <Button variant="gradient" className="flex items-center gap-3">
          <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Files
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