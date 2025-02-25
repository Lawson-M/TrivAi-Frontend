import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StartGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Start Game
    </button>
  );
};

export default StartGameButton;
