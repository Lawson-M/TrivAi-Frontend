import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JoinGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Join Game
    </button>
  );
};

export default JoinGameButton;
