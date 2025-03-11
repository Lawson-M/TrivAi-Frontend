import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinGameButton from './components/JoinGameButton';
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

  const handleGameIdSubmit = async ({ gameId, username }) => {
    if (username !== '' || gameId !== '') {
      navigate(`/lobby/${gameId}`, { state: { username } });
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
          navigate(`/lobby/${lobbyId}`, { state: { username } });
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
              <div>
                <JoinGameButton onClick={handleJoinGame} />
                <HostGameButton onClick={handleHostGame} />
              </div>
            ) : (isHostingGame) ? (
              <div>
                <ChooseUsername onUsernameSubmit={handleHostSubmit} />
              </div>
            ) : (
              <div>
                <GameIdInput onSubmit={handleGameIdSubmit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;