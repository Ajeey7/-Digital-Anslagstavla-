import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, type Post } from '../services/postsService';
import { useAuth } from '../context/AuthContext';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const p = await getById(Number(id));
        setPost(p);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!post) return <Container className="mt-3">Laddar...</Container>;

  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.authorName ?? 'Anonym'} — {post.category}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{post.content}</Card.Text>

          <div className="mt-3">
            {user && user.id === post.authorId && (
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                Redigera
              </Button>
            )}
            <Button variant="primary" onClick={() => navigate('/posts')}>
              Tillbaka
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
