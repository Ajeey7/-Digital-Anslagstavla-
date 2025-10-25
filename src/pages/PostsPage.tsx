import { useEffect, useState } from 'react';
import type { Post } from '../interfaces/Post';
import { request } from '../utils/request';
import Postcard from '../components/Postcard';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await request<Post[]>('/posts');
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

  return (
    <div className="posts-page container mt-5 pt-5">
      {posts.length === 0 && <p>Inga inlägg hittades.</p>}
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <Postcard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}


