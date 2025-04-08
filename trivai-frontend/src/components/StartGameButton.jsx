import React from 'react';

const StartGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Start Game
    </button>
  );
};

export default StartGameButton;
