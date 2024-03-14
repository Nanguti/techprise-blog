"use client";
import React, { useState, useEffect } from "react";
import { getPostBySlug, updatePost, deletePost } from "@utils/api";
import { Post } from "@utils/types";
import PostForm from "@components/PostForm";
type Params = {
  slug: string;
};

type Props = {
  params: Params;
};
const PostDetailPage = ({ params }: Props) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const slug = params.slug;
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPostBySlug(slug as string);
        setPost(response);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "An error occurred fetching the post.");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [params.slug]);

  const handleUpdate = async (formData: Post) => {
    if (post && post._id) {
      try {
        await updatePost(post._id, formData);
        // ...
      } catch (error: any) {
        // ...
      }
    } else {
      console.error("Post data is not available for update.");
    }
  };

  const handleDelete = async () => {
    if (post && post._id) {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(post._id);
          // ...
        } catch (error: any) {
          // ...
        }
      }
    } else {
      console.error("Post data is not available for deletion.");
    }
  };

  return (
    <div className="py-32">
      <div className="w-1/2 mx-auto">
        {isLoading && <p>Loading...</p>}
        {error && <div className="error-message">{error}</div>}
        {post && (
          <>
            {post.author && <p>By: {post.author.name}</p>}

            <PostForm initialPost={post} onSubmit={handleUpdate} />

            <button
              className=" mt-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
