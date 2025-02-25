import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import PromptInput from './components/PromptInput';

const GameLobby = () => {
  const location = useLocation();
  const username = location.state?.user || 'Guest';

  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/players');
        const data = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      if (data.type === 'gameStarted') {
        setGameStarted(true);
        console.log('Game started for everyone');
      } else if (data.type === 'gameState') {
        setCurrentQuestion(data.question);
        setTimeLeft(data.timeLeft);
        setPlayers(data.players);
      } else if (data.type === 'gameOver') {
        setGameStarted(false);
        setFeedback('Game Over');
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
  }, []);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
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
      ws.current?.send(JSON.stringify({ type: 'updateScore', username, score: 1 }));
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
          <div className="text-center">
            <h4>{currentQuestion?.question}</h4>
            <h5>Time Remaining: {timeLeft} seconds</h5>
            <form onSubmit={handleAnswerSubmit} className="mt-3">
              <input
                type="text"
                className="form-control mb-2"
                value={playerAnswer}
                onChange={(e) => setPlayerAnswer(e.target.value)}
                placeholder="Type your answer here..."
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            {feedback && <p className="mt-2">{feedback}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLobby;