import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Min Anslagstavla</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/posts" style={{ marginRight: '1rem' }}>Inlägg</Link>
        <Link to="/posts/new">Nytt Inlägg</Link>
      </nav>

      <Routes>
        <Route path="/posts" element={<div>Här är alla inlägg</div>} />
        <Route path="/posts/new" element={<div>Lägg till nytt inlägg</div>} />
        <Route path="*" element={<div>Välkommen! Välj en länk ovan.</div>} />
      </Routes>
    </div>
  );
}
