import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, title, content, image } = await request.json();
  try {
    await connectToDB();

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-") // Replace non-alphanumeric characters with hyphens
      .trim("-"); // Remove leading/trailing hyphens

    const newPost = new Post({
      creator: userId,
      title,
      slug,
      content,
      image,
      date_published: new Date(),
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Error saving post:", error.message);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
