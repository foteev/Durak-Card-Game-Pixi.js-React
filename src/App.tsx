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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<Array<Event>>([]);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const store = useSnapshot(gameStore);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: Event) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('error', (err) => {
      onFooEvent(err);
      handleShow();
    });
    socket.on('store update', (store) => {
      const st = JSON.parse(store);
      updateStore(st);
      console.log(gameStore);
      setShowLogin(false);
    })

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    // <React.Suspense fallback={<span>waiting...</span>}>
      <div className="App">
        <GameStage />
        {showLogin ? 
          <LoginForm /> 
          : null
        }
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className = "game_stage_buttons">
          {/* <button className="button" onClick={() => sortPlayerCards(1, 'byRank')}>Sort 1 by value</button>
          <button className="button" onClick={() => sortPlayerCards(1, 'bySuit')}>Sort 1 by suit</button>
          <button className="button" onClick={() => sortPlayerCards(2, 'byRank')}>Sort 2 by value</button>
          <button className="button" onClick={() => sortPlayerCards(2, 'bySuit')}>Sort 2 by suit</button> */}
        </div>
        
      </div>

    // </React.Suspense>
  );
}