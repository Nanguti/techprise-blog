"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "../utils/api";
import { Post } from "@utils//types";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

type FormProps = {
  initialPost?: Post; // Optional initial post data for updates
  onSubmit?: (formData: Post) => Promise<void>;
};

const PostForm: React.FC<FormProps> = ({ initialPost }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = (session as { user?: { id?: string } })?.user?.id || "";
  const [formData, setFormData] = useState<Post>({
    title: "",
    slug: "",
    image: "",
    content: "",
    date_published: new Date().toISOString(),
    userId: userId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPost) {
      setFormData(initialPost);
    }
  }, [initialPost]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setFormData({
      ...formData,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"), // Create a basic slug
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = initialPost?._id
        ? await updatePost(initialPost._id, formData)
        : await createPost(formData);
      router.push(`/posts/${response.slug}`);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className=" border-gray-900/10">
          <h2 className="flex justify-center text-base font-semibold leading-7 text-gray-900">
            {initialPost ? "Update Post" : "Create Post"}
          </h2>
          {error && <div className=" text-red-600 ">{error}</div>}
          <div className="col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleSlugChange}
                autoComplete="title"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-full mt-4 ">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-full mt-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Content
            </label>
            <div className="mt-2">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 mb-3 font-semibold text-sm leading-6 text-gray-600">
              Write the content of your post here.
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading
              ? "Submitting..."
              : initialPost
              ? "Update Post"
              : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
