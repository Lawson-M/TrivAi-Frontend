import React from 'react';

const HostGameButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Host Game
    </button>
  );
};

export default HostGameButton;
