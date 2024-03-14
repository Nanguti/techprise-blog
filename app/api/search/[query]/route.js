import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  console.log("log params here " + params.query);

  try {
    await connectToDB();

    const posts = await Post.find({
      title: { $regex: new RegExp(params.query, "i") }, // Case-insensitive search
    }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
