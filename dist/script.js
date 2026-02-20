import { prisma } from "./lib/prisma";
import { routes } from "./routes/crudRoutes";
async function main() {
    try {
        // Create a user
        console.log("\n--- Creating User ---");
        const newUser = await routes["user:create"]("Aditya", "adi4tyagupta@gmail.com");
        console.log("Created user:", newUser);
        // Create a post
        console.log("\n--- Creating Post ---");
        const newPost = await routes["post:create"]("Hello World", "This is my first post!", newUser.id, true);
        console.log("Created post:", newPost);
        // Fetch all users
        console.log("\n--- Fetching All Users ---");
        const allUsers = await routes["user:list"]();
        console.log("All users:", JSON.stringify(allUsers, null, 2));
        // Fetch all posts
        console.log("\n--- Fetching All Posts ---");
        const allPosts = await routes["post:list"]();
        console.log("All posts:", JSON.stringify(allPosts, null, 2));
        // Update user
        console.log("\n--- Updating User ---");
        const updatedUser = await routes["user:update"](newUser.id, "Alice Updated");
        console.log("Updated user:", updatedUser);
        // Delete post
        console.log("\n--- Deleting Post ---");
        await routes["post:delete"](newPost.id);
        console.log("Post deleted successfully");
    }
    catch (error) {
        console.error("Error:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
