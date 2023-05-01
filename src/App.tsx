import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameStage } from './components/GameStage/GameStage';
import { useSnapshot } from 'valtio';
import { TypeGameStatus, TypePlayerStatus, TypePlayer, TypeGameStore } from './types/types';
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
  const [name, setName] = useState('');
  const store = useSnapshot(gameStore);

  useEffect(() => {
    socket.on('error', (err: string) => {
      console.log(err)
      setError(err);
      setShowModal(true);
      // setShowLogin(true);
      setShowGameStage(false);
    });

    socket.on('player enter', storeJ => {
      const st = JSON.parse(storeJ) as TypeGameStore;
      console.log()
      console.log(name, st.players[0].playerName)
      if (st.players[0].playerName !== 'Player 1') {
        console.log('index 0')
        setPlayerIndex(0)
        if (st.players[1].playerName !== 'Player 2') {
          setPlayerIndex(1)
          console.log(playerIndex)
        }
      }
      setShowLogin(false);
    })

    socket.on('store update', (storeJ) => {
      const st = JSON.parse(storeJ);
      console.log(playerIndex)
      updateStore(st);

      if (st.gameStatus === TypeGameStatus.GameIsOver) {
        if (st.players[playerIndex].playerStatus === TypePlayerStatus.YouLoser) {
          console.log('if lose')
          setError('You lose')
          setShowModal(true);
        }
        if (st.players[playerIndex].playerStatus === TypePlayerStatus.YouWinner) {
          setError('You win!');
          setShowModal(true);
        }
      }

      setShowLogin(false);
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
          <LoginForm playerIndex={playerIndex} name={name}/>
          : null}
        {showModal ?
          <Modal showModal={showModal} modalInnerHTML={error}/>
          : null}
        <Buttons playerIndex={playerIndex} />
      </div>
    </React.Suspense>
  );
}