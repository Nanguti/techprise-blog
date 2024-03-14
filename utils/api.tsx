import axios from "axios";
import { Post } from "./types";

export const getAllPosts = async (query?: string) => {
  try {
    let response;
    if (query == null) {
      response = await axios.get(`/api/posts`);
    } else {
      response = await axios.get(`/api/search/${query}`);
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
};

export const createPost = async (data: Post) => {
  try {
    const response = await axios.post(`/api/posts/new`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error creating post");
  }
};

export const updatePost = async (id: string, data: Post) => {
  try {
    const response = await axios.put(`/api/posts/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating post");
  }
};

export const deletePost = async (id: string) => {
  try {
    await axios.delete(`/api/posts/${id}`);
  } catch (error) {
    throw new Error("Error deleting post");
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching post");
  }
};
