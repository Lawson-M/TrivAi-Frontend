import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = ({ scores, correctPlayers = [] }) => (
  <div className="scoreboard bg-light p-3 h-100">
    <h4>Scoreboard</h4>
    <ul className="list-unstyled">
      {scores.map((player, index) => (
        <li key={index} className={`mb-2 ${correctPlayers.includes(player.name) ? 'text-success fw-bold' : ''}`}>
          {player.name}: {player.score}
        </li>
      ))}
    </ul>
  </div>
);

// Define prop types
Scoreboard.propTypes = {
  scores: PropTypes.arrayOf( 
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  correctPlayers: PropTypes.arrayOf(PropTypes.string).isRequired
};

Scoreboard.defaultProps = {
  correctPlayers: [],
};

export default Scoreboard;
