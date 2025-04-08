import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import PromptInput from './components/PromptInput';
import QuestionDisplay from './components/QuestionDisplay';

const GameLobby = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { username, isHost, isGuest } = location.state;

  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState('');
  const [answerDisplay, setAnswerDisplay] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  const [correctPlayers, setCorrectPlayers] = useState([]);
  const ws = useRef(null);

  const handleDisconnect = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'leaveLobby',
        lobbyId: gameId,
        username: username,
        host: isHost
      }));
    }
  };  

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:5000');

    window.addEventListener('beforeunload', handleDisconnect);

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
      ws.current.send(JSON.stringify({
        type: 'joinLobby',
        lobbyId: gameId,
        username: username,
        isGuest: isGuest
      }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
    
      switch (data.type) {
        case 'gameStarted': {
          setGameStarted(true);
          setAnswerDisplay(false);
          setCorrectPlayers([]);
          setFeedback('');
          setTimeLeft(data.timeLeft);
          setCurrentQuestion(data.question);
          setPlayers(data.players);
          console.log('Game started for everyone');
          break;
        }
        
        case 'gameState': {
          setTimeLeft(data.timeLeft);
          setPlayers(data.players);
          break;
        }

        case 'displayAnswer': {
          setAnswerDisplay(true);
          break;
        }

        case 'nextQuestion': {
          setAnswerDisplay(false);
          setCorrectPlayers([]);
          setCurrentQuestion(data.question);
          setHasAnsweredCorrectly(false);
          setFeedback('');
          setPlayerAnswer('');
          break;
        }

        case 'playersUpdate': {
          setPlayers(data.players);
          setCorrectPlayers(data.correctPlayers);
          break;
        }
        
        case 'gameOver': {
          setGameStarted(false);
          setCurrentQuestion(null);
          setTimeLeft(20);
          setFeedback('Game Over');
          setAnswerDisplay(false);
          setPlayerAnswer('');
          setHasAnsweredCorrectly(false);
          setCorrectPlayers([]);
          break;
        }

        case 'lobbyDeleted': {
          alert('The host has left the game. Returning to menu.');
          navigate('/');
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
      handleDisconnect();
      window.removeEventListener('beforeunload', handleDisconnect);
      ws.current?.close();
    };
  }, [gameId, username, isHost, navigate]);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/game/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, lobbyId: gameId }),
      });

      if (!response.ok) {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    let correct = false;

    const normalPlayerAnswer = normalize(playerAnswer);
    const normalCurrentQuestion = normalize(currentQuestion.answer);

    if(normalPlayerAnswer === normalCurrentQuestion) {
      correct = true;
    } else if (fuzziness(normalCurrentQuestion, normalPlayerAnswer) < (normalCurrentQuestion.length/3)) {
      correct = true;
    }

    if (correct) {
      setFeedback('Correct!');
      setHasAnsweredCorrectly(true);
      ws.current?.send(JSON.stringify({ type: 'updateScore', username: username, score: 1, lobbyId: gameId }));
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  function normalize(answer) {
    return answer
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function fuzziness(correctAnswer, userAnswer) {

    const n = correctAnswer.length;
    const m = userAnswer.length;
    const matrix = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 0; i <= n; i++) matrix[i][0] = i;
    for (let j = 0; j <= m; j++) matrix[0][j] = j;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (correctAnswer[i - 1] === userAnswer[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + 1);
        }
      }
    }
    return matrix[n][m];
  }

  return (
    <div className="game-container">
      <div className="scoreboard-section">
        <Scoreboard scores={players} correctPlayers={correctPlayers} />
      </div>
      <div className="main-content">
        <div className="lobby-header text-center mb-4">
          <h1> TrivAi </h1>
          <h3>Game Lobby ID: <span className="lobby-id">{gameId}</span> </h3>
        </div>
        <div className="game-content">
          {!gameStarted && isHost ?(
            <PromptInput onPromptSubmit={handlePromptSubmit} />
          ) : !gameStarted ?(
            <div className="text-center">
              <h4>Waiting for host to start game...</h4>
            </div>
          ) : answerDisplay ?(
            <div className="question-container text-center">
              <h4>{currentQuestion?.question}</h4>
              <p>Answer: <b>{currentQuestion?.answer}</b></p>
            </div>
          ) : (
            <QuestionDisplay
              currentQuestion={currentQuestion}
              timeLeft={timeLeft}
              playerAnswer={playerAnswer}
              setPlayerAnswer={setPlayerAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              feedback={feedback}
              hasAnsweredCorrectly={hasAnsweredCorrectly}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameLobby;