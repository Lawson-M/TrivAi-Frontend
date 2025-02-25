import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HostGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Host Game
    </button>
  );
};

export default HostGameButton;
