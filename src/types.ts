export interface User {
  id?: number;
  email: string;
  displayName?: string;
  role?: string;
}

export interface Post {
  id?: number;
  title: string;
  content: string;
  category?: string;
  authorId?: number;
  authorName?: string;
  created?: string;
}
