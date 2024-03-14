// types.ts
export interface User {
  id: string;
  name: string;
  // Add other user properties if needed
}

export interface Post {
  _id?: string; // Optional for creating new posts
  title: string;
  slug: string;
  image: string;
  content: string;
  date_published: string;
  author: User; // Link to the user who created the post
}
