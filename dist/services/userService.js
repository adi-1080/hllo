import * as userController from "../controllers/userController.js";
export const userService = {
    async createNewUser(name, email) {
        if (!name || !email)
            throw new Error("Name and email are required");
        return await userController.createUser(name, email);
    },
    async fetchAllUsers() {
        return await userController.getAllUsers();
    },
    async fetchUserById(id) {
        if (id <= 0)
            throw new Error("Invalid user ID");
        const user = await userController.getUserById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    },
    async updateExistingUser(id, name, email) {
        if (id <= 0)
            throw new Error("Invalid user ID");
        return await userController.updateUser(id, name, email);
    },
    async removeUser(id) {
        if (id <= 0)
            throw new Error("Invalid user ID");
        return await userController.deleteUser(id);
    },
};
