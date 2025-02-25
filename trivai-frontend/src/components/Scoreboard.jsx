import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Scoreboard = ({ scores }) => (
  <div className="scoreboard position-fixed start-0 top-0 bg-light p-3 vh-100">
    <h4>Scoreboard</h4>
    <ul className="list-unstyled">
      {scores.map((player, index) => (
        <li key={index} className="mb-2">
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
};

export default Scoreboard;
