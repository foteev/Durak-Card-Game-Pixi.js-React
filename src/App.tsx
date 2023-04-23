import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameStage } from './components/GameStage/GameStage';
import { useSnapshot } from 'valtio';
import { TypeGameStatus } from './types/types';
import { sendMessage, str } from './components/utils/utils';

export const App = () => {
  const store = useSnapshot(str);
  return (
    <React.Suspense fallback={<span>waiting...</span>}>
      <div className="App">
        <GameStage />
        <div className = "game_stage_buttons">
          <button className="button" onClick={() => sendMessage('player1')}>Start game</button>
          {/* <button className="button" onClick={() => sortPlayerCards(1, 'byRank')}>Sort 1 by value</button>
          <button className="button" onClick={() => sortPlayerCards(1, 'bySuit')}>Sort 1 by suit</button>
          <button className="button" onClick={() => sortPlayerCards(2, 'byRank')}>Sort 2 by value</button>
          <button className="button" onClick={() => sortPlayerCards(2, 'bySuit')}>Sort 2 by suit</button> */}
        </div>
      </div>
    </React.Suspense>
  );
}