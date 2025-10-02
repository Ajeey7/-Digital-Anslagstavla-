import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { create, update, getById, type Post } from '../services/postsService';
import { useAuth } from '../context/AuthContext';

export default function PostForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (editing && id) {
      (async () => {
        try {
          const p = await getById(Number(id));
          setTitle(p.title);
          setContent(p.content ?? '');
          setCategory(p.category ?? '');
        } catch {
          setErr('Kunde inte hämta inlägg');
        }
      })();
    }
  }, [editing, id]);

  if (!user) {
    return <Container className="mt-3">Du måste vara inloggad för att skapa inlägg.</Container>;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      const postData: Post = { title, content, category };
      if (editing && id) {
        await update(Number(id), postData);
      } else {
        await create(postData);
      }
      nav('/posts');
    } catch (e: any) {
      setErr(e.message || 'Något gick fel');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-4 w-100" style={{ maxWidth: 800 }}>
        <Card.Body>
          <Card.Title>{editing ? 'Redigera inlägg' : 'Nytt inlägg'}</Card.Title>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Titel</Form.Label>
              <Form.Control value={title} onChange={e => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control value={category} onChange={e => setCategory(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Innehåll</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">{editing ? 'Spara' : 'Skapa'}</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
