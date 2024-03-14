// types.ts
export interface User {
  id: string;
  name: string;
}

export interface Post {
  _id?: string; // Optional for creating new posts
  title: string;
  slug: string;
  image: string;
  content: string;
  date_published: string;
  userId: string;
}
