import { prisma } from "../lib/prisma";

export const createPost = async (
  title: string,
  content: string,
  authorId: number,
  published: boolean = false
) => {
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

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
};

export const updatePost = async (
  id: number,
  title?: string,
  content?: string,
  published?: boolean
) => {
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

export const deletePost = async (id: number) => {
  return await prisma.post.delete({
    where: { id },
  });
};