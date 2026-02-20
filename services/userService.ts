import * as userController from "../controllers/userController.js";

export const userService = {
    async createNewUser(name: string, email: string){
        if(!name || !email) throw new Error("Name and email are required");
        return await userController.createUser(name, email);
    },

    async fetchAllUsers(){
        return await userController.getAllUsers();
    },

    async fetchUserById(id: number){
        if(id<=0) throw new Error("Invalid user ID");
        const user = await userController.getUserById(id);
        if(!user) throw new Error("User not found");
        return user;
    },

    async updateExistingUser(id: number, name?: string, email?: string){
        if(id<=0) throw new Error("Invalid user ID");
        return await userController.updateUser(id, name, email);
    },

    async removeUser(id: number){
        if(id<=0) throw new Error("Invalid user ID");
        return await userController.deleteUser(id);
    },
};