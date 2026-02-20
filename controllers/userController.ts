import {prisma} from "../lib/prisma.js";

export const createUser = async(name: string, email: string) => {
    return await prisma.user.create({
        data: {name, email},
    });
};

export const getAllUsers = async() => {
    return await prisma.user.findMany({
        include: {posts: true},
    });
};

export const getUserById = async(id: number) => {
    return await prisma.user.findUnique({
        where: {id},
        include: {posts: true},
    });
};

export const updateUser = async(id: number, name?: string, email?: string) => {
    return await prisma.user.update({
        where: {id},
        data: {...(name&&{name}), ...(email&&{email})},
        include: {posts: true},
    });
};

export const deleteUser = async (id:number)=> {
    return await prisma.user.delete({
        where: {id},
    });
};