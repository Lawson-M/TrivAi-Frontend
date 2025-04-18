import React from 'react';

const JoinGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Join Game
    </button>
  );
};

export default JoinGameButton;
