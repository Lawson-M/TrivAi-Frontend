import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Header from './components/GameHeader.jsx';
import GameMenu from './GameMenu.jsx';
import GameLobby from './GameLobby.jsx';
import AuthPage from './AuthPage.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<GameMenu />} />
            <Route path="/lobby/:gameId" element={<GameLobby />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;