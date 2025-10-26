export interface Post {
  id: string;          // OBS: måste vara string
  title: string;
  content: string;
  createdAt: string;   // ISO-datum
  category?: string;
}
