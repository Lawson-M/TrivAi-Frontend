import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Use the context's logout function
  };

  return (
    <Navbar bg="dark" variant="dark" className="p-0">
      <Container fluid className="m-0 p-2">
        <Link to="/" className="navbar-brand m-0">
          TrivAi
        </Link>
        {user ? (
          <div className="d-flex align-items-center">
            <span className="text-light me-3">{user.username}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-outline-light btn-sm">
            Login/Register
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;