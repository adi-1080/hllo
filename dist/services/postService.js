import * as postController from "../controllers/postController.js";
export const postService = {
    async createNewPost(title, content, authorId, published = false) {
        if (!title || !authorId)
            throw new Error("Title and authorId are required");
        return await postController.createPost(title, content, authorId, published);
    },
    async fetchAllPosts() {
        return await postController.getAllPosts();
    },
    async fetchPostById(id) {
        if (id <= 0)
            throw new Error("Invalid post ID");
        const post = await postController.getPostById(id);
        if (!post)
            throw new Error("Post not found");
        return post;
    },
    async updateExistingPost(id, title, content, published) {
        if (id <= 0)
            throw new Error("Invalid post ID");
        return await postController.updatePost(id, title, content, published);
    },
    async removePost(id) {
        if (id <= 0)
            throw new Error("Invalid post ID");
        return await postController.deletePost(id);
    },
};
