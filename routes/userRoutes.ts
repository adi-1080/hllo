import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services/userService.js";

const router = Router();

// Create user
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = await userService.createNewUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const user = await userService.fetchUserById(parseInt(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user
router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const { name, email } = req.body;

      const updatedUser = await userService.updateExistingUser(
        parseInt(id),
        name,
        email
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// Delete user
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await userService.removeUser(parseInt(id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
