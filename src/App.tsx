import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostsPage from './pages/PostsPage';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';

export default function App() {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}
