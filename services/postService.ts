import * as postController from "../controllers/postController.js";

export const postService = {
  async createNewPost(
    title: string,
    content: string,
    authorId: number,
    published: boolean = false
  ) {
    if (!title || !authorId) throw new Error("Title and authorId are required");
    return await postController.createPost(title, content, authorId, published);
  },

  async fetchAllPosts() {
    return await postController.getAllPosts();
  },

  async fetchPostById(id: number) {
    if (id <= 0) throw new Error("Invalid post ID");
    const post = await postController.getPostById(id);
    if (!post) throw new Error("Post not found");
    return post;
  },

  async updateExistingPost(
    id: number,
    title?: string,
    content?: string,
    published?: boolean
  ) {
    if (id <= 0) throw new Error("Invalid post ID");
    return await postController.updatePost(id, title, content, published);
  },

  async removePost(id: number) {
    if (id <= 0) throw new Error("Invalid post ID");
    return await postController.deletePost(id);
  },
};