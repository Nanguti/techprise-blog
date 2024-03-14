"use client";
import React, { useState, useEffect } from "react";
import { getPostBySlug, updatePost, deletePost } from "@utils/api";
import { Post } from "@utils/types";
import PostForm from "@components/PostForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
      } catch (error: any) {
        console.log(error);
      }
    } else {
      console.error("Post data is not available for update.");
    }
  };

  const handleDelete = async () => {
    if (post && post._id) {
      console.log(post._id);
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(post._id);
        } catch (error: any) {
          console.log(error);
        }
      }
    } else {
      console.error("Post data is not available for deletion.");
    }
  };

  const handleCancel = () => {
    router.push(`/`);
  };

  return (
    <div className="py-32">
      <div className="max-w-8xl mx-auto">
        <div className="flex px-4 pb-2 lg:px-8">
          <Link
            className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            href="/"
          >
            <svg
              viewBox="0 -9 3 24"
              className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            >
              <path
                d="M3 0L0 3L3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go back to blog posts
          </Link>
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        {isLoading && <p>Loading...</p>}
        {error && <div className="error-message">{error}</div>}
        {post && (
          <>
            {post.creator && <p>By: {post.creator.username}</p>}

            <PostForm initialPost={post} onSubmit={handleUpdate} />

            <button
              className=" mt-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={handleDelete}
            >
              Delete Post
            </button>

            <button
              onClick={handleCancel}
              className="ml-20 mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
