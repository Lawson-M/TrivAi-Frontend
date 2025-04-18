import React, { useState } from 'react';

const GameIdInput = ({ onSubmit }) => {
  const [gameId, setGameId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ gameId, username }); // Pass both Game ID and username to the parent
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