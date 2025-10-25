import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import type { Post } from '../interfaces/Post';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between">
        <small className="text-muted">
          📅 {new Date(post.createdAt).toLocaleDateString('sv-SE')}
        </small>
        <Button variant="outline-primary" size="sm">
          Läs mer
        </Button>
      </Card.Footer>
    </Card>
  );
}

