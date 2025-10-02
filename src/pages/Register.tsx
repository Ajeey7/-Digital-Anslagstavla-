import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, displayName })
      });
      const j = await res.json();
      if (j && j.error) throw new Error(j.error);
      // Efter registrering, försöka logga in (call /api/login)
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      nav('/posts');
    } catch (error: any) {
      setErr(error.message || 'Registrering misslyckades');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5 w-100" style={{ maxWidth: 480 }}>
        <Card.Body>
          <Card.Title>Registrera</Card.Title>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>Namn (valfritt)</Form.Label>
              <Form.Control value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-post</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit">Skapa konto</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
