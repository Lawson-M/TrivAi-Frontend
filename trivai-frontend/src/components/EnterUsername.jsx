import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ChooseUsername = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUsernameSubmit(username); // Submit the username
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ChooseUsername;
