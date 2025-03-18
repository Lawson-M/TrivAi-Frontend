import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralButton from './components/GeneralButton';
import HostGameButton from './components/HostGameButton';
import ChooseUsername from './components/EnterUsername';
import GameIdInput from './components/GameIdInput';
import './App.css';

const GameMenu = () => {
  const navigate = useNavigate();

  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [isHostingGame, setIsHostingGame] = useState(false);

  const handleJoinGame = () => {
    setIsJoiningGame(true);
    setIsHostingGame(false);
  };

  const handleHostGame = () => {
    setIsHostingGame(true);
    setIsJoiningGame(false);
  };

  const handleGoBack = () => {
    setIsJoiningGame(false);
    setIsHostingGame(false);
  };

  const handleGameIdSubmit = async ({ gameId, username }) => {
    if (username === '' || gameId === '') {
      return;
    }
  
    try {
      // Add lobby check before navigation
      const response = await fetch(`http://localhost:5000/game/check-lobby/${gameId}`);
      const data = await response.json();
      
      if (data.exists) {
        navigate(`/lobby/${gameId}`, { state: { username, isHost: false } });
      } else {
        alert('Lobby does not exist!');
      }
    } catch (error) {
      console.error('Error checking lobby:', error);
      alert('Error checking lobby existence');
    }
  };

  const handleHostSubmit = async (username) => {
    if (username !== '') {
      try {
        const response = await fetch('http://localhost:5000/game/create-lobby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const { lobbyId } = await response.json();
          navigate(`/lobby/${lobbyId}`, { state: { username, isHost: true } });
        } else {
          alert('Error creating lobby');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
            {(!isJoiningGame && !isHostingGame) ? (
              <div className="d-grid gap-3">
                <GeneralButton onClick={handleJoinGame} content="Join Game"/>
                <GeneralButton onClick={handleHostGame} content="Host Game"/>
              </div>
            ) : (isHostingGame) ? (
              <div className="d-grid gap-3">
                <ChooseUsername onUsernameSubmit={handleHostSubmit} />
                <GeneralButton onClick={handleGoBack} content="Go Back"/>
              </div>
            ) : (
              <div className="d-grid gap-3">
                <GameIdInput onSubmit={handleGameIdSubmit} />
                <GeneralButton onClick={handleGoBack} content="Go Back"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;