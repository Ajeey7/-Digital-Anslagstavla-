import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Hämta inlägg från backend
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      {user && (
        <div className="mb-3">
          {/* Lösning: Omslut Button med Link istället för as={Link} */}
          <Link to="/posts/new">
            <Button variant="primary">New Post</Button>
          </Link>
        </div>
      )}

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Link to={`/posts/${post.id}`}>
              <Button variant="outline-secondary">View</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}