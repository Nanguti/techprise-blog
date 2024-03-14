"use client";
import React, { useState, useEffect } from "react";
import { getPostBySlug } from "@utils/api";
import { Post } from "@utils/types";
import MotionWrapper from "@components/MotionWrapper";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const userId = (session as { user?: { id?: string } })?.user?.id || "";

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

  return (
    <MotionWrapper>
      <div className="overflow-hidden py-20 bg-white">
        <div className="max-w-8xl mx-auto">
          <div className="flex px-4 pt-8 pb-2 lg:px-8">
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
        <div className="flex justify-center ">
          {isLoading && <p>Loadng...</p>}
        </div>

        <div className="px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <main>
              <article className="relative pt-10">
                <div className="flex justify-center">
                  {" "}
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl mr-4">
                    {" "}
                    {post && post.title}
                  </h2>
                  {userId === post?.creator?._id && (
                    <>
                      <Link
                        href={`/update-post/${post?.slug}`}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-4"
                      >
                        Update Post
                      </Link>
                    </>
                  )}
                  {post && (
                    <>
                      <Image
                        src={post?.creator?.image || "/default-user.png"}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                      />
                    </>
                  )}
                </div>

                <div className="my-4 flex justify-center">
                  {post && (
                    <>
                      Date Published:{` `}{" "}
                      {post.date_published.substring(0, 10)}
                    </>
                  )}
                </div>
                <div className="container mx-auto px-4">
                  <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-450 text-white overflow-hidden rounded-lg">
                    <div className="absolute inset-0">
                      <img
                        src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt="Background Image"
                        className="object-cover object-center w-full h-full rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />
                    </div>
                    <div className="relative post-detail-banner z-10 flex flex-col justify-center items-center h-full text-center"></div>
                  </div>
                </div>
                <div className="mt-12 prose prose-slate dark:prose-dark">
                  {post && post.content}
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default PostDetailPage;
