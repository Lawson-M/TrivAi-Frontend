import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import PromptInput from './components/PromptInput';
import QuestionDisplay from './components/QuestionDisplay';

const GameLobby = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const { username } = location.state;

  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
      ws.current.send(JSON.stringify({
        type: 'joinLobby',
        lobbyId: gameId,
        username: username
      }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
    
      switch (data.type) {
        case 'gameStarted': {
          setGameStarted(true);
          console.log('Game started for everyone');
          break;
        }
        
        case 'gameState': {
          setCurrentQuestion(data.question);
          setTimeLeft(data.timeLeft);
          setPlayers(data.players);
          break;
        }

        case 'playersUpdate': {
          setPlayers(data.players);
          break;
        }
        
        case 'gameOver': {
          setGameStarted(false);
          setFeedback('Game Over');
          break;
        }
    
        default: {
          console.log(`Unhandled message type: ${data.type}`);
          break;
        }
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current?.close();
    };
  }, [gameId, username]);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/game/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, lobbyId: gameId }),
      });

      if (response.ok) {
        const data = await response.json();
        setGameStarted(true);
        setCurrentQuestion(data.question);
        setTimeLeft(20);
        setFeedback('');
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion && playerAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setFeedback('Correct!');
      ws.current?.send(JSON.stringify({ type: 'updateScore', username, score: 1, lobbyId: gameId }));
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  return (
    <div className="d-flex vh-100">
      <Scoreboard scores={players} />
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        {!gameStarted ? (
          <PromptInput onPromptSubmit={handlePromptSubmit} />
        ) : (
          <QuestionDisplay
            currentQuestion={currentQuestion}
            timeLeft={timeLeft}
            playerAnswer={playerAnswer}
            setPlayerAnswer={setPlayerAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
          />
        )}
      </div>
    </div>
  );
};

export default GameLobby;