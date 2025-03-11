// import React, { createContext, useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';

// export const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const { gameId } = useParams();
//   const [players, setPlayers] = useState([]);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(20);
//   const [feedback, setFeedback] = useState('');
//   const [playerAnswer, setPlayerAnswer] = useState('');
//   const ws = useRef(null);

//   useEffect(() => {
//     const fetchPlayers = async (lobbyId) => {
//       try {
//         const response = await fetch('http://localhost:5000/players/get', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ lobbyId }),
//         });
//         const data = await response.json();
//         setPlayers(data.players);
//       } catch (error) {
//         console.error('Error fetching players:', error);
//       }
//     };

//     fetchPlayers(gameId);
//   }, [gameId]);

//   useEffect(() => {
//     ws.current = new WebSocket('ws://localhost:5000');

//     ws.current.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('WebSocket message received:', data);
//       if (data.type === 'gameStarted') {
//         setGameStarted(true);
//         console.log('Game started for everyone');
//       } else if (data.type === 'gameState') {
//         setCurrentQuestion(data.question);
//         setTimeLeft(data.timeLeft);
//         setPlayers(data.players);
//       } else if (data.type === 'gameOver') {
//         setGameStarted(false);
//         setFeedback('Game Over');
//       }
//     };

//     ws.current.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.current.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.current?.close();
//     };
//   }, []);

//   const handlePromptSubmit = async (prompt, lobbyId) => {
//     try {
//       const response = await fetch('http://localhost:5000/game/openai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt, lobbyId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setGameStarted(true);
//         setCurrentQuestion(data.question);
//         setTimeLeft(20);
//         setFeedback('');
//       } else {
//         console.error('Error:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleAnswerSubmit = (e) => {
//     e.preventDefault();
//     if (currentQuestion && playerAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
//       setFeedback('Correct!');
//       ws.current?.send(JSON.stringify({ type: 'updateScore', username, score: 1 }));
//     } else {
//       setFeedback('Incorrect. Try again!');
//     }
//   };

//   return (
//     <GameContext.Provider
//       value={{
//         players,
//         gameStarted,
//         currentQuestion,
//         timeLeft,
//         feedback,
//         playerAnswer,
//         setPlayerAnswer,
//         handlePromptSubmit,
//         handleAnswerSubmit,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };