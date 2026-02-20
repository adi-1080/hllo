import { userService } from "../services/userService.js";
import { postService } from "../services/postService.js";
export const routes = {
    "user:create": async (name, email) => {
        return await userService.createNewUser(name, email);
    },
    "user:list": async () => {
        return await userService.fetchAllUsers();
    },
    "user:get": async (id) => {
        return await userService.fetchUserById(id);
    },
    "user:update": async (id, name, email) => {
        return await userService.updateExistingUser(id, name, email);
    },
    "user:delete": async (id) => {
        return await userService.removeUser(id);
    },
    "post:create": async (title, content, authorId, published) => {
        return await postService.createNewPost(title, content, authorId, published);
    },
    "post:list": async () => {
        return await postService.fetchAllPosts();
    },
    "post:get": async (id) => {
        return await postService.fetchPostById(id);
    },
    "post:update": async (id, title, content, published) => {
        return await postService.updateExistingPost(id, title, content, published);
    },
    "post:delete": async (id) => {
        return await postService.removePost(id);
    },
};
