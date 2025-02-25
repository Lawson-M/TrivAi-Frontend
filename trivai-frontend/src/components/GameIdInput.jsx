import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameIdInput = ({ onGameIdSubmit }) => {
  const [gameId, setGameId] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGameIdSubmit(gameId); // Pass the entered Game ID to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="gameId" className="form-label">Enter Game ID</label>
        <input
          type="text"
          id="gameId"
          className="form-control"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default GameIdInput;
