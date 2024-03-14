export interface User {
  _id: string;
  email: string;
  username: string;
  image: string;
}

export interface Post {
  _id?: string; // Optional for creating new posts
  title: string;
  slug: string;
  image: string;
  content: string;
  date_published: string;
  userId: string;
  creator?: User;
}
