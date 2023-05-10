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

const width = window.innerWidth
const height = window.innerHeight


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
      setShowLogin(true);
      setShowGameStage(false);
    });

    // socket.on('connect', () => {
      socket.on('game status', (message) => {
        console.log(message)
      })
    // })

    socket.on('player 0 enter', storeJ => {
      const st = JSON.parse(storeJ) as TypeGameStore;
        setPlayerIndex(0);
    })

    socket.on('player 1 enter', storeJ => {
      const st = JSON.parse(storeJ) as TypeGameStore;
      setPlayerIndex(1)
      setShowLogin(false);
    })

    socket.on('store update', (storeJ) => {
      const st = JSON.parse(storeJ);
      updateStore(st);
      setShowLogin(false);
      setShowGameStage(true);
    })

    socket.on('end game loser', () => {
      console.log('you loser')
      setError('You lose')
      setShowModal(true);
    })

    socket.on('end game winner', () => {
      console.log('you win')
      setError('You win!');
      setShowModal(true);
    })

    socket.on(`exit ${name}`, () => {
      setShowGameStage(false);
      setShowLogin(true);
      socket.connect();
    })

    socket.on('exit 0 1', () => {
      socket.on('disconnect', () => {
        setShowGameStage(false);
        setShowLogin(true);
        socket.connect();
      })
    })

    socket.on('disconnect', () => {
      setShowGameStage(false);
      setShowLogin(true);
      socket.connect();
    })

    return () => {
    };
  }, []);

  const playerEnter = () => {
    socket.emit('player name & socket.id', {name: name, socketId: socket.id}, () => {
    });
  }

  return (
    <React.Suspense fallback={<span>waiting...</span>}>
      <div className="App">
        {showGameStage ?
          <GameStage playerIndex={playerIndex} />
          : <div
            style={{
              width: width,
              height: height - 50
            }}
            >
          </div>
        }
        {showLogin ?
          <LoginForm  playerIndex={playerIndex} name={name} setName={setName} playerEnter={playerEnter}/>
          : null}
        {showModal ?
          <Modal showModal={showModal} modalInnerHTML={error}/>
          : null}
        <Buttons playerIndex={playerIndex} showLogin={showLogin} set/>
      </div>
    </React.Suspense>
  );
}