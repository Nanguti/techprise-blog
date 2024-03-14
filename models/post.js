import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  slug: {
    type: String,
    required: [true, "Slug is required."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },

  image: {
    type: String,
    required: [true, "Image is required."],
  },
  date_published: {
    type: Date,
    required: true,
  },
});

//
const Post = models.Post || model("Post", PostSchema);

export default Post;
