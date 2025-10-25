// PostsPage.tsx
 import PostCard from '../components/Postcard';
import { useEffect, useState } from 'react';
import { request } from '../utils/request';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request<Post[]>('/posts')
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mt-24 text-center text-gray-500">Laddar inlägg...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}


