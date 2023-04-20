import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameStage } from './components/GameStage/GameStage';
import { gameStore } from './components/store/gameStore';
import { useSnapshot } from 'valtio';
import { TypeGameStatus } from './types/types';
// import { startGame } from './components/utils/utils'
import { startGame,  sortPlayerCards } from './components/utils/utils';

// subscribe(gameStore, () => {
  
//   giveCardsOnStart();
// \
// })



function App() {
  const store = useSnapshot(gameStore);
  return (
    <div className="App">
      <GameStage />
      <div className = "game_stage_buttons">
        <button className="button" onClick={startGame}>Start game</button>
        <button className="button" onClick={() => sortPlayerCards(1, 'byName')}>Sort 1 by name</button>
        <button className="button" onClick={() => sortPlayerCards(1, 'byRank')}>Sort 1 by value</button>
        <button className="button" onClick={() => sortPlayerCards(1, 'bySuit')}>Sort 1 by suit</button>
        <button className="button" onClick={() => sortPlayerCards(2, 'byName')}>Sort 2 by name</button>
        <button className="button" onClick={() => sortPlayerCards(2, 'byRank')}>Sort 2 by value</button>
        <button className="button" onClick={() => sortPlayerCards(2, 'bySuit')}>Sort 2 by suit</button>
      </div>

    </div>
  );
}

export default App;
