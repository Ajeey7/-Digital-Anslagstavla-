import { useEffect, useState } from 'react';
import type { Post } from '../interfaces/Post';
import { getAll } from '../Services/postsService';
import Postcard from '../components/Postcard';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const categories = ['Event', 'Köp/Sälj', 'Boende', 'Övrigt'];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAll();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Något gick fel vid hämtning av inlägg.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="m-4">Laddar inlägg...</div>;
  if (error) return <div className="m-4 text-danger">Fel: {error}</div>;
  const filtered = posts.filter((p: any) => {
    const inCat = !category || p.category === category;
    const text = `${p.title ?? ''} ${p.content ?? ''}`.toLowerCase();
    const inText = !q || text.includes(q.toLowerCase());
    return inCat && inText;
  });
  const sorted = [...filtered].sort((a, b) => {
    const ad = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bd = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bd - ad; // newest first
  });

  return (
    <div className="posts-page container mt-5 pt-5">
      <div className="hero p-5 mb-4">
        <h1 className="display-6 mb-2">Entrétavla / Anslagstavla</h1>
        <p className="mb-0">Dela viktiga meddelanden, event och annonser. Sök och filtrera för att hitta snabbt.</p>
      </div>
      <div className="row mb-4 g-2 align-items-end">
        <div className="col-md-6">
          <label className="form-label">Sök</label>
          <input className="form-control" value={q} onChange={e => setQ(e.target.value)} placeholder="Sök titel eller text" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Kategori</label>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Alla</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {sorted.length === 0 && <p>Inga inlägg hittades.</p>}
      <div className="row">
        {sorted.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <Postcard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}


