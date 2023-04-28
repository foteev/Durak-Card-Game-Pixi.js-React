import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameStage } from './components/GameStage/GameStage';
import { useSnapshot } from 'valtio';
import { TypeGameStatus } from './types/types';
import { gameStore, updateStore } from './components/store/gameStore';
import { LoginForm } from './components/LoginForm/LoginForm';
import { SERVER_ADDRESS } from './constants'
import { socket } from './socket';
import { Modal } from './components/Modal/Modal';
import { Buttons } from './components/Buttons/Buttons';



export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showLogin, setShowLogin] = useState(true);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showGameStage, setShowGameStage] = useState(false);
  const [error, setError] = useState('');
  const store = useSnapshot(gameStore);

  useEffect(() => {
    socket.on('error', (err: string) => {
      console.log(err)
      setError(err);
      setShowModal(true);
      setShowLogin(true);
      setShowGameStage(false);
    });

    socket.on('player enter', storeJ => {
      const st = JSON.parse(storeJ);
      if (st.players[1].playerName.length === 0) {
        updateStore(st);
      } else if (st.players[1].playerName.length !== 0 
        && gameStore.players[0].playerName.length === 0) {
          setPlayerIndex(1);
          updateStore(st);
      }
      setShowLogin(false);
      console.log('cards: ', gameStore.players[0].cards, gameStore.players[1].cards);
    })

    socket.on('store update', (storeJ) => {
      const st = JSON.parse(storeJ);
      updateStore(st);
      console.log(store);
    })

    return () => {
      // socket.off('connect', onConnect);
    };
  }, []);

  return (
    <React.Suspense fallback={<span>waiting...</span>}>
      <div className="App">
        {/* {showGameStage ? */}
          <GameStage playerIndex={playerIndex} />
          {/* : null } */}
        {showLogin ?
          <LoginForm />
          : null}
        {showModal ?
          <Modal showModal={showModal} error={error}/>
          : null}
        <Buttons playerIndex={playerIndex} />
      </div>
    </React.Suspense>
  );
}