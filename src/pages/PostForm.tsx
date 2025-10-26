import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { create } from '../Services/postsService';
import type { Post } from '../interfaces/Post';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const nav = useNavigate();
  const categories = ['Event', 'Köp/Sälj', 'Boende', 'Övrigt'];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);
    const post: Post = { title, content, category: category || undefined } as Post;
    try {
      await create(post);
      setOk('Inlägg skapat');
      nav('/posts');
    } catch (error: any) {
      setErr(error.message || 'Misslyckades att skapa inlägg');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5 w-100" style={{ maxWidth: 640 }}>
        <Card.Body>
          <Card.Title>Nytt inlägg</Card.Title>
          {err && <Alert variant="danger">{err}</Alert>}
          {ok && <Alert variant="success">{ok}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Titel</Form.Label>
              <Form.Control value={title} onChange={e => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Innehåll</Form.Label>
              <Form.Control as="textarea" rows={6} value={content} onChange={e => setContent(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Välj kategori (valfritt)</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary">Spara</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
