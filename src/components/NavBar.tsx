// NavBar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Anslagstavlan</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/posts" className="nav-link">Inlägg</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/posts/new" className="btn btn-accent">Nytt</Link>
            {user ? (
              <>
                <span className="text-white-50 small">{user.displayName ?? user.email}</span>
                <button onClick={onLogout} className="btn btn-outline-light btn-sm">Logga ut</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Logga in</Link>
                <Link to="/register" className="btn btn-light btn-sm">Registrera</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


