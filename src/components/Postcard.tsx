// PostCard.tsx
interface PostCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostCard({ title, content, author, createdAt }: PostCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-[#1E3A8A]">{title}</h2>
      <p className="text-gray-600 mt-2">{content}</p>
      <div className="mt-4 text-sm text-gray-400 flex justify-between">
        <span>{author}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
