import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameMenu from './GameMenu.jsx';
import GameLobby from './GameLobby.jsx'; // New Lobby page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameMenu />} /> {/* Main Menu */}
        <Route path="/lobby" element={<GameLobby />} /> {/* Lobby page */}
      </Routes>
    </Router>
  );
};

export default App;
