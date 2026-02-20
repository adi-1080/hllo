import { prisma } from "../lib/prisma.js";
export const createPost = async (title, content, authorId, published = false) => {
    return await prisma.post.create({
        data: { title, content, authorId, published },
        include: { author: true },
    });
};
export const getAllPosts = async () => {
    return await prisma.post.findMany({
        include: { author: true },
    });
};
export const getPostById = async (id) => {
    return await prisma.post.findUnique({
        where: { id },
        include: { author: true },
    });
};
export const updatePost = async (id, title, content, published) => {
    return await prisma.post.update({
        where: { id },
        data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(published !== undefined && { published }),
        },
        include: { author: true },
    });
};
export const deletePost = async (id) => {
    return await prisma.post.delete({
        where: { id },
    });
};
