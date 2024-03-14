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
  console.log("Update function form here " + params.slug);
  const { title, content, slug, image } = await request.json();
  console.log("Title in update method " + title);

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

    await existingPost.save();

    return new Response("Successfully updated the Posts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Post", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the post by ID and remove it
    await Post.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Post", { status: 500 });
  }
};
