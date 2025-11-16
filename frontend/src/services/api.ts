import { User, Post, PaginatedResponse, NewPost } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const api = {
  async getUsers(pageNumber: number = 1, pageSize: number = 4): Promise<PaginatedResponse<User>> {
    const response = await fetch(
      `${API_BASE_URL}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json();
  },

  async getUserPosts(userId: string): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user posts");
    }
    return response.json();
  },

  async createPost(post: NewPost): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return response.json();
  },

  async deletePost(postId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  },
};
