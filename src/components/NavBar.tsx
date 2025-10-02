
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav('/login');
  };

  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Anslagstavlan</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/posts">Inlägg</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/posts/new">Nytt</Nav.Link>
                <Navbar.Text className="me-2">Hej {user.displayName ?? user.email}</Navbar.Text>
                <Button variant="outline-secondary" size="sm" onClick={onLogout}>Logga ut</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Logga in</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrera</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
