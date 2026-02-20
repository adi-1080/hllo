import { userService } from "../services/userService";
import { postService } from "../services/postService";

export const routes = {
    "user:create": async (name: string, email: string) => {
        return await userService.createNewUser(name, email);
    },
    "user:list": async () => {
        return await userService.fetchAllUsers();
    },
    "user:get": async (id: number) => {
        return await userService.fetchUserById(id);
    },
    "user:update": async (id: number, name?: string, email?: string) => {
        return await userService.updateExistingUser(id, name, email);
    },
    "user:delete": async (id: number) => {
        return await userService.removeUser(id);
    },

    "post:create": async (
        title: string,
        content: string,
        authorId: number,
        published?: boolean
    ) => {
        return await postService.createNewPost(title, content, authorId, published);
    },
    "post:list": async () => {
        return await postService.fetchAllPosts();
    },
    "post:get": async (id: number) => {
        return await postService.fetchPostById(id);
    },
    "post:update": async (
        id: number,
        title?: string,
        content?: string,
        published?: boolean
    ) => {
        return await postService.updateExistingPost(id, title, content, published);
    },
    "post:delete": async (id: number) => {
        return await postService.removePost(id);
    },
}