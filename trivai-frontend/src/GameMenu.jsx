import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinGameButton from './components/JoinGameButton';
import HostGameButton from './components/HostGameButton';
import ChooseUsername from './components/EnterUsername';
import './App.css';

const GameMenu = () => {
  const navigate = useNavigate();

  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [isHostingGame, setIsHostingGame] = useState(false);
  const [selectedName, setSelectedName] = useState('Guest');

  const handleJoinGame = () => {
    setIsJoiningGame(true);
    setIsHostingGame(false);
    navigate('/lobby', { state: { user: selectedName } });
  };

  const handleHostGame = () => {
    setIsHostingGame(true);
    setIsJoiningGame(false);
    navigate('/lobby', { state: { user: selectedName } });
  };

  const handleUsernameSubmit = async (username) => {
    try {
      const response = await fetch('http://localhost:5000/save-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setSelectedName(username);
        setIsUsernameSet(true);
        console.log('Username saved successfully');
      } else {
        alert('Error saving username');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column">
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1>TrivAi</h1>
        </div>
      </div>
      <div className="row flex-grow-1 d-flex justify-content-center align-items-center text-center">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            {!isUsernameSet ? (
              <ChooseUsername onUsernameSubmit={handleUsernameSubmit} />
            ) : (
              <div>
                <JoinGameButton onClick={handleJoinGame} />
                <HostGameButton onClick={handleHostGame} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;