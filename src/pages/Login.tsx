import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      nav('/posts');
    } catch (error: any) {
      setErr(error.message || 'Inloggning misslyckades');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="mt-5 w-100" style={{ maxWidth: 480 }}>
        <Card.Body>
          <Card.Title className="mb-1">Logga in</Card.Title>
          <div className="text-muted mb-3">Fortsätt till din anslagstavla</div>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label>E-post</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="btn-accent">Logga in</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
