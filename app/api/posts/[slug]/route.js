import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findOne({ slug: params.slug }).populate("creator");
    if (!post) return new Response("Post Not Found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { title, content, slug, image } = await request.json();

  try {
    await connectToDB();

    // Find the existing post by ID
    const existingPost = await Post.findById(params.slug);

    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    // Update the post with new data
    existingPost.title = title;
    existingPost.slug = slug;
    existingPost.content = content;
    existingPost.image = image;

    const post = await existingPost.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Error Updating Post", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Post.findByIdAndRemove(params.slug);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Post", { status: 500 });
  }
};
