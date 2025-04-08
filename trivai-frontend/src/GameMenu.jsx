import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralButton from './components/GeneralButton';
import HostGameButton from './components/HostGameButton';
import ChooseUsername from './components/EnterUsername';
import GameIdInput from './components/GameIdInput';
import { useAuth } from './AuthContext';
import './App.css';

const GameMenu = () => {
  const navigate = useNavigate();

  const {user} = useAuth();
  const [isJoiningGame, setIsJoiningGame] = useState(false);

  const handleJoinGame = () => {
    setIsJoiningGame(true);
    setIsHostingGame(false);
  };

  const handleHostGame = async () => {
    if (user) {
      try {
        const response = await fetch('http://localhost:5000/game/create-lobby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const username = user.username;
          const { lobbyId } = await response.json();
          navigate(`/lobby/${lobbyId}`, { state: { username, isHost: true, isGuest: false } });
        } else {
          alert('Error creating lobby');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleGoBack = () => {
    setIsJoiningGame(false);
  };

  const handleGameIdSubmit = async ({ gameId, username }) => {
    if (gameId == '') {
      return;
    }
  
    try {
      // Add lobby check before navigation
      const response = await fetch(`http://localhost:5000/game/check-lobby/${gameId}`);
      const data = await response.json();
      var isGuest = false;

      if (data.exists) {
        if(!user) {
          const ranguest = Math.random().toString(36).substring(7);
          username = "Guest_" + ranguest;
          isGuest = true;
        }else{
          username = user.username;
        }

        const userExists = data.currentPlayers.some(
          player => player.name.toLowerCase() === username.toLowerCase()
        );
        
        if (userExists) {
          alert('You are aleady in this game.');
          return;
        }

        navigate(`/lobby/${gameId}`, { state: { username, isHost: false, isGuest: isGuest } });
      }else {
        alert('Lobby does not exist!');
      }
    } catch (error) {
      console.error('Error checking lobby:', error);
      alert('Error checking lobby existence');
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
            {(!isJoiningGame) ? (
              <div className="d-grid gap-3">
                <GeneralButton onClick={handleJoinGame} content="Join Game"/>
                <GeneralButton onClick={handleHostGame} content="Host Game"/>
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