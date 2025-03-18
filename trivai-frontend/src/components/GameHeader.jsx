import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="p-0">
      <Container fluid className="m-0 p-2">
        <Link to="/" className="navbar-brand m-0">
          TrivAi
        </Link>
        <Navbar.Text className="text-light">
          AI-generated trivia games!
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Header;