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
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-[#1E3A8A]">Anslagstavlan</Link>
          <div className="flex items-center space-x-4">
            <Link to="/posts" className="text-gray-700 hover:text-[#1E3A8A]">Inlägg</Link>
            {user ? (
              <>
                <Link to="/posts/new" className="px-3 py-1 rounded bg-[#F97316] text-white hover:bg-orange-600">Nytt</Link>
                <span className="text-gray-700">Hej {user.displayName ?? user.email}</span>
                <button onClick={onLogout} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Logga ut</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-[#1E3A8A]">Logga in</Link>
                <Link to="/register" className="text-gray-700 hover:text-[#1E3A8A]">Registrera</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


